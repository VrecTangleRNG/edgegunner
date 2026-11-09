import { Container } from "pixi.js";
import { State, StateMachine } from "../machine";

export class TransitionState implements State {
	name = "transition";
	container: Container;
	machine!: StateMachine;

	constructor() {
		this.container = new Container();
	}

	onEnter(stateMachine: StateMachine): void {
		this.machine = stateMachine;
	}
}
