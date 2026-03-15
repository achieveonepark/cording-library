import { createHash } from 'node:crypto';
import { statSync, watch } from 'node:fs';
import { cp, mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const docsRoot = path.resolve(projectRoot, 'src/content/docs');
const blogSourceDir = path.resolve(projectRoot, 'src/content/blog');
const blogTargetDir = path.resolve(docsRoot, 'blog');
const manifestPath = path.resolve(projectRoot, '.cache/content-sync-manifest.json');
const localeDirs = ['en', 'ja'];
const markdownExtensions = new Set(['.md', '.mdx']);
const ignoredSourceTopLevelDirs = new Set(localeDirs);
const ignoredWatchTopLevelDirs = new Set([...localeDirs, 'blog']);
const isWatchMode = process.argv.includes('--watch');
const skipInitialSync = process.argv.includes('--skip-initial');

if (!skipInitialSync) {
	await syncAll();
}

if (isWatchMode) {
	startWatchMode();
}

async function syncAll() {
	const previousManifest = await readManifest();

	await syncBlogContent();

	const sourceEntries = await collectSourceEntries();
	const localeResults = [];

	for (const locale of localeDirs) {
		localeResults.push(await syncLocaleDocs(locale, sourceEntries, previousManifest?.sourceEntries ?? {}));
	}

	await writeManifest({ sourceEntries });

	for (const result of localeResults) {
		if (result.moved > 0 || result.removed > 0) {
			console.log(
				`[sync:i18n] ${result.locale}: moved ${result.moved} file(s), removed ${result.removed} stale file(s).`
			);
		}
	}
}

async function syncBlogContent() {
	const sourceExists = await exists(blogSourceDir);

	await rm(blogTargetDir, { recursive: true, force: true });

	if (!sourceExists) {
		await mkdir(blogTargetDir, { recursive: true });
		console.log('[sync:blog] Source folder not found. Created empty docs/blog folder.');
		return;
	}

	await mkdir(path.dirname(blogTargetDir), { recursive: true });
	await cp(blogSourceDir, blogTargetDir, { recursive: true, force: true });
	console.log('[sync:blog] Synced src/content/blog -> src/content/docs/blog');
}

async function syncLocaleDocs(locale, sourceEntries, previousSourceEntries) {
	const localeRoot = path.resolve(docsRoot, locale);
	await mkdir(localeRoot, { recursive: true });

	const localeFiles = new Set(await collectMarkdownRelativePaths(localeRoot));
	const currentSourcePaths = new Set(Object.keys(sourceEntries));
	const movedOldPaths = new Set();
	let moved = 0;
	let removed = 0;

	for (const [sourceRelativePath, sourceMeta] of Object.entries(sourceEntries)) {
		if (localeFiles.has(sourceRelativePath)) continue;

		const moveCandidate = findMoveCandidate({
			localeFiles,
			currentSourcePaths,
			previousSourceEntries,
			sourceMeta,
			sourceRelativePath,
		});

		if (!moveCandidate) continue;

		const oldPath = path.resolve(localeRoot, moveCandidate);
		const newPath = path.resolve(localeRoot, sourceRelativePath);

		await mkdir(path.dirname(newPath), { recursive: true });
		await rename(oldPath, newPath);

		localeFiles.delete(moveCandidate);
		localeFiles.add(sourceRelativePath);
		movedOldPaths.add(moveCandidate);
		moved += 1;
	}

	for (const previousRelativePath of Object.keys(previousSourceEntries)) {
		if (currentSourcePaths.has(previousRelativePath) || movedOldPaths.has(previousRelativePath)) continue;

		const staleLocalePath = path.resolve(localeRoot, previousRelativePath);
		if (!(await exists(staleLocalePath))) continue;

		await rm(staleLocalePath, { force: true });
		localeFiles.delete(previousRelativePath);
		removed += 1;
	}

	await pruneEmptyDirectories(localeRoot, true);

	return { locale, moved, removed };
}

function findMoveCandidate({
	localeFiles,
	currentSourcePaths,
	previousSourceEntries,
	sourceMeta,
	sourceRelativePath,
}) {
	const previousEntries = Object.entries(previousSourceEntries);

	const hashCandidate = findUniqueCandidate(
		previousEntries.filter(
			([relativePath, previousMeta]) =>
				previousMeta.hash === sourceMeta.hash &&
				relativePath !== sourceRelativePath &&
				localeFiles.has(relativePath) &&
				!currentSourcePaths.has(relativePath)
		)
	);
	if (hashCandidate) return hashCandidate;

	if (sourceMeta.title) {
		const titleCandidate = findUniqueCandidate(
			previousEntries.filter(
				([relativePath, previousMeta]) =>
					previousMeta.title === sourceMeta.title &&
					relativePath !== sourceRelativePath &&
					localeFiles.has(relativePath) &&
					!currentSourcePaths.has(relativePath)
			)
		);
		if (titleCandidate) return titleCandidate;
	}

	const stemCandidate = findUniqueCandidate(
		previousEntries.filter(
			([relativePath, previousMeta]) =>
				previousMeta.stem === sourceMeta.stem &&
				relativePath !== sourceRelativePath &&
				localeFiles.has(relativePath) &&
				!currentSourcePaths.has(relativePath)
		)
	);
	if (stemCandidate) return stemCandidate;

	const basenameCandidate = findUniqueCandidate(
		[...localeFiles]
			.filter(
				(relativePath) =>
					path.posix.basename(relativePath) === path.posix.basename(sourceRelativePath) &&
					relativePath !== sourceRelativePath &&
					!currentSourcePaths.has(relativePath)
			)
			.map((relativePath) => [relativePath, null])
	);
	if (basenameCandidate) return basenameCandidate;

	return undefined;
}

function findUniqueCandidate(candidates) {
	return candidates.length === 1 ? candidates[0][0] : undefined;
}

async function collectSourceEntries() {
	const entries = {};
	const filePaths = await collectMarkdownRelativePaths(docsRoot, ignoredSourceTopLevelDirs);

	for (const relativePath of filePaths) {
		const absolutePath = path.resolve(docsRoot, relativePath);
		const raw = await readFile(absolutePath, 'utf8');

		entries[relativePath] = {
			hash: createHash('sha1').update(raw).digest('hex'),
			title: readTitle(raw),
			stem: path.posix.basename(relativePath, path.posix.extname(relativePath)),
		};
	}

	return entries;
}

async function collectMarkdownRelativePaths(rootDir, ignoredTopLevelDirs = new Set()) {
	if (!(await exists(rootDir))) return [];

	const entries = [];

	async function walkDirectory(currentDir) {
		const children = await readdir(currentDir, { withFileTypes: true });

		for (const child of children) {
			const absolutePath = path.join(currentDir, child.name);
			const relativePath = normalizeRelativePath(path.relative(rootDir, absolutePath));
			const topLevelDir = relativePath.split('/')[0];

			if (child.isDirectory()) {
				if (ignoredTopLevelDirs.has(topLevelDir)) continue;
				await walkDirectory(absolutePath);
				continue;
			}

			if (!markdownExtensions.has(path.extname(child.name))) continue;
			entries.push(relativePath);
		}
	}

	await walkDirectory(rootDir);
	return entries.sort();
}

function readTitle(raw) {
	const match = raw.match(/^---\s*[\r\n]+[\s\S]*?^title:\s*(.+?)\s*$/m);
	return match?.[1]?.replace(/^['"]|['"]$/g, '') ?? '';
}

async function readManifest() {
	if (!(await exists(manifestPath))) return undefined;

	try {
		const raw = await readFile(manifestPath, 'utf8');
		return JSON.parse(raw);
	} catch {
		return undefined;
	}
}

async function writeManifest(payload) {
	await mkdir(path.dirname(manifestPath), { recursive: true });
	await writeFile(
		manifestPath,
		`${JSON.stringify({ ...payload, updatedAt: new Date().toISOString() }, null, 2)}\n`,
		'utf8'
	);
}

async function pruneEmptyDirectories(directory, preserveRoot = false) {
	if (!(await exists(directory))) return false;

	const children = await readdir(directory, { withFileTypes: true });
	let hasFiles = false;

	for (const child of children) {
		const childPath = path.join(directory, child.name);

		if (child.isDirectory()) {
			const childHasFiles = await pruneEmptyDirectories(childPath);
			hasFiles ||= childHasFiles;
			continue;
		}

		hasFiles = true;
	}

	if (!hasFiles && !preserveRoot) {
		await rm(directory, { recursive: true, force: true });
	}

	return hasFiles;
}

function startWatchMode() {
	console.log('[sync] Watching for content changes...');

	let queued = false;
	let running = false;
	let timer;

	const queueSync = (reason) => {
		if (shouldIgnoreWatchEvent(reason)) return;

		clearTimeout(timer);
		timer = setTimeout(async () => {
			if (running) {
				queued = true;
				return;
			}

			running = true;
			try {
				await syncAll();
			} catch (error) {
				console.error('[sync] Failed while watching content changes.');
				console.error(error);
			} finally {
				running = false;
				if (queued) {
					queued = false;
					queueSync('queued');
				}
			}
		}, 150);
	};

	const docsWatcher = watch(docsRoot, { recursive: true }, (_eventType, filename) => {
		queueSync(filename?.toString() ?? '');
	});

	let blogWatcher;
	if (pathExistsSync(blogSourceDir)) {
		blogWatcher = watch(blogSourceDir, { recursive: true }, (_eventType, filename) => {
			queueSync(filename?.toString() ?? '');
		});
	}

	const closeWatchers = () => {
		docsWatcher.close();
		blogWatcher?.close();
		process.exit(0);
	};

	process.on('SIGINT', closeWatchers);
	process.on('SIGTERM', closeWatchers);
}

function shouldIgnoreWatchEvent(filename) {
	const normalized = normalizeRelativePath(filename);
	const topLevelDir = normalized.split('/')[0];
	return ignoredWatchTopLevelDirs.has(topLevelDir);
}

function normalizeRelativePath(value) {
	return String(value).replace(/\\/g, '/');
}

async function exists(filePath) {
	try {
		await stat(filePath);
		return true;
	} catch (error) {
		if (error && error.code === 'ENOENT') return false;
		throw error;
	}
}

function pathExistsSync(filePath) {
	try {
		statSync(filePath);
		return true;
	} catch {
		return false;
	}
}
