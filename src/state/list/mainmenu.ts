import { Container, Sprite } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";
import { MainmenuUI } from "../../ui/mainmenu";
import { globalEvent } from "../../systems/utils";
import { TransitionState } from "./transition";
import { GameplayState } from "./gameplay";
import { MainmenuBuffer } from "../../transitions/types";

export class MainmenuState implements State {
	name = "mainmenu";
	container: Container;
	machine!: StateMachine;

	private cameraContainer: Container;
	private background: Sprite;
	private ground: Sprite;
	private player: Player;
	private ui: MainmenuUI;

	constructor() {

		// Game scene elements
		this.background = Sprite.from("background");
		this.ground = Sprite.from("ground");
		this.player = new Player();
		this.ui = new MainmenuUI();

		// Containers
		this.container = new Container();
		this.cameraContainer = new Container();

		this.cameraContainer.addChild(this.background, this.ground);
		this.player.addToContainer(this.cameraContainer);

		this.container.addChild(this.cameraContainer);
		this.ui.addToContainer(this.container);
	}

	onEnter(stateMachine: StateMachine): void {

		// Containers and machine
		const screen = stateMachine.app.screen;
		this.machine = stateMachine;
		this.cameraContainer.y = -screen.height / 4;

		// Game scene elements
		this.ui.init();
		this.background.position.set(0);
		this.background.zIndex = -2;
		this.ground.y = this.background.height;
		this.player.container.position.set(
			screen.width / 3 - this.player.sprite.width / 2,
			this.ground.y - this.player.container.height
		);

		// Signal receivers
		globalEvent.on("pressedplay", () => {
			const buffer: MainmenuBuffer = {
				cameraContainer: this.cameraContainer,
				player: this.player,
				background: this.background,
				ground: this.ground,
				ui: this.ui,
			};
			this.machine.addBuffer(buffer);
			this.machine.pop();
		});
	}

	onExit(): void {
		globalEvent.off("pressedplay");
		this.machine.push(new TransitionState(new GameplayState(), this.name));
	}
}
