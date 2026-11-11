import { Container, Sprite } from "pixi.js";

export class Gun {
	public sprite: Sprite;

	constructor(name: string) {
		this.sprite = Sprite.from(name);
	}

	public init(): void {
		this.sprite.anchor.set(0.2, 0.5);
		this.sprite.x = 28;
		this.sprite.y = 32;
	}

	public addToContainer(container: Container): void {
		container.addChild(this.sprite);
		return;
	}

	public setPosition(x: number, y?: number): void {
		this.sprite.position.set(x, y);
		return;
	}
}
