# somiri-docs

여러 패키지 문서를 `somiri.dev/docs/패키지명` 형태로 통합 제공하는 VitePress 문서 사이트.

- **호스팅**: Cloudflare Pages
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

GitHub 레포 Secrets 에 다음을 등록한다.

- `CF_API_TOKEN` — Cloudflare API 토큰
- `CF_ACCOUNT_ID` — Cloudflare 계정 ID

`main` 브랜치에 push 하면 자동으로 빌드·배포된다.
