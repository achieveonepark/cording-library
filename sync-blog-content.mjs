import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = path.resolve(process.cwd(), 'src/content/blog');
const targetDir = path.resolve(process.cwd(), 'src/content/docs/blog');

async function exists(filePath) {
	try {
		await stat(filePath);
		return true;
	} catch (error) {
		if (error && error.code === 'ENOENT') return false;
		throw error;
	}
}

async function syncBlogContent() {
	const sourceExists = await exists(sourceDir);

	// Remove old mirrored files to prevent stale posts in docs/blog.
	await rm(targetDir, { recursive: true, force: true });

	if (!sourceExists) {
		await mkdir(targetDir, { recursive: true });
		console.log('[sync:blog] Source folder not found. Created empty docs/blog folder.');
		return;
	}

	await mkdir(path.dirname(targetDir), { recursive: true });
	await cp(sourceDir, targetDir, { recursive: true, force: true });
	console.log('[sync:blog] Synced src/content/blog -> src/content/docs/blog');
}

syncBlogContent().catch((error) => {
	console.error('[sync:blog] Failed to sync blog content.');
	console.error(error);
	process.exit(1);
});
