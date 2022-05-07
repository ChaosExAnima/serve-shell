import { $, chalk, fs, ProcessOutput } from 'zx';

export function runAll(...args: string[]): Promise<ProcessOutput[]> {
	return Promise.all(args.map(arg => $`${arg.split(' ')}`));
}

export function runWithPrefix(prefix: string, ...args: string[]): Promise<ProcessOutput[]> {
	return runAll(...args.map(arg => `${prefix} ${arg}`));
}

export function error(error: unknown) {
	let message = 'Unknown';
	if (error instanceof Error) {
		message = error.message;
	}
	console.log(chalk.red('ERROR: ', message));
}

export async function toFile(path: string, input: Record<string, ProcessOutput>): Promise<void> {
	const stringValues = Object.entries(input).map(([key, value]) => [key, value.toString().trim()]);
	await fs.outputJSON(path, Object.fromEntries(stringValues), {spaces: '\t'});
}

export function withPrefix(dir: string) {
	return (path: string, input: Record<string, ProcessOutput>) => toFile(`${dir}/${path}`, input);
}
