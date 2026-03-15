// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightGiscus from 'starlight-giscus';
import starlightBlog from 'starlight-blog';
import sitemap from '@astrojs/sitemap';
import astroD2 from 'astro-d2';

export default defineConfig({
	site: 'https://lib.somiri.dev',
	integrations: [
		sitemap(),
		astroD2({
			sketch: true,
			experimental: {
				useD2js: true,
			},
		}),
		mermaid({
			theme: 'neutral',
			autoTheme: true,
		}),
		starlight({
			title: {
				ko: 'SOMIRI DEV',
				en: 'SOMIRI DEV',
				ja: 'SOMIRI DEV',
			},
			description: 'Technical library for Unity, C#, .NET, architecture, and troubleshooting notes.',
			locales: {
				root: {
					label: '한국어',
					lang: 'ko',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
				ja: {
					label: '日本語',
					lang: 'ja',
				},
			},
			defaultLocale: 'root',
			routeMiddleware: ['./src/starlightRouteData.ts'],
			customCss: ['/src/styles.css'],
			components: {
				Search: './src/components/SearchWithSectionSwitch.astro',
			},
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
					label: 'R&D',
					collapsed: true,
					autogenerate: { directory: 'R&D' },
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
				},
			],
			plugins: [
				starlightBlog({
					title: {
						ko: '블로그',
						en: 'Blog',
						ja: 'ブログ',
					},
					navigation: 'none',
				}),
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
