# somiri-docs

여러 패키지 문서를 `somiri.dev/docs/패키지명` 형태로 통합 제공하는 VitePress 문서 사이트.

- **호스팅**: GitHub Pages (커스텀 도메인 `somiri.dev`, 사이트는 `/docs` 하위)
- **빌드/배포**: GitHub Actions (`.github/workflows/deploy.yml`)
- **실제 URL**: `https://somiri.dev/docs/`, 패키지는 `https://somiri.dev/docs/패키지명`

## 구조

```
somiri-docs/
├── .github/workflows/deploy.yml  # 빌드 + Cloudflare Pages 배포
├── .vitepress/config.ts          # VitePress 설정 (base: /docs/, nav, sidebar)
├── index.md                      # 랜딩 페이지
├── <패키지명>/                    # 각 패키지 docs (CI가 클론·복사, 커밋 X)
└── package.json
```

> 패키지 폴더(`AchEngine/`, `AchUtils/` 등)는 직접 커밋하지 않는다.
> GitHub Actions 가 각 패키지 레포를 클론해 `./패키지명/` 으로 복사한다.
> (base 가 `/docs/` 라서 `somiri.dev/docs/패키지명` 으로 서빙된다.)

## 로컬 개발

```bash
npm install
npm run docs:dev     # 개발 서버
npm run docs:build   # 정적 빌드 (.vitepress/dist)
```

> 로컬 dev 서버는 `http://localhost:5173/docs/` 로 열린다.
> 패키지 폴더가 비어 있으면 해당 페이지는 표시되지 않으니,
> 직접 확인하려면 해당 레포의 docs 를 `./패키지명/` 으로 복사하면 된다.

## 패키지 목록

| 패키지명 | 레포 URL | docs 경로 |
|---|---|---|
| AchEngine | https://github.com/achieveonepark/AchEngine | `docs/` |
| AchUtils | https://github.com/achieveonepark/AchUtils | `docs/` |
| npc-mentality | https://github.com/achieveonepark/npc-mentality | `docs/` |
| lite-db | https://github.com/achieveonepark/lite-db | `docs/` |

> 실제 레포 URL / docs 경로는 `.github/workflows/deploy.yml` 의 `PACKAGES` 와
> `.vitepress/config.ts` 에서 수정한다.

## 배포 설정

GitHub Pages 로 배포한다.

1. 레포 **Settings → Pages → Build and deployment → Source** 를
   **GitHub Actions** 로 설정한다.
2. **Settings → Pages → Custom domain** 에 `somiri.dev` 등록
   (DNS 는 `somiri.dev` → GitHub Pages 로 연결).
3. `main` 브랜치에 push 하면 워크플로우가 자동으로 빌드·배포한다.

워크플로우가 빌드 결과를 `/docs` 하위로 감싸고 `CNAME`(somiri.dev)을 넣기 때문에
`https://somiri.dev/docs/` 로 서빙되며, 루트(`somiri.dev`) 접속은 `/docs/` 로 리다이렉트된다.

### private 패키지 레포

각 패키지 레포가 private 이면 클론에 토큰이 필요하다.
**Settings → Secrets and variables → Actions** 에 `DOCS_TOKEN`
(해당 레포 읽기 권한이 있는 PAT)을 등록하면 워크플로우가 자동으로 사용한다.
public 레포만 쓰면 시크릿은 필요 없다.
