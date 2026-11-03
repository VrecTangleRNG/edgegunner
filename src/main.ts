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

	// Loads assets from file
	app.stage.sortableChildren = true;
	app.stage.eventMode = "static";
	await AssetsManager.load();

	// Launch the first state at game's startup
	const stateMachine = new StateMachine(
		new MainmenuState(app)
	);

	// Game Loop and State Machine
	app.ticker.add((ticker) => {
		stateMachine.run(ticker);
	});
}

await main();
