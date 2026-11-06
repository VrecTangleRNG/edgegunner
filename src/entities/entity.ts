import { Container, Sprite } from "pixi.js";

export class Entity {
	protected sprite: Sprite;

	constructor(name: string) {
		this.sprite = Sprite.from(name);
	}

	public getSprite(): Sprite {
		return this.sprite;
	}

	public addToContainer(container: Container): void {
		container.addChild(this.sprite);
		return;
	}

	public setPosition(x: number, y?: number): void {
		this.sprite.position.set(x, y);
		return;
	}

	public setZIndex(zIndex: number): void {
		this.sprite.zIndex = zIndex;
		return;
	}
}
