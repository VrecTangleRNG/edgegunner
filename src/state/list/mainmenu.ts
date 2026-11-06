import { Container, Sprite, Ticker } from "pixi.js";
import { State, StateMachine } from "../machine";
import { Player } from "../../entities/player";
import { Platform } from "../../entities/platform";

export class MainmenuState implements State {
	name = "mainmenu";
	container: Container;
	machine!: StateMachine;

	private cameraContainer: Container;
	private background: Sprite;
	private ground: Sprite;
	private player: Player;
	private platform: Platform;
	private title: Sprite;
	private playBtn: Sprite;
	private equipmentBtn: Sprite;
	private rewardsBtn: Sprite;
	private shopBtn: Sprite;
	private settingsBtn: Sprite;
	private playerBtn: Sprite;
	private aboutBtn: Sprite;

	constructor() {

		// Game scene elements
		this.background = Sprite.from("background");
		this.ground = Sprite.from("ground");
		this.player = new Player();
		this.platform = new Platform();

		// UI elements
		this.title = Sprite.from("title");
		this.playBtn = Sprite.from("playBtn");
		this.equipmentBtn = Sprite.from("equipmentBtn");
		this.rewardsBtn = Sprite.from("rewardsBtn");
		this.shopBtn = Sprite.from("shopBtn");
		this.settingsBtn = Sprite.from("settingsBtn");
		this.playerBtn = Sprite.from("playerBtn");
		this.aboutBtn = Sprite.from("aboutBtn");

		// Containers
		this.container = new Container();
		this.cameraContainer = new Container();

		this.player.addToContainer(this.cameraContainer);
		this.platform.addToContainer(this.cameraContainer);
		this.cameraContainer.addChild(this.background, this.ground);
		this.container.addChild(
			this.cameraContainer,
			this.title,
			this.playBtn,
			this.equipmentBtn,
			this.rewardsBtn,
			this.shopBtn,
			this.settingsBtn,
			this.playerBtn,
			this.aboutBtn,
		);
	}

	update(ticker: Ticker) {
	}

	onEnter(stateMachine: StateMachine): void {

		// Containers and machine
		const screen = stateMachine.getApp().screen;
		this.machine = stateMachine;
		this.cameraContainer.y = -screen.height / 4;

		// UI elements
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

		// Game scene elements
		const playerSprite = this.player.getSprite();
		const platformSprite = this.platform.getSprite();
		this.background.position.set(0);
		this.ground.y = this.background.height;
		this.platform.setPosition(
			-platformSprite.width * 8.5/10,
			this.ground.y - platformSprite.height - 10
		);
		this.platform.setZIndex(1);
		this.player.setPosition(
			margin,
			this.platform.getPlatformGround().y - playerSprite.height
		);
		this.player.setZIndex(2);
	}

	onExit(): void {
	}
	
	onPause(): void {
	}

	onResume(): void {
	}
}
