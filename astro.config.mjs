// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightGiscus from 'starlight-giscus'; // 🔹 추가

export default defineConfig({
	site: 'https://library.a1tech.dev',
	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true
		}),
		starlight({
			title: 'A1 TECH',
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
					label: 'Study',
					autogenerate: { directory: 'Study' },
				},
				{
					label: 'Analysis',
					autogenerate: { directory: 'Analysis' },
				},
				{
					label: 'Documents',
					autogenerate: { directory: 'Documents' },
				},
				{
					label: 'DesignPattern',
					items: [
						{
							label: 'GoF',
							autogenerate: { directory: 'DesignPattern/GoF' },
						},
						{
							label: 'GameProgramming',
							autogenerate: { directory: 'DesignPattern/GameProgramming' },
						},
					],
				},
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
