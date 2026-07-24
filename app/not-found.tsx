'use client';

import { HomeLayout } from 'fumadocs-ui/layouts/home';

// 커스텀 404. output: 'export' 라 빌드 시 out/404.html 로 생성되어
// GitHub Pages 가 없는 경로에 대해 이 페이지를 서빙한다.
export default function NotFound() {
  return (
    <HomeLayout
      nav={{
        title: (
          <span className="font-semibold tracking-tight">
            Somiri <span className="text-fd-primary">Library</span>
          </span>
        ),
      }}
      links={[
        {
          text: 'Portfolio',
          url: 'https://www.somiri.dev',
          external: true,
        },
        {
          text: 'Blog',
          url: 'https://blog.somiri.dev',
          external: true,
        },
        {
          text: 'GitHub',
          url: 'https://github.com/achieveonepark',
          external: true,
        },
      ]}
    >
      <main className="container mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
        <span className="mb-6 inline-block rounded-full border bg-fd-card px-4 py-1.5 text-sm font-medium text-fd-muted-foreground">
          404 — Page Not Found
        </span>
        <h1 className="mb-4 bg-gradient-to-br from-fd-foreground to-fd-muted-foreground bg-clip-text text-7xl font-bold tracking-tight text-transparent sm:text-9xl">
          404
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg text-fd-muted-foreground">
          찾으시는 페이지가 존재하지 않거나 이동됐어요.
          <br />
          주소를 확인하시거나 홈에서 다시 찾아보세요.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <a
            href="/"
            className="rounded-lg border bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            홈으로 →
          </a>
          <a
            href="https://github.com/achieveonepark"
            className="rounded-lg border bg-fd-card px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            GitHub →
          </a>
        </div>
      </main>
    </HomeLayout>
  );
}
