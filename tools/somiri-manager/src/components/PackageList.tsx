import { useEffect, useState } from "react";
import { getFileText, commitFiles } from "../lib/github";
import { checkOpenUpm, openUpmUrl, type OpenUpmStatus } from "../lib/openupm";
import {
  parsePackages,
  serializePackages,
  type PackageEntry,
} from "../lib/packages";

interface Props {
  token: string;
}

export default function PackageList({ token }: Props) {
  const [packages, setPackages] = useState<PackageEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, OpenUpmStatus>>({});
  const [checking, setChecking] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const text = await getFileText(token, "packages.json");
      setPackages(parsePackages(text));
    } catch (e) {
      setError(String(e));
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAll() {
    if (!packages) return;
    setChecking(true);
    setMsg(null);
    const next: Record<string, OpenUpmStatus> = {};
    for (const p of packages) {
      next[p.name] = await checkOpenUpm(p.name);
      setStatuses({ ...next });
    }
    setChecking(false);
  }

  // OpenUPM 에 등록된 패키지 중 packages.json 에 openupm 필드가 빠진 항목을 채워 커밋한다.
  async function syncOpenupm() {
    if (!packages) return;
    const updated = packages.map((p) => {
      const st = statuses[p.name];
      if (st?.registered && st.pkgId && !p.openupm) {
        return { ...p, openupm: st.pkgId };
      }
      return p;
    });
    const changed = JSON.stringify(updated) !== JSON.stringify(packages);
    if (!changed) {
      setMsg("반영할 변경 사항이 없습니다. (먼저 OpenUPM 조회를 실행하세요)");
      return;
    }
    setSyncing(true);
    setMsg(null);
    try {
      await commitFiles(token, "Sync OpenUPM badges into packages.json", [
        { path: "packages.json", content: serializePackages(updated) },
      ]);
      setPackages(updated);
      setMsg("packages.json 에 openupm 필드를 반영하고 커밋했습니다. 배포가 자동 실행됩니다.");
    } catch (e) {
      setMsg(`커밋 실패: ${e}`);
    } finally {
      setSyncing(false);
    }
  }

  if (error) return <div className="msg err">{error}</div>;
  if (!packages) return <p className="muted"><span className="spin" /> 패키지 목록을 불러오는 중…</p>;

  return (
    <div>
      <div className="actions" style={{ marginTop: 0, marginBottom: 12 }}>
        <button className="btn" onClick={checkAll} disabled={checking}>
          {checking ? <span className="spin" /> : "OpenUPM 등록 조회"}
        </button>
        <button className="btn ghost" onClick={syncOpenupm} disabled={syncing || checking}>
          {syncing ? <span className="spin" /> : "openupm 필드 반영 + 커밋"}
        </button>
        <button className="btn ghost" onClick={load} disabled={checking || syncing}>
          새로고침
        </button>
      </div>
      {msg && <div className="msg ok">{msg}</div>}

      <div className="card">
        {packages.map((p) => {
          const st = statuses[p.name];
          return (
            <div className="row" key={p.name}>
              <div className="row-main">
                <span className="row-title">{p.title}</span>
                <span className="row-sub">
                  {p.name}
                  {st?.pkgId ? ` · ${st.pkgId}` : ""}
                  {p.openupm ? " · openupm✓(json)" : ""}
                </span>
              </div>
              {st ? (
                st.registered ? (
                  <a
                    className="badge ok"
                    href={st.pkgId ? openUpmUrl(st.pkgId) : "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenUPM ✓
                  </a>
                ) : (
                  <span className="badge no">미등록</span>
                )
              ) : (
                <span className="badge no">—</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="muted">총 {packages.length}개 패키지</p>
    </div>
  );
}
