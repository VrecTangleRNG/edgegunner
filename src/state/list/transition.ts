import { Container } from "pixi.js";
import { State, StateMachine } from "../machine";
import * as T from "../../transitions/updater";
import * as TTypes from "../../transitions/types";

export class TransitionState implements State {
	name = "transition";
	container: Container;
	machine!: StateMachine;

	private linker!: TTypes.Transition;
	private spawner: string;
	private toState: State;

	constructor(toState: State, spawner: string) {
		this.container = new Container();
		this.spawner = spawner;
		this.toState = toState;
	}

	onEnter(stateMachine: StateMachine): void {

		// Container and machine
		this.machine = stateMachine;
		this.linker = this.checkLink();
		if (this.linker.init) this.linker.init();
	}

	update(): void {
		this.linker.update();
	}

	private checkLink(): TTypes.Transition {
		if (this.spawner === "mainmenu" && this.toState.name === "gameplay") {
			return new T.MainmenuGameplay(this.machine);
		}
		return new T.NullLink();
	}
}
