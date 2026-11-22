import { Sprite, ColorMatrixFilter, Container } from "pixi.js";
import { Easing, Tween } from "@tweenjs/tween.js";
import { Coordinate, yoyo } from "./utils";
import { Enemy, Player } from "../entities/character";

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

export function toPoint(
	object: Sprite | Container,
	to: Coordinate,
	duration: number,
	delay?: number
): Tween {
	const from: Coordinate = {x: object.x, y: object.y };
	return new Tween(from)
		.to(to, duration)
		.delay(delay)
		.easing(Easing.Quadratic.InOut)
		.onUpdate( () => {
			object.x = from.x;
			object.y = from.y;
		});
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

export function aim(sprite: Sprite, aimSpeed: number = 2000): Tween {
	const angle = { deg: sprite.angle };
	return new Tween(angle)
		.to({ deg: -65}, aimSpeed)
		.easing(yoyo(Easing.Linear.InOut))
		.onUpdate( () => {
			sprite.angle = angle.deg;
		})
		.repeat(Infinity);
}

export function readyPlayer(player: Player, duration: number): Tween {
	const position = { x: player.binder.x };
	return new Tween(position)
		.to({ x: 32}, duration)
		.easing(Easing.Linear.InOut)
		.onUpdate( () => {
			player.binder.x = position.x;
		})
		.onStart(() => {
			player.binder.scale.x = -1;
		})
		.onComplete(() => {
			player.binder.scale.x = 1;
		});
}

export function moveEnemy(enemy: Enemy, x: number, duration: number): Tween {
	const position = { x: enemy.binder.x };
	return new Tween(position)
		.to({ x: x }, duration)
		.easing(Easing.Linear.InOut)
		.onUpdate(() => {
			enemy.binder.x = position.x;
		});
}
