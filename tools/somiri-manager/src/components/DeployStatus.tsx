import { useEffect, useState } from "react";
import { listRuns, dispatchDeploy, type WorkflowRun } from "../lib/github";

interface Props {
  token: string;
}

function runBadge(run: WorkflowRun): { cls: string; label: string } {
  if (run.status !== "completed") return { cls: "no", label: run.status };
  if (run.conclusion === "success") return { cls: "ok", label: "success" };
  return { cls: "no", label: run.conclusion ?? "?" };
}

export default function DeployStatus({ token }: Props) {
  const [runs, setRuns] = useState<WorkflowRun[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setError(null);
    try {
      setRuns(await listRuns(token));
    } catch (e) {
      setError(String(e));
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function trigger() {
    setBusy(true);
    setMsg(null);
    try {
      await dispatchDeploy(token);
      setMsg("배포 워크플로를 실행했습니다. 잠시 후 새로고침하세요.");
    } catch (e) {
      setMsg(String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="actions" style={{ marginTop: 0, marginBottom: 12 }}>
        <button className="btn" onClick={trigger} disabled={busy}>
          {busy ? <span className="spin" /> : "전체 재배포 실행"}
        </button>
        <button className="btn ghost" onClick={load}>
          새로고침
        </button>
      </div>
      {msg && <div className="msg ok">{msg}</div>}
      {error && <div className="msg err">{error}</div>}

      {!runs ? (
        <p className="muted">
          <span className="spin" /> 최근 배포를 불러오는 중…
        </p>
      ) : runs.length === 0 ? (
        <p className="muted">실행 이력이 없습니다.</p>
      ) : (
        <div className="card">
          {runs.map((run) => {
            const b = runBadge(run);
            return (
              <div className="row" key={run.id}>
                <div className="row-main">
                  <span className="row-title">{run.display_title || "deploy"}</span>
                  <span className="row-sub">
                    {run.event} · {new Date(run.created_at).toLocaleString()} ·{" "}
                    <a href={run.html_url} target="_blank" rel="noreferrer">
                      로그
                    </a>
                  </span>
                </div>
                <span className={`badge ${b.cls}`}>{b.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
