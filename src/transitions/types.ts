import { Container, Sprite } from "pixi.js"
import { Platform } from "../entities/platform";
import { Player } from "../entities/player";
import { MainmenuUI } from "../ui/mainmenu";

export interface Transition {
	init?(): void;
	update(): void;
}

export type MainmenuBuffer = {
	cameraContainer: Container,
	platform: Platform,
	player: Player,
	background: Sprite,
	ground: Sprite,
	ui: MainmenuUI,
}
