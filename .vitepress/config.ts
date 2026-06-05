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
        text: '패키지',
        items: [
          { text: 'AchEngine', link: '/AchEngine/' },
          { text: 'AchUtils', link: '/AchUtils/' },
          { text: 'npc-mentality', link: '/npc-mentality/' },
          { text: 'infinity-value', link: '/infinity-value/' },
          { text: 'cheat-terminal', link: '/cheat-terminal/' },
          { text: 'breeze-iap', link: '/breeze-iap/' },
          { text: 'data-protector', link: '/data-protector/' },
          { text: 'quick-save', link: '/quick-save/' },
          { text: 'achieve-package-manager', link: '/achieve-package-manager/' },
          { text: 'lite-db', link: '/lite-db/' },
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
