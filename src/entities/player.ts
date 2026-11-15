import { Sprite, Container, Ticker } from "pixi.js";
import { Gun } from "./gun";
import { startTweens, updateTweens } from "../systems/tweens";

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

	public addToContainer(container: Container): void {
		container.addChild(this.container);
		return;
	}
	
	public start(): void {
		this.gun.aiming.start();
	}

	update(ticker: Ticker): void {
		this.gun.update(ticker);
	}
}
