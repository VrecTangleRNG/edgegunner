import { Container, Sprite, Ticker } from "pixi.js";
import { Gun } from "./gun";
import { StateMachine } from "../state/machine";
import { BulletContainer } from "./bulletContainer";

export class Character {
	binder: Container = new Container();
	sprite: Sprite = Sprite.from("player");
	gun: Gun = new Gun("glock");

	constructor() {
		this.binder.addChild(this.sprite);
		this.gun.addToContainer(this.binder);
		this.gun.init();
	}

	addToContainer(container: Container): void {
		container.addChild(this.binder);
		return;
	}

	reverseX(): void {
		this.gun.sprite.scale.x *= -1;
		this.gun.sprite.x += (this.gun.sprite.scale.x < 0) ? -28 : 28;
	}
}

export class Player extends Character {

	start(machine: StateMachine, bulletContainer: BulletContainer): void {
		this.gun.aiming.start();
		machine.app.stage.on("pointerdown", () => this.gun.shoot(bulletContainer));
	}

	update(ticker: Ticker): void {
		this.gun.update(ticker);
	}
}

export class Enemy extends Character {

	update(ticker: Ticker): void {
		this.binder.x -= 120 * ticker.deltaMS/1000;
	}
}
