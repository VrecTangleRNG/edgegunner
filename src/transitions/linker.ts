import { StateMachine } from "../state/machine";
import * as Types from "./types";

export class MainmenuGameplay implements Types.Transition {
	private buffer: any | any[];

	constructor(machine: StateMachine) {
		this.buffer = machine.getBuffer();
	}
	
	update(): void {
	}
}

export class NullLink implements Types.Transition {
	constructor() { console.log("This transition links to nothing"); }
	update(): void { return; }
}
