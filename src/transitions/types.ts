import { Container, Sprite } from "pixi.js"
import { Player } from "../entities/player";
import { MainmenuUI } from "../ui/mainmenu";

export interface Transition {
	init?(): void;
	update(): void;
}

export type MainmenuBuffer = {
	cameraContainer: Container,
	platform: Sprite,
	player: Player,
	background: Sprite,
	ground: Sprite,
	ui: MainmenuUI,
}
