import { Tween } from "@tweenjs/tween.js";
import { Container, Graphics, GraphicsContext, Sprite, Ticker } from "pixi.js";
import { aim } from "../systems/tweens";

export class Gun {
	sprite: Sprite;
	aiming: Tween;
	private pointerContext: GraphicsContext;
	private pointer: Graphics;
	private markerContext: GraphicsContext;
	private marker: Graphics;

	constructor(name: string) {
		this.sprite = Sprite.from(name);
		this.aiming = aim(this.sprite);
		this.pointerContext = new GraphicsContext();
		this.pointer = new Graphics();
		this.markerContext = new GraphicsContext();
		this.marker = new Graphics();
	}

	public init(): void {
		this.sprite.anchor.set(0.2);
		this.sprite.x = 28;
		this.sprite.y = 32;
		this.pointer.context = this.pointerContext;
		this.marker.context = this.markerContext;
	}

	public addToContainer(container: Container): void {
		container.addChild(this.marker, this.pointer, this.sprite);
		return;
	}

	public update(ticker: Ticker): void {
		this.aiming.update();

		const lineLength = 200;
		const radians = this.sprite.angle * Math.PI/180;
		this.markerContext.clear()
			.moveTo(this.sprite.x, this.sprite.y)
			.arc(
				this.sprite.x, this.sprite.y,
				lineLength, 0,
				radians, true
			)
			.fill({ color: 0xFFFFFF, alpha: 0.2});
		this.pointerContext.clear()
			.moveTo(this.sprite.x, this.sprite.y)
			.lineTo(
				this.sprite.x + lineLength * Math.cos(radians),
				this.sprite.y + lineLength * Math.sin(radians)
			)
			.stroke({ width: 1, color: 0xFFFFFF });
	}
}
