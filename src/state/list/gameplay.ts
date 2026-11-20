import { Container, Sprite, Ticker } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";
import { GameplayBuffer, MainmenuBuffer } from "../../transitions/types";
import { GameplayUi } from "../../ui/gameplay";
import { BulletContainer } from "../../entities/bulletContainer";

export class GameplayState implements State {
	name = "gameplay";
	container: Container;
	machine!: StateMachine;
	private ui: GameplayUi | null;
	private cameraContainer: Container | null;
	private player: Player | null;
	private enemyPlatforms: Sprite[];
	private bulletContainer: BulletContainer;

	constructor() {
		this.container = new Container();
		this.cameraContainer = null;

		// Game scene elements
		this.bulletContainer = new BulletContainer(this.container);
		this.enemyPlatforms = [];
		this.player = null;
		this.ui = null;
	}

	onEnter(stateMachine: StateMachine): void {
		const buffer = stateMachine.getBuffer();
		const mainmenuBuffer: MainmenuBuffer = buffer[0];
		const gameplayBuffer: GameplayBuffer = buffer[1];
		this.machine = stateMachine;
		this.cameraContainer = mainmenuBuffer.cameraContainer;
		this.player = mainmenuBuffer.player;
		this.ui = gameplayBuffer.ui;
		this.enemyPlatforms = gameplayBuffer.platforms;

		this.enemyPlatforms.forEach((p) => this.cameraContainer?.addChild(p));
		this.container.addChild(this.cameraContainer);
		this.ui.addToContainer(this.container);

		this.player.start(stateMachine, this.bulletContainer);
		this.player.container.zIndex = 1;
	}

	update(ticker: Ticker): void {
		this.player?.update(ticker);
		this.bulletContainer.update(ticker);
	}
}
