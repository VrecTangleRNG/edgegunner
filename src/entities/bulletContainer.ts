import { Container, Ticker } from "pixi.js";
import { Bullet } from "./bullet";

export class BulletContainer {
	bulletContainer: Bullet[];
	spriteContainer: Container;

	constructor() {
		this.bulletContainer = [];
		this.spriteContainer = new Container();
		this.spriteContainer.zIndex = 0;
	}

	addToContainer(container: Container): void {
		container.addChild(this.spriteContainer);
		return;
	}

	addToList(bullet: Bullet): void {
		this.bulletContainer.push(bullet);
		this.spriteContainer.addChild(bullet.sprite);
	}

	removeFromList(index: number): void {
		if (index >= 0) {
			const bullet = this.bulletContainer.splice(index, 1);
			this.spriteContainer.removeChild(bullet[0].sprite);
		}
	}

	update(ticker: Ticker): void {
		this.bulletContainer.forEach((b) => b.update(ticker));
	}
}
