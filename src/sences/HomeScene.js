import Scene from "../core/Scene.js";
import Event from "../core/Event.js";
import StartButton from "../sprites/home/StartButton.js";
import GameScene from "./GameScene.js";
import {UNIT_LENGTH} from "../config/constant.js";

class HomeScene extends Scene{
	constructor() {
		super();
		this.startButton = new StartButton(this.game.width * UNIT_LENGTH / 2, this.game.height * UNIT_LENGTH / 2);
		this.addSprite(this.startButton)
		const event = new Event('click', (e) => {
			const {x, y} = e;
			// 获取相对于canvas的坐标
			const {left, top} = this.game.canvas.getBoundingClientRect();
			if (this.startButton.isClicked(x - left, y - top)) {
				console.log('开始游戏');
				this.game.changeScene(new GameScene());
			}
		})
		this.addEvent(event)
	}
}

export default HomeScene;