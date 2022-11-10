import Scene from "../core/Scene.js";
import StartButton from "../sprites/StartButton.js";

class HomeScene extends Scene{
	constructor() {
		super();
		this.startButton = new StartButton(this.game.width * 10 / 2, this.game.height * 10 - 200)
		this.addSprite(this.startButton)
		this.addEvent('click', (e) => {
			const {x, y} = e;
			console.log(x, y);
			if (this.startButton.isClicked(x, y)) {
				this.initGameStart();
				this.timer = setInterval(() => this.time++, 5);
			}
		})
	}
}

export default HomeScene;