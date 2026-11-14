import { Sprite, Container } from "pixi.js";
import { Gun } from "./gun";

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
		console.log(this.container.height);
		console.log(this.container.y);
	}

	public addToContainer(container: Container): void {
		container.addChild(this.container);
		return;
	}
}
