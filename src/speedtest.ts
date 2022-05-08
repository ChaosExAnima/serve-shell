import fetch from 'node-fetch';

async function test(): Promise<number> {
	const start = Date.now();
	let time = 0;
	try {
		await fetch('https://www.google.com', { method: 'head' });
		time = Date.now() - start;
	} catch (err) {}
	return time;
}

export default async function speedtest(times = 5): Promise<number> {
	const timings = await Promise.all([...Array(times)].map(() => test()));
	return Math.round(
		timings.reduce((prev, timing) => prev + timing, 0) / times,
	);
}
