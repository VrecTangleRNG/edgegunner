import { Application } from "pixi.js";

import { StateMachine } from './state/machine';
import * as AssetsManager from './systems/assets';
import { MainmenuState } from "./state/list/mainmenu";

async function main(): Promise<void> {

	// Game Initializations
	const app = new Application();
	await app.init({
		width: 960,
		height: 540,
		backgroundColor: 0x000000
	});
	document.body.appendChild(app.canvas);
	app.stage.sortableChildren = true;
	app.stage.eventMode = "static";

	await AssetsManager.load();

	const stateMachine = new StateMachine(app);
	stateMachine.push(new MainmenuState());

	// Game Loop and State Machine
	app.ticker.add((ticker) => {
		stateMachine.update(ticker);
	});
}

await main();
