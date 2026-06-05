import { defineConfig } from 'vitepress'

// 통합 문서 "랜딩" 사이트 설정 (VitePress)
// 사이트는 docs.somiri.dev 루트에 서빙된다 (base: '/').
// 각 패키지 문서는 각자의 Docusaurus 를 CI(GitHub Actions)에서
// baseUrl=/패키지명/ 으로 빌드해 /패키지명/ 에 합친다.
// 즉 VitePress 는 랜딩만, 패키지 본문은 Docusaurus 가 담당하는 하이브리드.
export default defineConfig({
  lang: 'ko-KR',
  title: 'somiri.dev docs',
  description: 'somiri 패키지 통합 문서',

  // 실제 URL: https://docs.somiri.dev/
  base: '/',

  cleanUrls: true,
  lastUpdated: true,

  // 랜딩(VitePress)은 패키지 본문을 빌드하지 않지만, 혹시 마크다운이
  // 섞여 들어와도 빌드가 죽지 않도록 dead link 검사는 끈다.
  ignoreDeadLinks: true,

  // 루트 README, 그리고 패키지 변환 작업용 temp/ 는 스캔에서 제외
  srcExclude: ['README.md', 'temp/**'],

  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      {
        // 패키지 본문은 각자 독립 Docusaurus(같은 도메인 다른 경로)라
        // VitePress SPA 라우팅을 타지 않도록 절대 URL + 같은 탭 이동.
        text: '패키지',
        items: [
          { text: 'AchEngine', link: 'https://docs.somiri.dev/AchEngine/', target: '_self' },
          { text: 'AchUtils', link: 'https://docs.somiri.dev/AchUtils/', target: '_self' },
          { text: 'npc-mentality', link: 'https://docs.somiri.dev/npc-mentality/', target: '_self' },
          { text: 'infinity-value', link: 'https://docs.somiri.dev/infinity-value/', target: '_self' },
          { text: 'cheat-terminal', link: 'https://docs.somiri.dev/cheat-terminal/', target: '_self' },
          { text: 'breeze-iap', link: 'https://docs.somiri.dev/breeze-iap/', target: '_self' },
          { text: 'data-protector', link: 'https://docs.somiri.dev/data-protector/', target: '_self' },
          { text: 'quick-save', link: 'https://docs.somiri.dev/quick-save/', target: '_self' },
          { text: 'achieve-package-manager', link: 'https://docs.somiri.dev/achieve-package-manager/', target: '_self' },
          { text: 'lite-db', link: 'https://docs.somiri.dev/lite-db/', target: '_self' },
        ],
      },
    ],

    // 패키지 본문은 각자의 Docusaurus 가 자체 사이드바를 가지므로
    // VitePress 사이드바는 두지 않는다. (nav 링크로만 진입)

    socialLinks: [
      { icon: 'github', link: 'https://github.com/achieveonepark' },
    ],

    search: {
      provider: 'local',
    },
  },
})
