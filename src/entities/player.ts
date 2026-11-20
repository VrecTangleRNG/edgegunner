import { Sprite, Container, Ticker } from "pixi.js";
import { Gun } from "./gun";
import { StateMachine } from "../state/machine";
import { BulletContainer } from "./bulletContainer";

export class Player {
	container: Container;
	sprite: Sprite;
	private gun: Gun;

	constructor() {
		this.container = new Container();
		this.sprite = Sprite.from("player");
		this.gun = new Gun("glock");
		this.gun.init();
		this.container.addChild(this.sprite);
		this.gun.addToContainer(this.container);
	}

	addToContainer(container: Container): void {
		container.addChild(this.container);
		return;
	}

	start(machine: StateMachine, bulletContainer: BulletContainer): void {
		this.gun.aiming.start();
		machine.app.stage.on("pointerdown", () => this.gun.shoot(bulletContainer));
	}

	update(ticker: Ticker): void {
		this.gun.update(ticker);
	}
}
