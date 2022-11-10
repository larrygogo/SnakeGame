import Scene from "../core/Scene.js";
import Event from "../core/Event.js";
import StartButton from "../sprites/home/StartButton.js";
import GameScene from "./GameScene.js";

class HomeScene extends Scene{
	constructor() {
		super();
		this.startButton = new StartButton(this.game.width * 10 / 2, this.game.height * 10 - 200)
		this.addSprite(this.startButton)
		const event = new Event('click', (e) => {
			const {x, y} = e;
			console.log(x, y);
			if (this.startButton.isClicked(x, y)) {
				console.log(1111)
				this.game.changeScene(new GameScene());
			}
		})
		this.addEvent(event)
	}
}

export default HomeScene;