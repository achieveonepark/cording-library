import { fetch } from "@tauri-apps/plugin-http";

// 대상 레포 및 허용 계정. 이 계정으로 로그인해야만 동작한다.
export const OWNER = "achieveonepark";
export const REPO = "cording-library";
export const REQUIRED_LOGIN = "achieveonepark";

const API = "https://api.github.com";

function ghHeaders(token: string, extra: Record<string, string> = {}): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra,
  };
}

// ── Device Flow ───────────────────────────────────────────────

export interface DeviceCodeResp {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
}

export async function requestDeviceCode(clientId: string): Promise<DeviceCodeResp> {
  const res = await fetch("https://github.com/login/device/code", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, scope: "repo workflow" }),
  });
  if (!res.ok) throw new Error(`device/code 요청 실패: ${res.status}`);
  return res.json();
}

export type PollStatus = "pending" | "slow_down" | "ok" | "error";
export interface PollResult {
  status: PollStatus;
  token?: string;
  error?: string;
}

export async function pollForToken(clientId: string, deviceCode: string): Promise<PollResult> {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      device_code: deviceCode,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    }),
  });
  const data = await res.json();
  if (data.access_token) return { status: "ok", token: data.access_token as string };
  if (data.error === "authorization_pending") return { status: "pending" };
  if (data.error === "slow_down") return { status: "slow_down" };
  return { status: "error", error: data.error_description || data.error || "알 수 없는 오류" };
}

// ── User ──────────────────────────────────────────────────────

export interface GitHubUser {
  login: string;
  name?: string;
  avatar_url?: string;
}

export async function getUser(token: string): Promise<GitHubUser> {
  const res = await fetch(`${API}/user`, { headers: ghHeaders(token) });
  if (!res.ok) throw new Error(`/user 조회 실패: ${res.status}`);
  return res.json();
}

// ── 파일 읽기 (raw) ───────────────────────────────────────────

export async function getFileText(token: string, path: string): Promise<string> {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=main`, {
    headers: ghHeaders(token, { Accept: "application/vnd.github.raw+json" }),
  });
  if (!res.ok) throw new Error(`${path} 읽기 실패: ${res.status}`);
  return res.text();
}

// ── 단일 커밋 (Git Data API) ──────────────────────────────────

export interface CommitFile {
  path: string;
  content: string;
}

// 여러 파일을 한 커밋으로 main 에 반영하고 새 커밋 SHA 를 돌려준다.
export async function commitFiles(
  token: string,
  message: string,
  files: CommitFile[],
): Promise<string> {
  const git = `${API}/repos/${OWNER}/${REPO}/git`;
  const h = ghHeaders(token);

  // 1) 현재 main 참조 → base 커밋
  const refRes = await fetch(`${git}/ref/heads/main`, { headers: h });
  if (!refRes.ok) throw new Error(`ref 조회 실패: ${refRes.status}`);
  const baseCommitSha: string = (await refRes.json()).object.sha;

  // 2) base 커밋 → 트리
  const commitRes = await fetch(`${git}/commits/${baseCommitSha}`, { headers: h });
  if (!commitRes.ok) throw new Error(`base 커밋 조회 실패: ${commitRes.status}`);
  const baseTreeSha: string = (await commitRes.json()).tree.sha;

  // 3) blob 생성
  const treeItems: Array<{ path: string; mode: string; type: string; sha: string }> = [];
  for (const f of files) {
    const blobRes = await fetch(`${git}/blobs`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ content: f.content, encoding: "utf-8" }),
    });
    if (!blobRes.ok) throw new Error(`blob 생성 실패(${f.path}): ${blobRes.status}`);
    const blobSha: string = (await blobRes.json()).sha;
    treeItems.push({ path: f.path, mode: "100644", type: "blob", sha: blobSha });
  }

  // 4) 트리 생성
  const treeRes = await fetch(`${git}/trees`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
  });
  if (!treeRes.ok) throw new Error(`트리 생성 실패: ${treeRes.status}`);
  const newTreeSha: string = (await treeRes.json()).sha;

  // 5) 커밋 생성
  const newCommitRes = await fetch(`${git}/commits`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({ message, tree: newTreeSha, parents: [baseCommitSha] }),
  });
  if (!newCommitRes.ok) throw new Error(`커밋 생성 실패: ${newCommitRes.status}`);
  const newCommitSha: string = (await newCommitRes.json()).sha;

  // 6) ref 업데이트 (push)
  const updateRes = await fetch(`${git}/refs/heads/main`, {
    method: "PATCH",
    headers: h,
    body: JSON.stringify({ sha: newCommitSha }),
  });
  if (!updateRes.ok) throw new Error(`ref 업데이트 실패: ${updateRes.status}`);

  return newCommitSha;
}

// ── Actions (배포 워크플로) ───────────────────────────────────

export interface WorkflowRun {
  id: number;
  status: string;
  conclusion: string | null;
  html_url: string;
  created_at: string;
  event: string;
  display_title: string;
}

export async function listRuns(token: string): Promise<WorkflowRun[]> {
  const res = await fetch(
    `${API}/repos/${OWNER}/${REPO}/actions/workflows/deploy.yml/runs?per_page=5`,
    { headers: ghHeaders(token) },
  );
  if (!res.ok) throw new Error(`워크플로 런 조회 실패: ${res.status}`);
  return (await res.json()).workflow_runs ?? [];
}

export async function dispatchDeploy(token: string, pkg?: string): Promise<void> {
  const res = await fetch(
    `${API}/repos/${OWNER}/${REPO}/actions/workflows/deploy.yml/dispatches`,
    {
      method: "POST",
      headers: ghHeaders(token),
      body: JSON.stringify({ ref: "main", inputs: pkg ? { package: pkg } : {} }),
    },
  );
  if (!res.ok && res.status !== 204) throw new Error(`워크플로 실행 실패: ${res.status}`);
}
