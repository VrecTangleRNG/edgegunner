import { Tween } from "@tweenjs/tween.js";
import { StateMachine } from "../state/machine";
import * as Types from "./types";
import { startTweens, toPoint, updateTweens } from "../systems/tweens";

export class MainmenuGameplay implements Types.Transition {
	private buffer: any | any[];
	private machine: StateMachine;
	private mainmenuBuffer: Types.MainmenuBuffer;
	private animations: Tween[];

	constructor(machine: StateMachine) {
		this.buffer = machine.getBuffer();
		this.mainmenuBuffer = this.buffer[0];
		this.machine = machine;
		this.animations = [];
	}

	init(): void {
		const background = this.mainmenuBuffer.background;
		const cameraContainer = this.mainmenuBuffer.cameraContainer;
		const player = this.mainmenuBuffer.player;
		const platform = this.mainmenuBuffer.platform;
		const targetPlayerY = background.height / 2 - player.container.height / 2;

		this.machine.container.addChild(cameraContainer);
		this.mainmenuBuffer.ui.addToContainer(this.machine.container);
		this.animations.push(
			toPoint(cameraContainer, { x: 0, y: 0 }, 1000),
			toPoint(player.container, {
				x: player.container.x,
				y: targetPlayerY
			}, 1500, 250),
			toPoint(platform, {
				x: platform.x,
				y: targetPlayerY + player.sprite.height - platform.height + 11
			}, 1500, 250),
		);
		startTweens(this.animations);
	}
	
	update(): void {
		this.mainmenuBuffer.ui.animate();
		updateTweens(this.animations);
	}
}

export class NullLink implements Types.Transition {
	constructor() { console.log("This transition links to nothing, check updater.ts"); }
	update(): void { return; }
}
