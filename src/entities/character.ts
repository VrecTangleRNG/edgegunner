import { Container, Sprite, Ticker } from "pixi.js";
import { Gun } from "./gun";
import { StateMachine } from "../state/machine";
import { BulletContainer } from "./bulletContainer";
import { Tween } from "@tweenjs/tween.js";
import { moveEnemy } from "../systems/tweens";
import { CollisionManager } from "./collisionManager";
import { Body, Box } from "check2d";

export class Character {
	binder: Container = new Container();
	sprite: Sprite = Sprite.from("player");
	gun: Gun = new Gun("glock");
	body!: Body;

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

	protected makeBody(collisionManager: CollisionManager): void {
		this.body = collisionManager.createBox(
			this.sprite.x,
			this.sprite.y,
			28, 64
		);
	}

	set x(newX: number) {
		this.binder.x = newX;
		this.body.x = this.sprite.x;
	}

	set y(newY: number) {
		this.binder.y = newY;
		this.body.y = this.sprite.y;
	}
}

export class Player extends Character {
	start(
		machine: StateMachine,
		collisionManager: CollisionManager,
		bulletContainer: BulletContainer
	): void {
		this.gun.aiming.start();
		this.makeBody(collisionManager);
		machine.app.stage.on("pointerdown", () => this.gun.shoot(bulletContainer));
	}

	update(ticker: Ticker): void {
		this.gun.update(ticker);
	}
}

export class Enemy extends Character {
	private movement: Tween;

	constructor(targetX: number) {
		super();
		this.binder.x = targetX;
		this.movement = moveEnemy(this, 300, 1000);
	}

	start(collisionManager: CollisionManager): void {
		this.makeBody(collisionManager);
		this.movement.start();
	}

	update(ticker: Ticker): void {
		this.movement.update();
		this.x = this.binder.x;
		this.y = this.binder.y;
	}
}
