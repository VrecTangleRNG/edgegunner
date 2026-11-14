import { Container, Sprite, Ticker } from "pixi.js"
import { Player } from "../entities/player";
import { MainmenuUI } from "../ui/mainmenu";

export interface Transition {
	init?(container: Container): void;
	update(ticker: Ticker): boolean;
}

export type MainmenuBuffer = {
	cameraContainer: Container,
	platform: Sprite,
	player: Player,
	background: Sprite,
	ground: Sprite,
	ui: MainmenuUI,
}
