import { Sprite, ColorMatrixFilter } from "pixi.js";
import { Easing, Tween } from "@tweenjs/tween.js";
import { yoyo } from "./utils";

export function startTweens(tweens: Tween[]): void {
	tweens.forEach((tween) => tween.start());
}

export function updateTweens(tweens: Tween[]): void {
	tweens.forEach((tween) => tween.update());
}

export function toRight(sprite: Sprite, duration: number, delay: number): Tween {
	const object = { x: sprite.x };
	const result = new Tween(object)
		.to({ x: 965 }, duration)
		.easing(Easing.Quadratic.In)
		.delay(delay)
		.onUpdate( () => {
			sprite.x = object.x;
		})
	return result;
}

export function toBottom(sprite: Sprite, duration: number, delay: number): Tween {
	const object = { y: sprite.y };
	return new Tween(object)
		.to({ y: 545 }, duration)
		.easing(Easing.Quadratic.In)
		.delay(delay)
		.onUpdate( () => {
			sprite.y = object.y;
		})
}

export function blink(sprite: Sprite, duration: number, delay: number): Tween {
	const filter = new ColorMatrixFilter();
	const object = { brightness: 1 };
	sprite.filters = [filter];
	return new Tween(object)
		.to({ brightness: 1.5 }, duration)
		.easing(yoyo(Easing.Quadratic.Out))
		.delay(delay)
		.onUpdate( () => {
			filter.brightness(object.brightness, false);
		})
		.repeat(4);
}
