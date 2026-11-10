import { Container } from "pixi.js";
import { State, StateMachine } from "../machine";
import * as Transitions from "../../systems/transitions";

export class TransitionState implements State {
	name = "transition";
	container: Container;
	machine!: StateMachine;

	private runner: () => void;
	private spawner: string;
	private toState: State;

	constructor(toState: State, spawner: string) {
		this.container = new Container();
		this.runner = this.checkLink();
		this.spawner = spawner;
		this.toState = toState;
	}

	onEnter(stateMachine: StateMachine): void {

		// Container and machine
		this.machine = stateMachine;
		stateMachine.push(this.toState);
	}

	update(): void {
		this.runner();
	}

	private checkLink(): () => void {
		if (this.spawner === "mainmenu" && this.toState.name === "gameplay") {
			return Transitions.mainmenuLinkGameplay;
		}
		return Transitions.nullLink;
	}
}
