import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: 'docs',
  base: '/',
  title: 'Somiri Library',
  description: 'somiri 가 만든 Unity 패키지 통합 문서',
  lang: 'ko',
  outDir: 'out',
  themeConfig: {
    nav: [
      { text: 'Portfolio', link: 'https://www.somiri.dev' },
      { text: 'Blog', link: 'https://blog.somiri.dev' },
      { text: 'GitHub', link: 'https://github.com/achieveonepark' },
    ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/achieveonepark',
      },
    ],
  },
});
