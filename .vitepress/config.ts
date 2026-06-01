import { defineConfig } from 'vitepress'

// 통합 문서 사이트 설정
// 사이트는 somiri.dev/docs 하위에 서빙된다 (base: '/docs/').
// 각 패키지의 docs 는 CI(GitHub Actions)에서 클론·복사되어 ./패키지명/ 에 위치한다.
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

    // 패키지별 개별 사이드바 (키는 base 를 제외한 경로)
    sidebar: {
      '/AchEngine/': [
        {
          text: 'AchEngine',
          items: [{ text: '소개', link: '/AchEngine/' }],
        },
      ],
      '/AchUtils/': [
        {
          text: 'AchUtils',
          items: [{ text: '소개', link: '/AchUtils/' }],
        },
      ],
      '/npc-mentality/': [
        {
          text: 'npc-mentality',
          items: [{ text: '소개', link: '/npc-mentality/' }],
        },
      ],
      '/lite-db/': [
        {
          text: 'lite-db',
          items: [{ text: '소개', link: '/lite-db/' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/achieveonepark' },
    ],

    search: {
      provider: 'local',
    },
  },
})
