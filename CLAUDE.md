# CLAUDE.md

이 레포(cording-library)는 `docs.somiri.dev` 문서 허브다. 아키텍처 전반은 `README.md` 참고.
아래는 **에이전트 운영 규칙**이다.

## 패키지 목록 = 단일 소스 `packages.json`

랜딩 카드(`app/page.tsx`)와 배포 워크플로우 매트릭스가 모두 `packages.json` 을 읽는다.
항목: `{ "name": "<레포명>", "title": "<표시명 Title Case>", "desc": "<한국어 설명>" }`
`href` 는 `name` 으로 자동 생성(`https://docs.somiri.dev/<name>/`). 배열 순서 = 카드 노출 순서.

## 새 패키지 추가 절차 (사용자가 패키지명을 줄 때)

1. **`packages.json`** 에 항목 추가 (`name` / `title` / `desc`).
   - `title` 은 레포명을 Title Case 로 (예: `infinity-value` → `Infinity Value`).
   - `desc` 는 패키지 README/설명을 **한국어로 번역해 작성**한다.
2. **`.github/workflows/deploy.yml`** → `workflow_dispatch.inputs.package.options` 드롭다운에
   `name` 을 추가한다. (드롭다운은 YAML 고정값이라 `packages.json` 과 **반드시 함께** 갱신)
3. **desc 검증**: 커밋·푸시 **전에** 작성한 `desc` 한국어 문구를 사용자에게 보여주고 승인받는다.
4. 로컬 `npm run build` 로 랜딩 빌드 확인.
5. **`main` 에 커밋·푸시** → 자동 빌드·배포. (이 레포는 main 푸시로 배포가 트리거됨)

## 배포 동작 메모

- Pages 는 사이트 전체를 한 아티팩트로 배포 → 워크플로우가 항상 전체 사이트를 조립한다.
  단 패키지별 빌드는 **각 레포 최신 커밋 SHA 로 캐싱**되어 변경분만 재빌드된다.
- 트리거: `push`(main) / `repository_dispatch`(`docs-updated`) / `workflow_dispatch`(UI 드롭다운).
- 수동 재배포가 필요하고 workflow_dispatch 권한이 막혀 있으면 `main` 빈 커밋 푸시로 트리거한다.
- 빌드 검증 후 커밋한다. `package-lock.json` 의 install 부산물 변경은 커밋에 포함하지 않는다.
