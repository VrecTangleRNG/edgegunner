import { Container } from "pixi.js";
import { State, StateMachine } from "../machine";

export class GameplayState implements State {
	name = "gameplay";
	container: Container;
	machine!: StateMachine;

	constructor() {
		this.container = new Container();
	}
}
