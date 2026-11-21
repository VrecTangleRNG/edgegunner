import { Container, Sprite, Ticker } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";
import { GameplayBuffer, MainmenuBuffer } from "../../transitions/types";
import { GameplayUi } from "../../ui/gameplay";
import { BulletContainer } from "../../entities/bulletContainer";
import { EnemySpawner } from "../../entities/enemySpawner";

export class GameplayState implements State {
	container: Container = new Container();
	machine!: StateMachine;
	name = "gameplay";
	private bulletContainer: BulletContainer = new BulletContainer();
	private cameraContainer: Container | null = null;
	private enemyPlatforms: Sprite[] = [];
	private player: Player | null = null;
	private spawner: EnemySpawner | null = null;
	private ui: GameplayUi | null = null;

	onEnter(stateMachine: StateMachine): void {
		const buffer = stateMachine.getBuffer();
		const mainmenuBuffer: MainmenuBuffer = buffer[0];
		const gameplayBuffer: GameplayBuffer = buffer[1];
		this.cameraContainer = mainmenuBuffer.cameraContainer;
		this.enemyPlatforms = gameplayBuffer.platforms;
		this.machine = stateMachine;
		this.player = mainmenuBuffer.player;
		this.spawner = gameplayBuffer.enemySpawner;
		this.ui = gameplayBuffer.ui;

		this.enemyPlatforms.forEach((p) => this.cameraContainer?.addChild(p));
		this.spawner.addToContainer(this.cameraContainer);
		this.container.addChild(this.cameraContainer);
		this.bulletContainer.addToContainer(this.cameraContainer);
		this.ui.addToContainer(this.container);

		this.player.start(stateMachine, this.bulletContainer);
		this.player.binder.zIndex = 1;
	}

	update(ticker: Ticker): void {
		this.bulletContainer.update(ticker);
		this.player?.update(ticker);
		this.spawner?.update(ticker);
	}
}
