# somiri-docs (cording-library)

여러 Unity 패키지 문서를 `https://docs.somiri.dev/<패키지명>/` 형태로 통합 제공하는 문서 허브.

- **랜딩** (`/`) = 이 레포의 **Fumadocs (Next.js)** — `app/page.tsx` 가 `packages.json` 을 읽어 카드 목록을 렌더
- **각 패키지** (`/<패키지명>/`) = 해당 패키지 레포의 **`docs~/` (Fumadocs)** 를 CI 에서 빌드해 `site/<패키지명>/` 으로 합침
- **호스팅**: Cloudflare Pages (`somiri-docs.pages.dev`, 커스텀 도메인 `docs.somiri.dev`)
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
- OpenUPM에 등록된 패키지는 `openupm` 필드에 실제 패키지 ID를 넣으면 버전 배지가 표시된다.
  현재 등록된 항목은 `infinity-value` (`com.achieve.infinity-value`)와
  `cheat-terminal` (`com.achieve.cheat-terminal`)이다. 관리 앱의 OpenUPM 조회 기능으로 갱신할 수 있다.

## 배포 워크플로우 (`.github/workflows/deploy.yml`)

```
setup     packages.json → 빌드 매트릭스 생성
landing   Fumadocs 랜딩 빌드 → landing 아티팩트
package   패키지별 매트릭스 빌드. 각 레포 최신 커밋 SHA 로 캐싱 →
          변경된 패키지만 재빌드, 나머지는 캐시 복원 → pkg-<name> 아티팩트
deploy    landing + 모든 pkg-* 아티팩트를 site/ 로 조립 → cloudflare-pages 브랜치에 저장
          → Deploy Hook으로 Cloudflare Pages 배포 → 성공 검사까지 대기
```

> Cloudflare Pages에 **사이트 전체를 하나의 결과물로** 배포한다. 그래서 한 패키지만
> 바뀌어도 항상 전체 사이트를 조립해 올린다(다른 패키지 유실 방지). 단 SHA 캐시 덕분에
> 실제로 다시 빌드되는 건 변경된 패키지뿐이라 빠르다.

모든 패키지의 `index.html`이 존재하는지 확인한 뒤에만 게시한다. Pages는
`cloudflare-pages` 브랜치의 정적 파일을 그대로 제공하며 서버 빌드는 하지 않는다.
이 브랜치는 빌드 결과만 보관하고, 소스 수정은 항상 `main`에서 한다.
일반 Git 푸시에 의한 Pages 자동 배포는 꺼두고 Deploy Hook으로 한 번만 배포한다.
워크플로는 Cloudflare의 GitHub 검사 결과까지 기다리므로 기존 관리 앱에서도
실제 배포 성공·실패를 확인할 수 있다.

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

### B. 통합 레포(cording-library) 쪽

`packages.json` 항목 추가 + `deploy.yml` 드롭다운 갱신 → main 푸시면 배포된다.
구체적인 처리 순서(에이전트 운영 규칙, `desc` 번역·검증 포함)는 **[`CLAUDE.md`](./CLAUDE.md)** 참고.

## 로컬 개발

```bash
npm install
npm run dev     # 랜딩 dev 서버
npm run build   # 랜딩 정적 빌드 (out/)
```

> 로컬에서는 **랜딩만** 뜬다. 패키지 본문은 CI 에서 각 레포 `docs~` 를 빌드해 합치므로,
> 패키지 페이지를 보려면 해당 레포에서 직접 `cd docs~ && npm run build` 한다.

## 배포 설정 (한 번)

1. Cloudflare Pages 프로젝트 `somiri-docs`를 이 저장소의 `cloudflare-pages` 브랜치에 연결한다.
   빌드 명령은 비우고 저장소 루트의 정적 파일을 배포한다. Preview와 Git 푸시 자동 배포는 끈다.
2. 같은 브랜치용 Deploy Hook을 만들고 URL을 이 저장소의 Actions Secret
   `CLOUDFLARE_DEPLOY_HOOK`에 저장한다. 이 URL은 저장소 파일이나 로그에 남기지 않는다.
3. Pages의 Custom domains에 `docs.somiri.dev`를 추가하고, Cloudflare DNS의
   `docs` CNAME을 `somiri-docs.pages.dev`로 변경한다. 기존 GitHub Pages 대상 레코드를 교체한다.
4. 새 도메인이 활성화되고 문서 경로가 정상인지 확인한 뒤 기존 GitHub Pages의
   커스텀 도메인을 해제하고 이 허브 저장소를 private로 바꿀 수 있다.

허브가 private여도 Cloudflare GitHub App의 저장소 접근 권한이 있으면 배포할 수 있다.
라이브러리의 원본 패키지 저장소는 이 변경 대상이 아니며, OpenUPM 배포와 문서 빌드는
기존 공개 저장소를 계속 사용한다.

### private 패키지 레포

클론에 토큰이 필요하면 워크플로우의 clone 단계에 PAT 를 적용하도록 수정한다(현재는 public 기준).
