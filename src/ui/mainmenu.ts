import { Container, Sprite } from "pixi.js";
import { globalEvent, setBtn } from "../systems/utils";
import { Easing, Group, Tween } from "@tweenjs/tween.js";

export class MainmenuUI {
	private uiContainer: Container;
	private exitAnimations: Group;
	private title: Sprite;
	private playBtn: Sprite;
	private equipmentBtn: Sprite;
	private rewardsBtn: Sprite;
	private shopBtn: Sprite;
	private settingsBtn: Sprite;
	private playerBtn: Sprite;
	private aboutBtn: Sprite;

	constructor() {
		this.uiContainer = new Container();
		this.exitAnimations = new Group();
		this.title = Sprite.from("title");
		this.playBtn = Sprite.from("playBtn");
		this.equipmentBtn = Sprite.from("equipmentBtn");
		this.rewardsBtn = Sprite.from("rewardsBtn");
		this.shopBtn = Sprite.from("shopBtn");
		this.settingsBtn = Sprite.from("settingsBtn");
		this.playerBtn = Sprite.from("playerBtn");
		this.aboutBtn = Sprite.from("aboutBtn");
	}

	public addToContainer(container: Container): void {
		this.uiContainer.addChild(
			this.title,
			this.playBtn,
			this.equipmentBtn,
			this.rewardsBtn,
			this.shopBtn,
			this.settingsBtn,
			this.playerBtn,
			this.aboutBtn,
		);
		container.addChild(this.uiContainer);
		return;
	}

	public init(): void {
		const screen = {
			width: 960,
			height: 540
		}
		const margin = (screen.height - this.title.height - this.playBtn.height * 4) / 7;

		this.title.x = screen.width - this.title.width - margin;
		this.title.y = margin + 10;
		this.shopBtn.x = screen.width - this.shopBtn.width - margin;
		this.shopBtn.y = screen.height - this.shopBtn.height - margin;
		this.rewardsBtn.x = this.shopBtn.x;
		this.rewardsBtn.y = this.shopBtn.y - this.rewardsBtn.height - margin;
		this.equipmentBtn.x = this.shopBtn.x;
		this.equipmentBtn.y = this.rewardsBtn.y - this.equipmentBtn.height - margin;
		this.playBtn.x = this.shopBtn.x;
		this.playBtn.y = this.equipmentBtn.y - this.playBtn.height - margin;
		this.settingsBtn.x = margin;
		this.settingsBtn.y = screen.height - this.settingsBtn.height - margin;
		this.playerBtn.x = this.settingsBtn.x + this.settingsBtn.width + margin;
		this.playerBtn.y = this.settingsBtn.y;
		this.aboutBtn.x = this.playerBtn.x + this.aboutBtn.width + margin;
		this.aboutBtn.y = this.playerBtn.y;

		this.exitAnimations.add(
			toRightScreen(this.title, 0),
			toRightScreen(this.playBtn, 0, this.exitAnimations).chain(blink(this.playBtn, 0, this.exitAnimations)),
			toRightScreen(this.equipmentBtn, 1),
			toRightScreen(this.rewardsBtn, 2),
			toRightScreen(this.shopBtn, 3),
			toBottomScreen(this.settingsBtn, 0),
			toBottomScreen(this.playerBtn, 0),
			toBottomScreen(this.aboutBtn, 0),
		);

		setBtn(this.playBtn);
		this.playBtn.on("pointertap", () => {
			globalEvent.emit("pressedplay");
			this.exitAnimations.getAll().forEach( (tween) => {
				if (!tween.isPlaying()) tween.start();
			});
		});
		return;
	}

	public animate(): void {
		this.exitAnimations.update();
	}

	public erase(): void {
		this.title.destroy();
		this.shopBtn.destroy();
		this.rewardsBtn.destroy();
		this.equipmentBtn.destroy();
		this.playBtn.destroy();
		this.settingsBtn.destroy();
		this.playerBtn.destroy();
		this.aboutBtn.destroy();
	}
}

function toRightScreen(sprite: Sprite, delayRate: number, group?: Group): Tween {
	const object = { x: sprite.x };
	return new Tween(object, group)
		.to({ x: 965 }, 600)
		.easing(Easing.Quadratic.In)
		.delay(75 * delayRate)
		.onUpdate( () => {
			sprite.x = object.x;
		})
}

function toBottomScreen(sprite: Sprite, delayRate: number, group?: Group): Tween {
	const object = { y: sprite.y };
	return new Tween(object, group)
		.to({ y: 545 }, 600)
		.easing(Easing.Quadratic.In)
		.delay(75 * delayRate)
		.onUpdate( () => {
			sprite.y = object.y;
		})
}

function blink(sprite: Sprite, delayRate: number, group?: Group): Tween {
	const object = { x: sprite.x };
	return new Tween(object, group)
		.to({ x: sprite.x - 100 }, 200)
		.easing(Easing.Quadratic.Out)
		.delay(75 * delayRate)
		.onUpdate( () => {
			sprite.x = object.x;
		})
		.repeat(2)
}
