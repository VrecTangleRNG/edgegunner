import { Container, Rectangle, Sprite } from "pixi.js";

export class Platform {
	public ground: Rectangle;
	public sprite: Sprite;

	constructor() {
		this.sprite = Sprite.from("platform");
		this.ground = new Rectangle(0, this.sprite.height - 11, this.sprite.width, 11);
	}

	public addToContainer(container: Container): void {
		container.addChild(this.sprite);
		return;
	}

	public setPosition(x: number, y?: number): void {
		this.sprite.position.set(x, y);
		this.ground.x = x;
		this.ground.y = this.sprite.y + this.sprite.height - this.ground.height;
		return;
	}
}
