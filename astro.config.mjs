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
			title: '게임 개발자의 머릿속',
			description: 'Unity Game 개발, C#, .NET, 패턴/아키텍처 정리 라이브러리 사이트',
			customCss: [
				'/src/styles.css',
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
					repo: 'achieveonepark/cording-library',
					repoId: 'R_kgDOMj5hYA',
					category: 'General',
					categoryId: 'DIC_kwDOMj5hYM4Cx16X',
					
					mapping: 'pathname',
					reactions: true,
					inputPosition: 'bottom',
					lang: 'ko',
				}),
			],
		}),
	],
});
