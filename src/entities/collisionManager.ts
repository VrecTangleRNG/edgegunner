import { Box, System } from "check2d";

export class CollisionManager {
	private system: System = new System();

	createBox(x: number, y: number, width: number, height: number): Box {
		return this.system.createBox({ x: x, y: y }, width, height);
	}
}
