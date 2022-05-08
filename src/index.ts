import { $, argv, chalk } from 'zx';

import { processToMap, runWithPrefix, withPrefix } from './utils';
import SpeedTest from './speedtest';

const save = withPrefix('out');

async function pia() {
	const [state, region, ip] = await runWithPrefix(
		'piactl get',
		'connectionstate',
		'region',
		'vpnip',
	);
	await save('pia.json', processToMap({ state, region, ip }));
}

async function speedtest() {
	const time = await SpeedTest();
	await save('speedtest.json', { speedtest: time });
}

async function main() {
	if (argv.quiet) {
		$.verbose = false;
	}
	try {
		await Promise.all([pia(), speedtest()]);
		console.log(chalk.yellow('✅ updated files'));
	} catch (error) {
		let message = 'Unknown';
		if (error instanceof Error) {
			message = error.message;
		}
		console.log(chalk.red('🆘 ERROR:', message));
	}
}

main().then(() => process.exit());
