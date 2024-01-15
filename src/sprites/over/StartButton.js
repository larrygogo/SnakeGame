import Sprite from "../../core/Sprite.js";
import DataStore from "../../core/DataStore.js";

class StartButton extends Sprite{
	constructor(x, y) {
		const image = DataStore.getInstance().res.get('startButton');
		super(image, x, y, image.width, image.height, false);
	}

	draw() {
		super.draw(this.x, this.y, this.width, this.height);
	}
}

export default StartButton