import { Container, Ticker } from "pixi.js";
import { Coordinate } from "./../systems/utils";
import { Enemy } from "./enemy";

export class EnemySpawner {
	container: Container = new Container;
	spawnPoints: Coordinate[] = [];
	private enemies: Enemy[] = [];
	private currentTime: number = 0;
	private spawnInterval: number = 1000;

	constructor() {
		const spawnSegment = 514 / 4;
		for (let i = 0; i < 4; i++) {
			this.spawnPoints.push({ x: 960, y: spawnSegment * (i + 1) });
		}
	}

	update(ticker: Ticker): void {
		this.enemies.forEach((enemy) => enemy.update(ticker));
		this.currentTime += ticker.deltaMS;
		if (this.currentTime >= this.spawnInterval) {
			this.spawn();
			this.currentTime = 0;
		}
	}

	addToContainer(container: Container): void {
		container.addChild(this.container);
		return;
	}

	private spawn(): void {
		const enemy = new Enemy();
		const randomPicker = Math.floor(Math.random() * 4);
		enemy.container.x = this.spawnPoints[randomPicker].x;
		enemy.container.y = this.spawnPoints[randomPicker].y - enemy.container.height;
		enemy.addToContainer(this.container);
		this.enemies.push(enemy);
	}
}
