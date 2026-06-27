import { HomeLayout } from 'fumadocs-ui/layouts/home';
import packagesData from '../packages.json';

// 패키지 목록은 packages.json 단일 소스에서 읽는다.
// 새 패키지 추가 시 packages.json 한 곳만 수정하면 랜딩 카드와 배포 워크플로우에 함께 반영된다.
// openupm 필드가 있으면 OpenUPM 에 등록된 패키지 → 카드에 버전 뱃지를 노출한다.
type PackageEntry = {
  name: string;
  title: string;
  desc: string;
  openupm?: string;
};

const packages = (packagesData as PackageEntry[]).map((pkg) => ({
  ...pkg,
  href: `https://docs.somiri.dev/${pkg.name}/`,
}));

export default function HomePage() {
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
      <main className="container mx-auto max-w-5xl px-4 py-24">
        <div className="mb-20 text-center">
          <span className="mb-5 inline-block rounded-full border bg-fd-card px-4 py-1.5 text-sm font-medium text-fd-muted-foreground">
            Unity Open Source Packages
          </span>
          <h1 className="mb-5 bg-gradient-to-br from-fd-foreground to-fd-muted-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
            Somiri Library
          </h1>
          <p className="mx-auto max-w-xl text-lg text-fd-muted-foreground">
            somiri 가 만든 여러 Unity 패키지 문서를 한 곳에서 확인하세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href="https://www.somiri.dev"
              className="rounded-lg border bg-fd-card px-4 py-2 font-medium transition-colors hover:bg-fd-accent"
            >
              포트폴리오 →
            </a>
            <a
              href="https://blog.somiri.dev"
              className="rounded-lg border bg-fd-card px-4 py-2 font-medium transition-colors hover:bg-fd-accent"
            >
              블로그 →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <a
              key={pkg.name}
              href={pkg.href}
              className="group flex flex-col rounded-xl border bg-fd-card p-6 transition-all hover:-translate-y-0.5 hover:bg-fd-accent hover:shadow-md"
            >
              <h2 className="mb-2 font-semibold text-fd-card-foreground">{pkg.title}</h2>
              <p className="mb-4 flex-1 text-sm text-fd-muted-foreground">{pkg.desc}</p>
              {pkg.openupm && (
                <img
                  src={`https://img.shields.io/npm/v/${pkg.openupm}?label=openupm&registry_uri=https://package.openupm.com&color=3068b7&style=flat`}
                  alt={`OpenUPM ${pkg.openupm}`}
                  className="mb-3 h-5 w-auto self-start"
                />
              )}
              <span className="text-sm font-medium text-fd-primary group-hover:underline">
                문서 보기 →
              </span>
            </a>
          ))}
        </div>
      </main>
    </HomeLayout>
  );
}
