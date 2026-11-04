import { Assets } from 'pixi.js';


export async function load() {
	//await Assets.load([
		//{ alias: "background", src: "assets/textures/bg.png" },
	//]);
	await Assets.load("assets/textures/main.json");
}
