import { Container, Sprite } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";

export class GameplayState implements State {
	name = "gameplay";
	container: Container;
	machine!: StateMachine;

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
		this.background = null;
		this.ground = null;
		this.player = null;
		this.playerPlatform = null;
		this.enemyPlatforms = [];
		for (let i = 0; i < 3; i++) this.enemyPlatforms[i] = Sprite.from("platform");
	}

	onEnter(stateMachine: StateMachine): void {
		this.machine = stateMachine;
	}
}
