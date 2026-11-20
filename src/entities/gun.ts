import { Tween } from "@tweenjs/tween.js";
import { Container, Graphics, GraphicsContext, Sprite, Ticker } from "pixi.js";
import { aim } from "../systems/tweens";
import { Bullet } from "./bullet";
import { BulletContainer } from "./bulletContainer";

export class Gun {
	sprite: Sprite;
	aiming: Tween;
	private pointerContext: GraphicsContext;
	private pointer: Graphics;
	private markerContext: GraphicsContext;
	private marker: Graphics;
	private recoilTime: number;
	private timeRemaining: number;

	constructor(name: string) {
		this.sprite = Sprite.from(name);
		this.aiming = aim(this.sprite);
		this.pointerContext = new GraphicsContext();
		this.pointer = new Graphics();
		this.markerContext = new GraphicsContext();
		this.marker = new Graphics();
		this.recoilTime = 400;
		this.timeRemaining = 0;
	}

	init(): void {
		this.sprite.anchor.set(0.2);
		this.sprite.x = 28;
		this.sprite.y = 32;
		this.pointer.context = this.pointerContext;
		this.marker.context = this.markerContext;
	}

	addToContainer(container: Container): void {
		container.addChild(this.marker, this.pointer, this.sprite);
		return;
	}

	shoot(bc: BulletContainer): void {
		const pos = { x: this.sprite.x, y: this.sprite.y };
		const speed = 100;
		new Bullet(bc, pos, this.sprite.angle, speed);
		this.aiming.pause();
		this.timeRemaining = 0;
		this.pointer.alpha = 0;
		this.marker.alpha = 0;
	}

	update(ticker: Ticker): void {
		if (this.aiming.isPaused()) {
			this.timeRemaining += ticker.deltaMS;
			this.marker.alpha = this.timeRemaining / this.recoilTime;
			if (this.timeRemaining >= this.recoilTime) {
				this.aiming.resume();
				this.pointer.alpha = 1;
				this.marker.alpha = 1;
			}
			return;
		}
		this.aiming.update();
		this.drawMarkers();
	}

	private drawMarkers(): void {
		const lineLength = 300;
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
			.stroke({ width: 2, color: 0xFFFFFF });
	}
}
