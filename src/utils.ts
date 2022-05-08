import { $, fs, ProcessOutput } from 'zx';

export function runAll(...args: string[]): Promise<ProcessOutput[]> {
	return Promise.all(args.map((arg) => $`${arg.split(' ')}`));
}

export function runWithPrefix(
	prefix: string,
	...args: string[]
): Promise<ProcessOutput[]> {
	return runAll(...args.map((arg) => `${prefix} ${arg}`));
}

export function processToMap(
	output: Record<string, ProcessOutput>,
): Record<string, string> {
	return Object.fromEntries(
		Object.entries(output).map(([key, value]) => [
			key,
			value.toString().trim(),
		]),
	);
}

export async function toFile(
	path: string,
	output: Record<string, any>,
): Promise<void> {
	await fs.outputJSON(path, output, {
		spaces: '\t',
	});
}

export function withPrefix(dir: string) {
	return (path: string, input: Record<string, any>) =>
		toFile(`${dir}/${path}`, input);
}
