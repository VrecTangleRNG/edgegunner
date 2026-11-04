import { Application, Container, Ticker } from 'pixi.js';

export interface State {
	name: string;
	container: Container;
	machine: StateMachine;

	init(stateMachine: StateMachine): void;
	update(ticker: Ticker): boolean;

	onEnter(): void;
	onExit(): void;
	onPause(): void;
	onResume(): void;
}

export class StateMachine {
	private states: State[];
	private container: Container;

	constructor(appContainer: Container) {
		this.states = [];
		this.container = appContainer;
	}

	public getTopmostState(): State | null {
		const currentState = this.states[this.states.length - 1];
		return currentState ? currentState : null;
	}

	public getContainer(): Container {
		return this.container;
	}

	public push(newState: State): void {
		const currentState = this.getTopmostState();
		if (currentState) currentState.onPause();

		newState.init(this);
		this.states.push(newState);
		this.container.addChild(newState.container);
		newState.onEnter();
	}

	public pop(): State | null {
		const currentState = this.states.pop();
		if (currentState) {
			currentState.onExit();
			this.container.removeChild(currentState.container);
			currentState.container.destroy({ children: true });
		}

		const previousState = this.getTopmostState();
		if (previousState) previousState.onResume();

		return currentState ? currentState : null;
	}
	
	public popUntil(name: string): void {
		while (this.states.length > 0) {
			const poppedState = this.pop();
			if (poppedState && poppedState.name === name) break;
		}
	}

	public update(ticker: Ticker): void {
		this.states.forEach( (state) => {
			state.update(ticker);
		});
	}
}
