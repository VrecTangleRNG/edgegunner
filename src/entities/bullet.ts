import { Sprite, Ticker } from "pixi.js";
import { Coordinate } from "../systems/utils";
import { BulletContainer } from "./bulletContainer";

export class Bullet {
	sprite: Sprite;
	private initPos: Coordinate;
	private velocity: Coordinate;

	constructor(bc: BulletContainer, pos: Coordinate, angle: number, speed: number) {
		const rad = Math.PI/180;
		this.initPos = pos;
		this.sprite = Sprite.from("particle");
		this.velocity = {
			x: Math.cos(angle * rad) * speed,
			y: Math.sin(angle * rad) * speed
		};

		bc.addToList(this);
		this.init();
	}

	update(ticker: Ticker): void {
		this.sprite.x += this.velocity.x * ticker.deltaMS/1000;
		this.sprite.y += this.velocity.y * ticker.deltaMS/1000;
	}

	private init(): void {
		this.sprite.x = this.initPos.x;
		this.sprite.y = this.initPos.y;
	}
}
