import { HomeLayout } from 'fumadocs-ui/layouts/home';

const packages = [
  {
    title: 'AchEngine',
    desc: 'Unity 씬·오브젝트·이벤트를 관리하는 게임 코어 프레임워크',
    href: 'https://docs.somiri.dev/AchEngine/',
  },
  {
    title: 'AchUtils',
    desc: 'Unity 개발 생산성을 높이는 확장 메서드·유틸리티 컬렉션',
    href: 'https://docs.somiri.dev/AchUtils/',
  },
  {
    title: 'NPC Mentality',
    desc: '상태 머신 기반 NPC AI 행동 패턴 시스템',
    href: 'https://docs.somiri.dev/npc-mentality/',
  },
  {
    title: 'Infinity Value',
    desc: '무한대 수치 연산을 지원하는 BigInteger 래퍼',
    href: 'https://docs.somiri.dev/infinity-value/',
  },
  {
    title: 'Cheat Terminal',
    desc: '인게임 치트 코드·디버그 콘솔 툴킷',
    href: 'https://docs.somiri.dev/cheat-terminal/',
  },
  {
    title: 'Breeze IAP',
    desc: 'Unity IAP를 async/await으로 감싼 가벼운 구매 래퍼',
    href: 'https://docs.somiri.dev/breeze-iap/',
  },
  {
    title: 'Data Protector',
    desc: 'Unity 데이터 암호화·압축·무결성 검증 라이브러리',
    href: 'https://docs.somiri.dev/data-protector/',
  },
  {
    title: 'Quick Save',
    desc: 'MemoryPack 기반 경량 세이브 시스템',
    href: 'https://docs.somiri.dev/quick-save/',
  },
  {
    title: 'Achieve Package Manager',
    desc: 'Unity 패키지 설치·버전 관리 도구',
    href: 'https://docs.somiri.dev/achieve-package-manager/',
  },
  {
    title: 'Lite DB',
    desc: '읽기전용 SQLite 기반 Unity 테이블 저장소',
    href: 'https://docs.somiri.dev/lite-db/',
  },
];

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
              key={pkg.title}
              href={pkg.href}
              className="group flex flex-col rounded-xl border bg-fd-card p-6 transition-all hover:-translate-y-0.5 hover:bg-fd-accent hover:shadow-md"
            >
              <h2 className="mb-2 font-semibold text-fd-card-foreground">{pkg.title}</h2>
              <p className="mb-4 flex-1 text-sm text-fd-muted-foreground">{pkg.desc}</p>
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
