import { Container, Sprite, Ticker } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";
import { GameplayBuffer, MainmenuBuffer } from "../../transitions/types";
import { GameplayUi } from "../../ui/gameplay";

export class GameplayState implements State {
	name = "gameplay";
	container: Container;
	machine!: StateMachine;
	private ui: GameplayUi | null;
	private cameraContainer: Container | null;
	private background: Sprite | null;
	private ground: Sprite | null;
	private player: Player | null;
	private playerPlatform: Sprite | null;
	private enemyPlatforms: Sprite[];

	constructor() {
		this.container = new Container();
		this.cameraContainer = null;

		// Game scene elements
		this.ui = null;
		this.background = null;
		this.ground = null;
		this.player = null;
		this.playerPlatform = null;
		this.enemyPlatforms = [];
	}

	onEnter(stateMachine: StateMachine): void {
		const buffer = stateMachine.getBuffer();
		const mainmenuBuffer: MainmenuBuffer = buffer[0];
		const gameplayBuffer: GameplayBuffer = buffer[1];
		this.machine = stateMachine;
		this.cameraContainer = mainmenuBuffer.cameraContainer;
		this.player = mainmenuBuffer.player;
		this.background = mainmenuBuffer.background;
		this.ground = mainmenuBuffer.ground;
		this.ui = gameplayBuffer.ui;
		this.enemyPlatforms = gameplayBuffer.platforms;

		this.enemyPlatforms.forEach((p) => this.cameraContainer?.addChild(p));
		this.container.addChild(this.cameraContainer);
		this.ui.addToContainer(this.container);

		this.player.start();
	}

	update(ticker: Ticker): void {
		this.player?.update(ticker);
	}
}
