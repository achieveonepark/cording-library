import { spawn } from 'node:child_process';
import path from 'node:path';

const projectRoot = process.cwd();
const nodeBin = process.execPath;
const astroEntry = path.resolve(projectRoot, 'node_modules', 'astro', 'astro.js');
const sharedEnv = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };

const syncProcess = spawn(nodeBin, [path.resolve(projectRoot, 'sync-content.mjs'), '--watch', '--skip-initial'], {
	cwd: projectRoot,
	env: sharedEnv,
	stdio: 'inherit',
});

const astroProcess = spawn(nodeBin, [astroEntry, 'dev'], {
	cwd: projectRoot,
	env: sharedEnv,
	stdio: 'inherit',
});

const shutdown = (exitCode = 0) => {
	if (!syncProcess.killed) syncProcess.kill('SIGTERM');
	if (!astroProcess.killed) astroProcess.kill('SIGTERM');
	process.exit(exitCode);
};

astroProcess.on('exit', (code) => {
	if (!syncProcess.killed) syncProcess.kill('SIGTERM');
	process.exit(code ?? 0);
});

syncProcess.on('exit', (code) => {
	if (code && !astroProcess.killed) {
		astroProcess.kill('SIGTERM');
		process.exit(code);
	}
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
