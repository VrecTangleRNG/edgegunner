import { Rectangle } from "pixi.js";
import { Entity } from "./entity";

export class Platform extends Entity {
	private platformGround: Rectangle;

	constructor() {
		super("platform");
		this.platformGround = new Rectangle(0, this.sprite.height - 11, this.sprite.width, 11);
	}

	setPosition(x: number, y?: number): void {
		super.setPosition(x, y);
		this.platformGround.x = x;
		this.platformGround.y = this.sprite.y + this.sprite.height - this.platformGround.height;
	}

	getPlatformGround(): Rectangle {
		return this.platformGround;
	}
}
