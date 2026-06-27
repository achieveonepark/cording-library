export interface PackageEntry {
  name: string;
  title: string;
  desc: string;
  openupm?: string;
}

// "infinity-value" → "Infinity Value"
export function titleCase(name: string): string {
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function parsePackages(text: string): PackageEntry[] {
  return JSON.parse(text) as PackageEntry[];
}

export function serializePackages(list: PackageEntry[]): string {
  return JSON.stringify(list, null, 2) + "\n";
}

export function addPackage(list: PackageEntry[], entry: PackageEntry): PackageEntry[] {
  if (list.some((p) => p.name === entry.name)) {
    throw new Error(`이미 등록된 패키지입니다: ${entry.name}`);
  }
  return [...list, entry];
}

// 레포명 형식 검증 (GitHub 레포명에 쓰는 안전한 문자만 허용)
export function isValidName(name: string): boolean {
  return /^[A-Za-z0-9._-]+$/.test(name);
}

// deploy.yml 의 workflow_dispatch options 목록 끝에 새 옵션 한 줄을 삽입한다.
// 매트릭스는 packages.json 에서 자동 생성되므로 드롭다운 옵션만 갱신하면 된다.
export function addDeployOption(yaml: string, name: string): string {
  const lines = yaml.split("\n");

  let optionsStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*options:\s*$/.test(lines[i])) {
      optionsStart = i;
      break;
    }
  }
  if (optionsStart === -1) throw new Error("deploy.yml 에서 options: 블록을 찾지 못했습니다.");

  let lastOption = -1;
  for (let i = optionsStart + 1; i < lines.length; i++) {
    if (/^\s*-\s+/.test(lines[i])) {
      lastOption = i;
    } else if (lines[i].trim() !== "" && !/^\s*#/.test(lines[i])) {
      break; // 들여쓰기가 풀린 다음 키 → 블록 끝
    }
  }
  if (lastOption === -1) throw new Error("deploy.yml 에서 options 항목을 찾지 못했습니다.");

  // 이미 들어있으면 그대로 둔다.
  const exists = lines
    .slice(optionsStart + 1, lastOption + 1)
    .some((l) => new RegExp(`^\\s*-\\s+${escapeRegExp(name)}\\s*$`).test(l));
  if (exists) return yaml;

  const indent = lines[lastOption].match(/^(\s*)-/)?.[1] ?? "          ";
  lines.splice(lastOption + 1, 0, `${indent}- ${name}`);
  return lines.join("\n");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
