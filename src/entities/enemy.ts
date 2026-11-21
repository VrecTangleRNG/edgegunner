import { Ticker } from "pixi.js";
import { Player } from "./player";

export class Enemy extends Player {

	constructor() {
		super();
	}

	override update(ticker: Ticker): void {
		this.container.x -= 120 * ticker.deltaMS/1000;
	}
}
