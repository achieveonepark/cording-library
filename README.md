# somiri-docs

여러 패키지 문서를 `docs.somiri.dev/패키지명` 형태로 통합 제공하는 문서 사이트.

**하이브리드 구성**:
- **랜딩** (`/`) = 이 레포의 **VitePress** (패키지 카드 목록)
- **각 패키지** (`/패키지명/`) = 해당 패키지 레포의 **Docusaurus** 를
  CI 에서 `baseUrl=/패키지명/` 로 빌드해 합침 (각자의 사이드바·i18n·문법 그대로 유지)

기타:
- **호스팅**: GitHub Pages (커스텀 도메인 `docs.somiri.dev`)
- **빌드/배포**: GitHub Actions (`.github/workflows/deploy.yml`)
- **실제 URL**: `https://docs.somiri.dev/`, 패키지는 `https://docs.somiri.dev/패키지명`

> `somiri.dev` 루트는 이미 메인 사이트(별도 레포)가 점유 중이라,
> 같은 도메인 `/docs` 경로로는 GitHub Pages 만으로 못 붙인다(한 도메인=한 Pages 레포).
> 그래서 **서브도메인 `docs.somiri.dev`** 로 분리했다.

## 구조

```
somiri-docs/
├── .github/workflows/deploy.yml  # VitePress 랜딩 + 패키지 Docusaurus 빌드/배포
├── .vitepress/config.ts          # VitePress 랜딩 설정 (base: /docs/, nav)
├── index.md                      # 랜딩 페이지 (패키지 카드)
└── package.json
```

> 패키지 본문은 이 레포에 두지 않는다.
> CI 가 각 패키지 레포의 Docusaurus 를 빌드해 `site/패키지명/` 으로 합친다.

## 로컬 개발

```bash
npm install
npm run docs:dev     # VitePress 랜딩 dev 서버 (http://localhost:5173/docs/)
npm run docs:build   # 랜딩 정적 빌드 (.vitepress/dist)
```

> 로컬에서는 **랜딩만** 뜬다. 패키지 본문(Docusaurus)은 CI 에서만 합쳐지므로
> 패키지 페이지를 보려면 해당 레포에서 직접 `npm run build` 하면 된다.

## 패키지 목록

| 패키지명 | 레포 URL | Docusaurus 경로 |
|---|---|---|
| AchEngine | https://github.com/achieveonepark/AchEngine | `Docs~` |
| AchUtils | https://github.com/achieveonepark/AchUtils | `Docs~` |
| npc-mentality | https://github.com/achieveonepark/npc-mentality | `Docs~` |
| lite-db | https://github.com/achieveonepark/lite-db | `Docs~` |

> 실제 레포 URL / 경로는 `.github/workflows/deploy.yml` 의 `PACKAGES` 에서 수정한다.
> `PACKAGES` 경로는 `docusaurus.config.ts` 가 있는 폴더를 가리켜야 한다.
>
> CI 는 각 패키지의 `docusaurus.config` 에서 `baseUrl` 을 `/패키지명/` 로,
> `url` 을 `https://docs.somiri.dev` 로 덮어쓴 뒤 빌드한다.

### i18n 참고

각 패키지 Docusaurus 가 다국어(`ko/en/...`)면 `npm run build` 는 기본 로케일만 빌드한다.
다른 로케일까지 배포하려면 워크플로우의 build 단계를 로케일별로 확장해야 한다.

## 배포 설정

GitHub Pages 로 배포한다.

1. 레포 **Settings → Pages → Build and deployment → Source** 를
   **GitHub Actions** 로 설정한다.
2. **DNS(Cloudflare)** 에 CNAME 레코드 추가:
   `docs` → `achieveonepark.github.io` (TLS 인증서 발급을 위해 **DNS only/회색 구름** 권장).
3. **Settings → Pages → Custom domain** 에 `docs.somiri.dev` 등록
   (워크플로우가 `CNAME` 파일도 자동 생성하므로 보통 자동 인식됨).
4. `main` 브랜치에 push 하면 워크플로우가 자동으로 빌드·배포한다.

`https://docs.somiri.dev/` 가 랜딩, `https://docs.somiri.dev/패키지명/` 이 각 패키지 문서다.

### private 패키지 레포

각 패키지 레포가 private 이면 클론에 토큰이 필요하다.
**Settings → Secrets and variables → Actions** 에 `DOCS_TOKEN`
(해당 레포 읽기 권한이 있는 PAT)을 등록하면 워크플로우가 자동으로 사용한다.
public 레포만 쓰면 시크릿은 필요 없다.
