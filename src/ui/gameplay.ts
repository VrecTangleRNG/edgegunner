import { Container, Sprite } from "pixi.js";
import { globalEvent, setBtn } from "../systems/utils";
import { Tween } from "@tweenjs/tween.js";
import { blink, toBottom, toRight, updateTweens } from "../systems/tweens";

export class MainmenuUI {
	private uiContainer: Container;
	private healthBar: Sprite;
	private pauseBtn: Sprite;
	private continueBtn: Sprite;
	private crossBtn: Sprite;
	private bossIcon: Sprite;	// TODO: Include bossIco into the spritesheet
	private coinIco: Sprite;

	constructor() {
		this.uiContainer = new Container();
		this.healthBar = Sprite.from("healthBar");
		this.pauseBtn = Sprite.from("pauseBtn");
		this.continueBtn = Sprite.from("continueBtn");
		this.crossBtn = Sprite.from("crossBtn");
		this.bossIcon = Sprite.from("bossIco");
		this.coinIco = Sprite.from("coinIco");
	}

	public addToContainer(container: Container): void {
		this.uiContainer.addChild(
			// TODO
		);
		container.addChild(this.uiContainer);
		return;
	}

	public init(): void {
		const screen = {
			width: 960,
			height: 540
		}
		return;
	}

	public animate(): void {
	}

	public erase(): void {
	}
}
