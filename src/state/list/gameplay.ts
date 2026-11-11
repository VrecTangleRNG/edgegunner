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
	private enemuPlatforms: Sprite[];

	constructor() {
		this.container = new Container();
		this.cameraContainer = null;

		// Game scene elements
		this.background = null;
		this.ground = null;
		this.player = null;
		this.playerPlatform = null;
		this.enemuPlatforms = [];
		for (let i = 0; i < 3; i++) this.enemuPlatforms[i] = Sprite.from("platform");
	}

	onEnter(stateMachine: StateMachine): void {
		this.machine = stateMachine;
		stateMachine.addBuffer([
			this.container,
			this.cameraContainer,
			this.enemuPlatforms,
			this.background,
			this.ground,
			this.player,
			this.playerPlatform,
		]);
	}
}
