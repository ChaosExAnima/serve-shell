import { runWithPrefix, withPrefix } from "./utils";

const save = withPrefix("out");

async function pia() {
	const [state, region, ip] = await runWithPrefix(
		"piactl get",
		"connectionstate",
		"region",
		"vpnip"
	);
	await save("pia.json", { state, region, ip });
}

pia();
