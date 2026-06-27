import { useEffect, useRef, useState } from "react";
import { openUrl } from "@tauri-apps/plugin-opener";
import {
  requestDeviceCode,
  pollForToken,
  getUser,
  REQUIRED_LOGIN,
  type DeviceCodeResp,
  type GitHubUser,
} from "../lib/github";
import { getSecret, setSecret, clearSecret, KEY_TOKEN, KEY_CLIENT_ID } from "../lib/secrets";

interface Props {
  onAuthed: (token: string, user: GitHubUser) => void;
}

export default function Login({ onAuthed }: Props) {
  const [clientId, setClientId] = useState("");
  const [device, setDevice] = useState<DeviceCodeResp | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    getSecret(KEY_CLIENT_ID).then((v) => v && setClientId(v));
    return () => {
      cancelled.current = true;
    };
  }, []);

  async function start() {
    setError(null);
    const id = clientId.trim();
    if (!id) {
      setError("OAuth App 의 Client ID 를 입력하세요.");
      return;
    }
    setBusy(true);
    try {
      await setSecret(KEY_CLIENT_ID, id);
      const dev = await requestDeviceCode(id);
      setDevice(dev);
      await openUrl(dev.verification_uri);
      void poll(id, dev);
    } catch (e) {
      setError(String(e));
      setBusy(false);
    }
  }

  async function poll(id: string, dev: DeviceCodeResp) {
    let interval = dev.interval || 5;
    const deadline = Date.now() + dev.expires_in * 1000;
    while (!cancelled.current && Date.now() < deadline) {
      await sleep(interval * 1000);
      if (cancelled.current) return;
      let res;
      try {
        res = await pollForToken(id, dev.device_code);
      } catch (e) {
        setError(String(e));
        setBusy(false);
        return;
      }
      if (res.status === "slow_down") {
        interval += 5;
        continue;
      }
      if (res.status === "pending") continue;
      if (res.status === "error") {
        setError(`인증 실패: ${res.error}`);
        setBusy(false);
        setDevice(null);
        return;
      }
      // ok
      const token = res.token!;
      try {
        const user = await getUser(token);
        if (user.login !== REQUIRED_LOGIN) {
          await clearSecret(KEY_TOKEN);
          setError(`'${user.login}' 계정으로 로그인했지만 이 앱은 ${REQUIRED_LOGIN} 계정만 사용할 수 있습니다.`);
          setBusy(false);
          setDevice(null);
          return;
        }
        await setSecret(KEY_TOKEN, token);
        onAuthed(token, user);
      } catch (e) {
        setError(String(e));
        setBusy(false);
      }
      return;
    }
    if (!cancelled.current) {
      setError("인증 시간이 만료되었습니다. 다시 시도하세요.");
      setBusy(false);
      setDevice(null);
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>GitHub 로그인</h2>
      <p className="muted">
        <strong>{REQUIRED_LOGIN}</strong> 계정으로만 사용할 수 있습니다. Device Flow 가 활성화된 OAuth
        App 의 Client ID 가 필요합니다.
      </p>

      <label>OAuth App Client ID</label>
      <input
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        placeholder="Iv1.xxxxxxxxxxxx"
        disabled={busy}
        spellCheck={false}
      />

      {!device && (
        <div className="actions">
          <button className="btn" onClick={start} disabled={busy}>
            {busy ? <span className="spin" /> : "로그인 시작"}
          </button>
        </div>
      )}

      {device && (
        <div style={{ marginTop: 18 }}>
          <p className="muted">
            브라우저에 아래 코드를 입력하세요. (창이 안 열리면{" "}
            <a href={device.verification_uri} target="_blank" rel="noreferrer">
              {device.verification_uri}
            </a>
            )
          </p>
          <div className="code">{device.user_code}</div>
          <p className="center muted">
            <span className="spin" /> 인증을 기다리는 중…
          </p>
        </div>
      )}

      {error && <div className="msg err">{error}</div>}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
