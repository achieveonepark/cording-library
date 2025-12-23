// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightGiscus from 'starlight-giscus';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://library.a1tech.dev',
	integrations: [
		sitemap(),
		mermaid({
			theme: 'neutral',
			autoTheme: true
		}),
		starlight({
			title: 'A1 TECH',
			description: 'Unity Game 개발, C#, .NET, 패턴/아키텍처 정리 라이브러리 사이트',
			customCss: [
				'./src/styles.css',
			],
			logo: {
				src: './src/assets/logo.png',
				alt: 'A1 TECH keyboard logo',
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/achieveonepark',
				},
			],
			sidebar: [
				{
					label: 'Diagnostics',
					collapsed: true,
					autogenerate: { directory: 'Diagnostics' },
				},
				{
					label: 'Packages',
					collapsed: true,
					autogenerate: { directory: 'Packages' },
				},
				{
					label: 'Study',
					collapsed: true,
					autogenerate: { directory: 'Study' },
				}
			],
			plugins: [
				starlightGiscus({
					repo: 'achieveonepark/cording-library',          // giscus data-repo
					repoId: 'R_kgDOMj5hYA',                           // giscus data-repo-id
					category: 'General',                              // giscus data-category
					categoryId: 'DIC_kwDOMj5hYM4Cx16X',               // giscus data-category-id

					// 선택 옵션들 (원하면 나중에 튜닝 가능)
					mapping: 'pathname',          // 페이지 → Discussion 매핑 방식
					reactions: true,       // 😄 / 🚀 같은 리액션
					inputPosition: 'bottom',      // 댓글 입력창 위치
					lang: 'ko',                   // UI 언어
				}),
			],
		}),
	],
});
