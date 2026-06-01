import { defineConfig } from 'vitepress'

// 통합 문서 "랜딩" 사이트 설정 (VitePress)
// 사이트는 somiri.dev/docs 하위에 서빙된다 (base: '/docs/').
// 각 패키지 문서는 각자의 Docusaurus 를 CI(GitHub Actions)에서
// baseUrl=/docs/패키지명/ 으로 빌드해 /docs/패키지명/ 에 합친다.
// 즉 VitePress 는 랜딩만, 패키지 본문은 Docusaurus 가 담당하는 하이브리드.
export default defineConfig({
  lang: 'ko-KR',
  title: 'somiri.dev docs',
  description: 'somiri 패키지 통합 문서',

  // 실제 URL: https://somiri.dev/docs/
  base: '/docs/',

  cleanUrls: true,
  lastUpdated: true,

  // 루트 README 는 페이지로 만들지 않음
  srcExclude: ['README.md'],

  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: 'AchEngine', link: '/AchEngine/' },
      { text: 'AchUtils', link: '/AchUtils/' },
      { text: 'npc-mentality', link: '/npc-mentality/' },
      { text: 'lite-db', link: '/lite-db/' },
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
