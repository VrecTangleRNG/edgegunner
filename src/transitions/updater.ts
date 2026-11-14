import { Tween } from "@tweenjs/tween.js";
import { StateMachine } from "../state/machine";
import * as Types from "./types";
import { startTweens, toPoint, updateTweens } from "../systems/tweens";
import { Container, Sprite } from "pixi.js";
import { GameplayUi } from "../ui/gameplay";

export class MainmenuGameplay implements Types.Transition {
	private machine: StateMachine;
	private buffer: any | any[];
	private mainmenuBuffer: Types.MainmenuBuffer;
	private gameplayUi: GameplayUi;
	private enemyPlatforms: Sprite[];
	private animations: Tween[];
	private isRunning: boolean;

	constructor(machine: StateMachine) {
		this.machine = machine;
		this.buffer = machine.getBuffer();
		this.mainmenuBuffer = this.buffer[0];
		this.gameplayUi = new GameplayUi();
		this.enemyPlatforms = [];
		this.animations = [];
		this.isRunning = true;
	}

	init(container: Container): void {

		// Variables and constants
		const background = this.mainmenuBuffer.background;
		const cameraContainer = this.mainmenuBuffer.cameraContainer;
		const player = this.mainmenuBuffer.player;
		const platform = this.mainmenuBuffer.platform;
		const targetPlayerY = background.height / 2 - player.container.height / 2;

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
					y: (background.height - this.enemyPlatforms[0].height * 3) / 3 *
						(i + 1),
				}, 1000, 1500 - 250 * i),
			);
		}

		// Animations
		this.animations.push(
			toPoint(cameraContainer, { x: 0, y: 0 }, 1000),
			toPoint(player.container, {
				x: player.container.x,
				y: targetPlayerY
			}, 1500, 500),
			toPoint(platform, {
				x: platform.x,
				y: targetPlayerY + player.sprite.height - platform.height + 11
			}, 1500, 500),
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
