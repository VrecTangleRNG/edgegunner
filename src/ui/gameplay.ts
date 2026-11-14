import { Container, Graphics, Sprite } from "pixi.js";
import { globalEvent, setBtn } from "../systems/utils";
import { Tween } from "@tweenjs/tween.js";
import { blink, startTweens, toBottom, toPoint, toRight, updateTweens } from "../systems/tweens";

export class GameplayUi {
	private uiContainer: Container;
	private enterAnimations: Tween[];
	private healthBar: Sprite;
	private pauseBtn: Sprite;
	private continueBtn: Sprite;
	private crossBtn: Sprite;
	private progressBar: Graphics;
	// private bossIcon: Sprite;	// TODO: Include bossIco into the spritesheet
	// private coinIco: Sprite;		// TODO: Include coinIco into the spritesheet

	constructor() {
		this.uiContainer = new Container();
		this.enterAnimations = [];
		this.healthBar = Sprite.from("healthBar");
		this.pauseBtn = Sprite.from("pauseBtn");
		this.continueBtn = Sprite.from("continueBtn");
		this.crossBtn = Sprite.from("crossBtn");
		this.progressBar = new Graphics();
	}

	public addToContainer(container: Container): void {
		this.uiContainer.addChild(
			this.healthBar,
			this.continueBtn,
			this.crossBtn,
			this.pauseBtn,
			this.progressBar,
		);
		container.addChild(this.uiContainer);
		return;
	}

	public init(): void {

		// Constants
		const margin = 8;
		const screen = {
			width: 960,
			height: 540
		}

		// Initializations
		this.healthBar.x = margin;
		this.healthBar.y = -this.healthBar.height - margin;
		this.pauseBtn.x = screen.width - this.pauseBtn.width - margin;
		this.pauseBtn.y = -this.pauseBtn.height - margin;
		this.crossBtn.position = this.pauseBtn.position;
		this.continueBtn.position = this.pauseBtn.position;
		const xDiff = this.pauseBtn.x - this.healthBar.x - this.healthBar.width;
		this.progressBar.rect(0, 0, 456, 8);
		this.progressBar.fill(0xFFFFFF);
		this.progressBar.x = this.healthBar.x + this.healthBar.width +
			(xDiff - this.progressBar.width) / 2;
		this.progressBar.y = -4 * margin;

		// Animations
		this.enterAnimations.push(
			toPoint(this.healthBar, {
				x: margin,
				y: margin,
			}, 250, 2250),
			toPoint(this.progressBar, {
				x: this.progressBar.x,
				y: margin,
			}, 250, 2350),
			toPoint(this.pauseBtn, {
				x: this.pauseBtn.x,
				y: margin,
			}, 250, 2450),
		);
		startTweens(this.enterAnimations);
		return;
	}

	public animate(): void {
		updateTweens(this.enterAnimations);
	}

	public erase(): void {
	}
}
