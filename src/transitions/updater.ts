import { Tween } from "@tweenjs/tween.js";
import { StateMachine } from "../state/machine";
import * as Types from "./types";
import { readyPlayer, startTweens, toPoint, updateTweens } from "../systems/tweens";
import { Container, Sprite } from "pixi.js";
import { GameplayUi } from "../ui/gameplay";
import { EnemySpawner } from "../entities/enemySpawner";

export class MainmenuGameplay implements Types.Transition {
	private animations: Tween[];
	private buffer: any | any[];
	private enemyPlatforms: Sprite[];
	private gameplayUi: GameplayUi;
	private machine: StateMachine;
	private mainmenuBuffer: Types.MainmenuBuffer;
	private spawner: EnemySpawner = new EnemySpawner();

	constructor(machine: StateMachine) {
		this.machine = machine;
		this.buffer = machine.getBuffer();
		this.mainmenuBuffer = this.buffer[0];
		this.gameplayUi = new GameplayUi();
		this.enemyPlatforms = [];
		this.animations = [];
	}

	init(container: Container): void {

		// Variables and constants
		const background = this.mainmenuBuffer.background;
		const cameraContainer = this.mainmenuBuffer.cameraContainer;
		const player = this.mainmenuBuffer.player;

		// Container additions
		container.addChild(cameraContainer);
		this.mainmenuBuffer.ui.addToContainer(container);
		this.gameplayUi.addToContainer(container);
		this.gameplayUi.init();

		// Enemy platforms creation and initializations
		for (let i = 0; i < 3; i++) {
			this.enemyPlatforms.push(Sprite.from("platform"));
			container.addChild(this.enemyPlatforms[i]);
			this.enemyPlatforms[i].x = background.width - this.enemyPlatforms[i].width;
			this.enemyPlatforms[i].y = -this.enemyPlatforms[i].height - 8;
			this.animations.push(
				toPoint(this.enemyPlatforms[i], {
					x: this.enemyPlatforms[i].x,
					y: this.spawner.spawnPoints[i].y - this.enemyPlatforms[0].height + 11,
				}, 1000, 1500 - 250 * i),
			);
		}

		// Animations
		this.animations.push(
			toPoint(cameraContainer, { x: 0, y: 0 }, 1000),
			readyPlayer(player, 1000)
		);
		startTweens(this.animations);
	}

	update(): boolean {
		this.mainmenuBuffer.ui.animate();
		this.gameplayUi.animate();
		updateTweens(this.animations);
		if (!this.gameplayUi.isAnimationFinished) return true;
		else {
			const gameplayBuffer: Types.GameplayBuffer = {
				platforms: this.enemyPlatforms,
				ui: this.gameplayUi,
				enemySpawner: this.spawner,
			}
			this.machine.addBuffer(gameplayBuffer);
			return false;
		}
	}
}

export class NullLink implements Types.Transition {
	constructor() { console.log("This transition links to nothing, check updater.ts"); }
	update(): boolean { return true; }
}
