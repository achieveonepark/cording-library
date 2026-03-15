import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context, next) => {
	const route = context.locals.starlightRoute;
	if (!route) return next();

	const rssGuideHref = buildRssGuideHref(route.locale);
	const rssFeedHref = buildRssFeedHref(route.locale);
	const currentPath = normalizePath(context.url.pathname);

	route.sidebar = rewriteSidebar(route.sidebar, rssFeedHref, rssGuideHref, currentPath);

	return next();
});

function rewriteSidebar(sidebar, rssFeedHref, rssGuideHref, currentPath) {
	return sidebar.map((entry) => {
		if (entry.type === 'group') {
			return {
				...entry,
				entries: rewriteSidebar(entry.entries, rssFeedHref, rssGuideHref, currentPath),
			};
		}

		if (normalizePath(entry.href) !== normalizePath(rssFeedHref)) {
			return entry;
		}

		return {
			...entry,
			href: rssGuideHref,
			isCurrent: normalizePath(rssGuideHref) === currentPath,
		};
	});
}

function buildRssGuideHref(locale) {
	return buildLocalizedHref(locale, 'rss');
}

function buildRssFeedHref(locale) {
	return buildLocalizedHref(locale, 'blog/rss.xml');
}

function buildLocalizedHref(locale, path) {
	const localePrefix = locale ? `/${trimSlashes(locale)}` : '';
	return `${localePrefix}/${trimSlashes(path)}/`.replace(/\/+$/, path.endsWith('.xml') ? '' : '/');
}

function trimSlashes(value) {
	return String(value ?? '').replace(/^\/+|\/+$/g, '');
}

function normalizePath(value) {
	const pathname = value.startsWith('/') ? value : `/${value}`;
	return pathname.endsWith('/') ? pathname : `${pathname}/`;
}
