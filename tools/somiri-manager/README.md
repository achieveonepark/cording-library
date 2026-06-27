# Somiri Manager

`docs.somiri.dev`(cording-library) 패키지 목록을 관리하는 개인용 데스크톱 앱(Tauri v2).

- **achieveonepark 계정 전용** — GitHub OAuth Device Flow 로 로그인하고, 로그인 계정이
  `achieveonepark` 가 아니면 아무 동작도 하지 않는다.
- **새 패키지 추가** — name / title / desc 입력 → `packages.json` 과 `.github/workflows/deploy.yml`
  드롭다운을 **한 커밋으로** main 에 반영(= 배포 자동 트리거).
- **OpenUPM 조회** — 각 패키지 레포의 `package.json` name 으로 OpenUPM 등록 여부를 확인하고,
  등록된 것은 `packages.json` 의 `openupm` 필드로 반영(랜딩 뱃지 연동) 가능.
- **배포 상태** — `deploy.yml` 워크플로의 최근 실행을 보여주고, 수동 재배포를 실행.

## 사전 준비: OAuth App 생성 (최초 1회)

1. GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App
2. **Enable Device Flow** 체크. (Authorization callback URL 은 아무 값이나 — 예: `http://localhost`)
3. 발급된 **Client ID** 를 앱 로그인 화면에 입력한다. (이후 OS 키체인에 저장됨)

> 로그인 시 요청 scope 는 `repo workflow` 다. `.github/workflows/deploy.yml` 을 수정·커밋하려면
> `workflow` scope 가 필요하다.

## 실행 / 빌드 (사용자 PC)

사전 요구: Node 18+, Rust(stable), 그리고 [Tauri v2 시스템 의존성](https://tauri.app/start/prerequisites/).

```bash
cd tools/somiri-manager
npm install
npm run tauri dev     # 개발 실행
npm run tauri build   # 릴리스 빌드(설치 파일 생성)
```

토큰과 Client ID 는 OS 키체인(서비스명 `somiri-manager`)에 저장된다.

## 구조

```
src/                프런트엔드 (Vite + React + TS)
  lib/github.ts     device flow / 단일 커밋(Git Data API) / 워크플로 상태·실행
  lib/openupm.ts    package.json name 해석 + OpenUPM 등록 조회
  lib/packages.ts   packages.json 편집 + deploy.yml 옵션 삽입
  lib/secrets.ts    키체인 커맨드 래퍼
  components/       Login / PackageList / AddPackageForm / DeployStatus
src-tauri/          Rust 셸 (키체인 커맨드 set/get/clear_secret + http/opener 플러그인)
```

> 아이콘(`src-tauri/icons/*`)은 단색 임시 이미지다. 배포 전 `npm run tauri icon <png>` 로 교체 권장.
