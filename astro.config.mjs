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
		}),
	],
});
