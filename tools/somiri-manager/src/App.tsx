import { useEffect, useState } from "react";
import Login from "./components/Login";
import PackageList from "./components/PackageList";
import AddPackageForm from "./components/AddPackageForm";
import DeployStatus from "./components/DeployStatus";
import { getUser, REQUIRED_LOGIN, type GitHubUser } from "./lib/github";
import { getSecret, clearSecret, KEY_TOKEN } from "./lib/secrets";

type Phase = "loading" | "login" | "ready";
type Tab = "packages" | "add" | "deploy";

export default function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [tab, setTab] = useState<Tab>("packages");
  const [reloadKey, setReloadKey] = useState(0);

  // 시작 시 저장된 토큰으로 자동 로그인 시도 (achieveonepark 검증 포함).
  useEffect(() => {
    (async () => {
      const saved = await getSecret(KEY_TOKEN);
      if (!saved) {
        setPhase("login");
        return;
      }
      try {
        const u = await getUser(saved);
        if (u.login === REQUIRED_LOGIN) {
          setToken(saved);
          setUser(u);
          setPhase("ready");
          return;
        }
      } catch {
        /* 무효 토큰 → 폐기 */
      }
      await clearSecret(KEY_TOKEN);
      setPhase("login");
    })();
  }, []);

  function onAuthed(t: string, u: GitHubUser) {
    setToken(t);
    setUser(u);
    setPhase("ready");
  }

  async function logout() {
    await clearSecret(KEY_TOKEN);
    setToken(null);
    setUser(null);
    setPhase("login");
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          Somiri <span>Manager</span>
        </div>
        {user && (
          <div className="user">
            {user.avatar_url && <img className="avatar" src={user.avatar_url} alt="" />}
            <span>{user.login}</span>
            <button className="btn ghost" style={{ padding: "4px 10px" }} onClick={logout}>
              로그아웃
            </button>
          </div>
        )}
      </div>

      {phase === "loading" && (
        <p className="muted center">
          <span className="spin" /> 불러오는 중…
        </p>
      )}

      {phase === "login" && <Login onAuthed={onAuthed} />}

      {phase === "ready" && token && (
        <>
          <div className="tabs">
            <button
              className={`tab ${tab === "packages" ? "active" : ""}`}
              onClick={() => setTab("packages")}
            >
              패키지 / OpenUPM
            </button>
            <button
              className={`tab ${tab === "add" ? "active" : ""}`}
              onClick={() => setTab("add")}
            >
              패키지 추가
            </button>
            <button
              className={`tab ${tab === "deploy" ? "active" : ""}`}
              onClick={() => setTab("deploy")}
            >
              배포 상태
            </button>
          </div>

          {tab === "packages" && <PackageList key={`pkg-${reloadKey}`} token={token} />}
          {tab === "add" && (
            <AddPackageForm
              token={token}
              onAdded={() => {
                setReloadKey((k) => k + 1);
                setTab("deploy");
              }}
            />
          )}
          {tab === "deploy" && <DeployStatus key={`dep-${reloadKey}`} token={token} />}
        </>
      )}
    </div>
  );
}
