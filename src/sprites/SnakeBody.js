import Sprite from "../core/Sprite.js";
import DataStore from "../core/DataStore.js";

class SnakeBody extends Sprite {
	constructor(x, y, step = 10) {
		const image = DataStore.getInstance().res.get('snakeBody');
		super(image, 0, 0, image.width, image.height, false);
		this.x = x
		this.y = y
		this.step = step;
	}

	move({x, y}) {
		this.x = x;
		this.y = y;
	}

	draw(image) {
		this.image = image;
		super.draw(this.x, this.y, this.step, this.step);
	}


}

export default SnakeBody;