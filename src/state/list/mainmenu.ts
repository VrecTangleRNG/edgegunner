import { Container, Sprite, Ticker } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";
import { Platform } from "../../entities/platform";
import { MainmenuUI } from "../../ui/mainmenu";
import { globalEvent } from "../../systems/utils";

export class MainmenuState implements State {
	name = "mainmenu";
	container: Container;
	machine!: StateMachine;

	private cameraContainer: Container;
	private background: Sprite;
	private ground: Sprite;
	private player: Player;
	private platform: Platform;
	private ui: MainmenuUI;

	constructor() {

		// Game scene elements
		this.background = Sprite.from("background");
		this.ground = Sprite.from("ground");
		this.player = new Player();
		this.platform = new Platform();
		this.ui = new MainmenuUI();

		// Containers
		this.container = new Container();
		this.cameraContainer = new Container();

		this.cameraContainer.addChild(this.background, this.ground);
		this.player.addToContainer(this.cameraContainer);
		this.platform.addToContainer(this.cameraContainer);

		this.container.addChild(this.cameraContainer);
		this.ui.addToContainer(this.container);
	}

	onEnter(stateMachine: StateMachine): void {

		// Containers and machine
		const screen = stateMachine.app.screen;
		this.machine = stateMachine;
		this.cameraContainer.y = -screen.height / 4;

		// Game scene elements
		const playerSprite = this.player.sprite;
		const platformSprite = this.platform.sprite;
		const platformGround = this.platform.ground;
		this.ui.init();
		this.background.position.set(0);
		this.background.zIndex = -2;
		this.ground.y = this.background.height;
		this.platform.setPosition(
			-platformSprite.width * 8.5/10,
			this.ground.y - platformSprite.height - 10
		);
		this.platform.sprite.zIndex = -1;
		this.player.setPosition(
			32,
			platformGround.y - playerSprite.height
		);

		// Signal receivers
		globalEvent.on("pressedplay", () => {
		});
	}

	update(ticker: Ticker): void {
		this.ui.animate();
	}
}
