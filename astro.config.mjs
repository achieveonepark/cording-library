// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://library.a1tech.dev',
	integrations: [
		starlight({
			title: 'A1 TECH',
			customCss: [
				'./src/styles.css',
			],      
			components: {
				Footer: './src/components/Footer.astro',
			},
			logo: {
				src: './src/assets/logo.png',
				alt: 'A1 TECH keyboard logo',
				// 로고만 쓰고 타이틀 텍스트는 숨기고 싶으면:
				// replacesTitle: true,
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
		}),
	],
});
