import { Tween } from "@tweenjs/tween.js";
import { StateMachine } from "../state/machine";
import * as Types from "./types";
import { toPoint } from "../systems/tweens";

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
		const cameraContainer = this.mainmenuBuffer.cameraContainer;
		this.machine.container.addChild(cameraContainer);
		this.mainmenuBuffer.ui.addToContainer(this.machine.container);

		this.animations.push(toPoint(cameraContainer, { x: 0, y: 0 }, 1000));
		this.animations[0].start();
	}
	
	update(): void {
		this.mainmenuBuffer.ui.animate();
		this.animations[0].update();
	}
}

export class NullLink implements Types.Transition {
	constructor() { console.log("This transition links to nothing"); }
	update(): void { return; }
}
