# somiri-docs (cording-library)

여러 Unity 패키지 문서를 `https://docs.somiri.dev/<패키지명>/` 형태로 통합 제공하는 문서 허브.

- **랜딩** (`/`) = 이 레포의 **Fumadocs (Next.js)** — `app/page.tsx` 가 `packages.json` 을 읽어 카드 목록을 렌더
- **각 패키지** (`/<패키지명>/`) = 해당 패키지 레포의 **`docs~/` (Fumadocs)** 를 CI 에서 빌드해 `site/<패키지명>/` 으로 합침
- **호스팅**: GitHub Pages (커스텀 도메인 `docs.somiri.dev`)
- **연결**: 포트폴리오 `www.somiri.dev`, 블로그 `blog.somiri.dev` (랜딩 상단/히어로 링크)

## 단일 소스: `packages.json`

패키지 목록은 **`packages.json` 한 파일**이 소스 오브 트루스다. 랜딩 카드와 배포 워크플로우의 빌드 매트릭스가 모두 이 파일을 읽는다.

```json
{
  "name": "infinity-value",                         // 레포명 = URL 경로 (achieveonepark/<name>)
  "title": "Infinity Value",                        // 카드에 표시되는 이름 (Title Case)
  "desc": "무한대 수치 연산을 지원하는 BigInteger 래퍼" // 카드 설명 (한국어)
}
```

- `href` 는 `name` 으로 자동 생성된다: `https://docs.somiri.dev/<name>/`
- 배열 순서가 곧 카드 노출 순서다.

## 배포 워크플로우 (`.github/workflows/deploy.yml`)

```
setup     packages.json → 빌드 매트릭스 생성
landing   Fumadocs 랜딩 빌드 → landing 아티팩트 (+ CNAME, .nojekyll)
package   패키지별 매트릭스 빌드. 각 레포 최신 커밋 SHA 로 캐싱 →
          변경된 패키지만 재빌드, 나머지는 캐시 복원 → pkg-<name> 아티팩트
deploy    landing + 모든 pkg-* 아티팩트를 site/ 로 조립 후 Pages 배포
```

> GitHub Pages 는 **사이트 전체를 하나의 아티팩트로** 배포한다. 그래서 한 패키지만
> 바뀌어도 항상 전체 사이트를 조립해 올린다(다른 패키지 유실 방지). 단 SHA 캐시 덕분에
> 실제로 다시 빌드되는 건 변경된 패키지뿐이라 빠르다.

### 트리거 3가지

| 트리거 | 동작 |
|---|---|
| `push` → `main` | 랜딩/목록 변경 시 전체 재조립·배포 (변경분만 재빌드) |
| `repository_dispatch` (`docs-updated`) | 패키지 레포가 docs 변경 시 자동 호출 |
| `workflow_dispatch` | Actions UI **Run workflow** — 드롭다운에서 특정 패키지 선택 시 캐시 무시 강제 재빌드 |

#### 패키지 레포 → 자동 트리거 설정 (레포마다 1회)

각 패키지 레포에 아래 워크플로우를 추가하면 docs 변경 시 허브가 자동 재배포된다.
`DOCS_HUB_TOKEN` = cording-library 에 `actions: write` 권한이 있는 PAT 를 그 레포 Secrets 에 등록.

```yaml
# 패키지 레포의 .github/workflows/notify-docs.yml
name: Notify docs hub
on:
  push:
    branches: [main]
    paths: ['docs~/**']
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.DOCS_HUB_TOKEN }}
          repository: achieveonepark/cording-library
          event-type: docs-updated
          client-payload: '{"package": "${{ github.event.repository.name }}"}'
```

## 새 패키지 추가하는 법

### A. 패키지 레포 쪽 (한 번)

1. 레포 루트에 **`docs~/`** 폴더로 Fumadocs 프로젝트를 만든다(기존 패키지의 `docs~/` 복사 후
   `next.config.mjs` 의 `repo` 값만 새 레포명으로 바꾸면 가장 쉽다 — `basePath = /<name>` 매핑).
2. **`*~` 전역 gitignore 주의**: `docs~` 는 `~` 로 끝나 무시될 수 있으니 레포 `.gitignore` 에
   `!docs~/` 한 줄을 넣어 추적되게 한다.
3. 자체 GitHub Pages 는 쓰지 않는다 (Settings → Pages → Source = None).
4. (선택) 위 `notify-docs.yml` 추가 → 이후 docs 변경 시 자동 배포.

### B. 통합 레포(cording-library) 쪽 — 이 절차로 진행

> **운영 규칙**: 사용자가 새 패키지명을 주면 아래 순서로 처리한다.

1. **`packages.json`** 배열에 항목 추가 (`name` / `title` / `desc`).
   - `desc` 는 패키지 README/설명을 **한국어로 번역해 작성**하고, **커밋·배포 전 사용자 검증**을 받는다.
2. **`.github/workflows/deploy.yml`** 의 `workflow_dispatch` → `inputs.package.options` 드롭다운에
   `name` 추가 (드롭다운은 YAML 고정값이라 packages.json 과 **함께** 갱신해야 함).
3. 로컬 `npm run build` 로 랜딩 빌드 확인.
4. `main` 에 커밋·푸시 → 자동 빌드·배포. `https://docs.somiri.dev/<name>/` 200 확인.

## 로컬 개발

```bash
npm install
npm run dev     # 랜딩 dev 서버
npm run build   # 랜딩 정적 빌드 (out/)
```

> 로컬에서는 **랜딩만** 뜬다. 패키지 본문은 CI 에서 각 레포 `docs~` 를 빌드해 합치므로,
> 패키지 페이지를 보려면 해당 레포에서 직접 `cd docs~ && npm run build` 한다.

## 배포 설정 (한 번)

1. **Settings → Pages → Source = GitHub Actions**.
2. **DNS(Cloudflare)**: `docs` → `achieveonepark.github.io` (DNS only / 회색 구름 권장).
3. **Settings → Pages → Custom domain** 에 `docs.somiri.dev` (워크플로우가 `CNAME` 자동 생성).

### private 패키지 레포

클론에 토큰이 필요하면 워크플로우의 clone 단계에 PAT 를 적용하도록 수정한다(현재는 public 기준).
