import { Container, Sprite, Ticker } from "pixi.js";
import { State, StateMachine } from "../machine";

export class MainmenuState implements State {
	name = "mainmenu";
	container: Container;
	machine!: StateMachine;

	private background: Sprite;
	private ground: Sprite;

	constructor() {
		this.container = new Container();

		this.background = Sprite.from("background");
		this.ground = Sprite.from("ground");
		this.container.addChild(
			this.background,
			this.ground,
		);
	}

	update(ticker: Ticker) {
	}

	onEnter(stateMachine: StateMachine): void {
		this.machine = stateMachine;

		this.ground.y = this.background.height;
	}

	onExit(): void {
	}
	
	onPause(): void {
	}

	onResume(): void {
	}
}
