import { useState } from "react";
import { getFileText, commitFiles } from "../lib/github";
import {
  parsePackages,
  serializePackages,
  addPackage,
  addDeployOption,
  titleCase,
  isValidName,
  type PackageEntry,
} from "../lib/packages";

interface Props {
  token: string;
  onAdded: () => void;
}

export default function AddPackageForm({ token, onAdded }: Props) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [titleEdited, setTitleEdited] = useState(false);
  const [desc, setDesc] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function onNameChange(v: string) {
    setName(v);
    if (!titleEdited) setTitle(titleCase(v));
  }

  async function submit() {
    setMsg(null);
    const n = name.trim();
    if (!isValidName(n)) {
      setMsg({ kind: "err", text: "레포명 형식이 올바르지 않습니다. (영문/숫자/-/_/. 만 허용)" });
      return;
    }
    if (!desc.trim()) {
      setMsg({ kind: "err", text: "설명(desc)을 입력하세요." });
      return;
    }
    setBusy(true);
    try {
      const [pkgText, ymlText] = await Promise.all([
        getFileText(token, "packages.json"),
        getFileText(token, ".github/workflows/deploy.yml"),
      ]);
      const entry: PackageEntry = { name: n, title: title.trim() || titleCase(n), desc: desc.trim() };
      const newPkgList = addPackage(parsePackages(pkgText), entry);
      const newPkgText = serializePackages(newPkgList);
      const newYmlText = addDeployOption(ymlText, n);

      const sha = await commitFiles(token, `Add ${n} package to docs hub`, [
        { path: "packages.json", content: newPkgText },
        { path: ".github/workflows/deploy.yml", content: newYmlText },
      ]);
      setMsg({
        kind: "ok",
        text: `'${n}' 추가 완료 (커밋 ${sha.slice(0, 7)}). main 푸시로 배포가 자동 실행됩니다.`,
      });
      setName("");
      setTitle("");
      setTitleEdited(false);
      setDesc("");
      onAdded();
    } catch (e) {
      setMsg({ kind: "err", text: String(e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>새 패키지 추가</h2>
      <p className="muted">
        packages.json 목록과 deploy.yml 드롭다운에 동시에 추가하고 main 에 한 커밋으로 반영합니다.
      </p>

      <label>레포명 (name) — URL 경로가 됩니다</label>
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="ach-tempo"
        disabled={busy}
        spellCheck={false}
      />

      <label>표시명 (title)</label>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setTitleEdited(true);
        }}
        placeholder="Ach Tempo"
        disabled={busy}
        spellCheck={false}
      />

      <label>설명 (desc, 한국어)</label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="패키지가 하는 일을 한국어로 설명"
        disabled={busy}
      />

      <div className="actions">
        <button className="btn" onClick={submit} disabled={busy}>
          {busy ? <span className="spin" /> : "추가하고 커밋"}
        </button>
      </div>

      {msg && <div className={`msg ${msg.kind}`}>{msg.text}</div>}
    </div>
  );
}
