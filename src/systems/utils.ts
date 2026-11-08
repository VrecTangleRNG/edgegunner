import { EventEmitter, Sprite } from "pixi.js";

export function yoyo(f: any) {
	return (t : any) => {
		if (t < 0.5) {
			return f(2 * t);
		}
		else {
			return 1 - f(2 * (t - 0.5));
		}
	}
}

export function setBtn(sprite: Sprite): void {
	sprite.eventMode = "static";
	sprite.cursor = "pointer";
}

export const globalEvent: EventEmitter = new EventEmitter;
