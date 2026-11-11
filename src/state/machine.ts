import { Application, Container, Ticker } from 'pixi.js';

export interface State {
	name: string;
	container: Container;
	machine: StateMachine;

	update?(ticker: Ticker): void;
	onEnter?(stateMachine: StateMachine): void;
	onExit?(): void;
	onPause?(): void;
	onResume?(): void;
}

export class StateMachine {
	public app: Application;
	private buffer: any[];
	public container: Container;
	private states: State[];

	constructor(app: Application) {
		this.app = app;
		this.buffer = [];
		this.container = app.stage;
		this.states = [];
	}

	public getBuffer(index?: number): any[] | any {
		if (index && index >= 0) return this.buffer[index];
		return this.buffer;
	}

	public getTopmostState(): State | null {
		const currentState = this.states[this.states.length - 1];
		return currentState ? currentState : null;
	}

	public addBuffer(buffer: any): void {
		this.buffer.push(buffer);
		return;
	}

	public cleanBuffer(index?: number): void {
		if (index && index >= 0) {
			this.buffer.splice(index, 1);
			return;
		}
		else if (!index) this.buffer = [];
	}

	public push(newState: State): void {
		const currentState = this.getTopmostState();
		if (currentState && currentState.onPause) currentState.onPause();

		if (newState.onEnter) newState.onEnter(this);
		this.states.push(newState);
		this.container.addChild(newState.container);
	}

	public pop(): State | null {
		const currentState = this.states.pop();
		if (currentState) {
			if (currentState.onExit) currentState.onExit();
			this.container.removeChild(currentState.container);
			currentState.container.destroy();
		}

		const previousState = this.getTopmostState();
		if (previousState && previousState.onResume) previousState.onResume();

		return currentState ? currentState : null;
	}
	
	public popUntil(name: string): void {
		while (this.states.length > 0) {
			const poppedState = this.pop();
			if (poppedState && poppedState.name === name) break;
		}
	}

	public replace(newState: State): void {
		this.pop();
		this.push(newState);
		return;
	}

	public update(ticker: Ticker): void {
		this.states.forEach( (state) => {
			if (state.update) state.update(ticker);
		});
	}
}
