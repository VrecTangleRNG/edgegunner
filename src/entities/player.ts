import { Sprite, Container } from "pixi.js";
import { Gun } from "./gun";

export class Player {
	public sprite: Sprite;
	private gun: Gun;

	constructor() {
		this.sprite = Sprite.from("player");
		this.gun = new Gun("glock");
		this.gun.init();
	}

	public addToContainer(container: Container): void {
		container.addChild(this.sprite);
		this.gun.addToContainer(container);
		return;
	}

	public setPosition(x: number, y?: number): void {
		this.sprite.position.set(x, y);
		this.gun.setPosition(
			this.sprite.x + this.sprite.width,
			this.sprite.y + this.sprite.height / 2
		);
		return;
	}
}
