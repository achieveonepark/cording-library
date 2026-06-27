import { fetch } from "@tauri-apps/plugin-http";
import { OWNER } from "./github";

// 레포 루트 package.json 의 name(= Unity 패키지 id)을 찾는다.
export async function resolvePkgId(repo: string): Promise<string | null> {
  for (const ref of ["HEAD", "main", "master"]) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${OWNER}/${repo}/${ref}/package.json`,
      );
      if (res.ok) {
        const json = await res.json();
        if (json?.name) return json.name as string;
      }
    } catch {
      /* 다음 ref 시도 */
    }
  }
  return null;
}

// OpenUPM 레지스트리에 해당 id 가 등록돼 있으면 true.
export async function isOnOpenUpm(pkgId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://package.openupm.com/${pkgId}`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

export interface OpenUpmStatus {
  repo: string;
  pkgId: string | null;
  registered: boolean;
}

export async function checkOpenUpm(repo: string): Promise<OpenUpmStatus> {
  const pkgId = await resolvePkgId(repo);
  const registered = pkgId ? await isOnOpenUpm(pkgId) : false;
  return { repo, pkgId, registered };
}

export const openUpmUrl = (pkgId: string) => `https://openupm.com/packages/${pkgId}/`;
