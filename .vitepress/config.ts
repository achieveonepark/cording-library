import { defineConfig } from 'vitepress'

// 통합 문서 사이트 설정
// 각 패키지의 docs 는 CI(GitHub Actions)에서 클론·복사되어 ./docs/패키지명/ 에 위치한다.
export default defineConfig({
  lang: 'ko-KR',
  title: 'somiri.dev docs',
  description: 'somiri 패키지 통합 문서',

  // Cloudflare Pages 커스텀 도메인(somiri.dev) 사용 예정이므로 base 는 루트
  base: '/',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: 'AchEngine', link: '/docs/AchEngine/' },
      { text: 'AchUtils', link: '/docs/AchUtils/' },
      { text: 'npc-mentality', link: '/docs/npc-mentality/' },
      { text: 'lite-db', link: '/docs/lite-db/' },
    ],

    // 패키지별 개별 사이드바
    sidebar: {
      '/docs/AchEngine/': [
        {
          text: 'AchEngine',
          items: [{ text: '소개', link: '/docs/AchEngine/' }],
        },
      ],
      '/docs/AchUtils/': [
        {
          text: 'AchUtils',
          items: [{ text: '소개', link: '/docs/AchUtils/' }],
        },
      ],
      '/docs/npc-mentality/': [
        {
          text: 'npc-mentality',
          items: [{ text: '소개', link: '/docs/npc-mentality/' }],
        },
      ],
      '/docs/lite-db/': [
        {
          text: 'lite-db',
          items: [{ text: '소개', link: '/docs/lite-db/' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/somiri' },
    ],

    search: {
      provider: 'local',
    },
  },
})
