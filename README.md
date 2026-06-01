# somiri-docs

여러 패키지 문서를 `somiri.dev/docs/패키지명` 형태로 통합 제공하는 VitePress 문서 사이트.

- **호스팅**: GitHub Pages
- **빌드/배포**: GitHub Actions (`.github/workflows/deploy.yml`)

## 구조

```
somiri-docs/
├── .github/workflows/deploy.yml  # 빌드 + Cloudflare Pages 배포
├── .vitepress/config.ts          # VitePress 설정 (base, nav, sidebar)
├── index.md                      # 랜딩 페이지
├── docs/                         # 각 패키지 docs (CI가 클론·복사, 커밋 X)
└── package.json
```

> `docs/` 하위 패키지 폴더는 직접 커밋하지 않는다.
> GitHub Actions 가 각 패키지 레포를 클론해 `docs/패키지명/` 으로 복사한다.

## 로컬 개발

```bash
npm install
npm run docs:dev     # 개발 서버
npm run docs:build   # 정적 빌드 (.vitepress/dist)
```

> 로컬에서는 `docs/` 가 비어 있어 패키지 페이지가 표시되지 않을 수 있다.
> 패키지 문서를 직접 확인하려면 해당 레포의 docs 를 `docs/패키지명/` 으로 복사하면 된다.

## 패키지 목록

| 패키지명 | 레포 URL | docs 경로 |
|---|---|---|
| AchEngine | https://github.com/somiri/AchEngine | `docs/` |
| AchUtils | https://github.com/somiri/AchUtils | `docs/` |
| npc-mentality | https://github.com/somiri/npc-mentality | `docs/` |
| lite-db | https://github.com/somiri/lite-db | `docs/` |

> 실제 레포 URL / docs 경로는 `.github/workflows/deploy.yml` 의 `PACKAGES` 와
> `.vitepress/config.ts` 에서 수정한다.

## 배포 설정

GitHub Pages 로 배포한다. 별도 시크릿은 필요 없다.

1. 레포 **Settings → Pages → Build and deployment → Source** 를
   **GitHub Actions** 로 설정한다.
2. `main` 브랜치에 push 하면 워크플로우가 자동으로 빌드·배포한다.

### 커스텀 도메인 / base 경로

- 커스텀 도메인(`somiri.dev`)을 쓰면 `.vitepress/config.ts` 의 `base: '/'` 그대로 둔다.
  (Settings → Pages 에서 도메인 등록 + `public/CNAME` 추가)
- 커스텀 도메인 없이 `<user>.github.io/<repo>/` 로 서빙한다면
  `base` 를 `'/<repo>/'` 로 바꿔야 링크가 깨지지 않는다.
