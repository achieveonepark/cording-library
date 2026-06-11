import { HomeLayout } from 'fumadocs-ui/layouts/home';

const packages = [
  {
    name: 'AchEngine',
    desc: 'Unity 씬·오브젝트·이벤트를 관리하는 게임 코어 프레임워크',
    href: 'https://docs.somiri.dev/AchEngine/',
  },
  {
    name: 'AchUtils',
    desc: 'Unity 개발 생산성을 높이는 확장 메서드·유틸리티 컬렉션',
    href: 'https://docs.somiri.dev/AchUtils/',
  },
  {
    name: 'npc-mentality',
    desc: '상태 머신 기반 NPC AI 행동 패턴 시스템',
    href: 'https://docs.somiri.dev/npc-mentality/',
  },
  {
    name: 'infinity-value',
    desc: '무한대 수치 연산을 지원하는 BigInteger 래퍼',
    href: 'https://docs.somiri.dev/infinity-value/',
  },
  {
    name: 'cheat-terminal',
    desc: '인게임 치트 코드·디버그 콘솔 툴킷',
    href: 'https://docs.somiri.dev/cheat-terminal/',
  },
  {
    name: 'breeze-iap',
    desc: 'Unity IAP를 async/await으로 감싼 가벼운 구매 래퍼',
    href: 'https://docs.somiri.dev/breeze-iap/',
  },
  {
    name: 'data-protector',
    desc: 'Unity 데이터 암호화·압축·무결성 검증 라이브러리',
    href: 'https://docs.somiri.dev/data-protector/',
  },
  {
    name: 'quick-save',
    desc: 'MemoryPack 기반 경량 세이브 시스템',
    href: 'https://docs.somiri.dev/quick-save/',
  },
  {
    name: 'achieve-package-manager',
    desc: 'Unity 패키지 설치·버전 관리 도구',
    href: 'https://docs.somiri.dev/achieve-package-manager/',
  },
  {
    name: 'lite-db',
    desc: '읽기전용 SQLite 기반 Unity 테이블 저장소',
    href: 'https://docs.somiri.dev/lite-db/',
  },
];

export default function HomePage() {
  return (
    <HomeLayout
      nav={{ title: 'somiri.dev docs' }}
      links={[
        {
          text: 'GitHub',
          url: 'https://github.com/achieveonepark',
          external: true,
        },
      ]}
    >
      <main className="container mx-auto max-w-5xl px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold">somiri.dev docs</h1>
          <p className="text-xl text-fd-muted-foreground">
            somiri 의 여러 패키지 문서를 한 곳에서 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <a
              key={pkg.name}
              href={pkg.href}
              className="group flex flex-col rounded-xl border bg-fd-card p-6 transition-all hover:bg-fd-accent hover:shadow-md"
            >
              <h2 className="mb-2 font-semibold text-fd-card-foreground">{pkg.name}</h2>
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
