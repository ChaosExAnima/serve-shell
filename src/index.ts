import { $, argv, chalk } from 'zx';
import { runWithPrefix, withPrefix } from './utils';

const save = withPrefix('out');

async function pia() {
	const [state, region, ip] = await runWithPrefix(
		'piactl get',
		'connectionstate',
		'region',
		'vpnip',
	);
	await save('pia.json', { state, region, ip });
}

async function main() {
	if (argv.quiet) {
		$.verbose = false;
	}
	try {
		await Promise.all([pia()]);
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
