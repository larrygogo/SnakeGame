import Sprite from "../../core/Sprite.js";
import DataStore from "../../core/DataStore.js";

class Food extends Sprite {
	constructor(x, y) {
		const image = DataStore.getInstance().res.get('food');
		super(image, 0, 0, image.width, image.height, false);
		this.x = x;
		this.y = y;
	}

	isEaten(snake) {
		const {x, y} = snake;
		return this.x === x && this.y === y;
	}

	draw() {
		super.draw(this.x, this.y, 10, 10);
	}
}

export default Food;