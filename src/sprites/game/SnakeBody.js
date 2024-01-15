import {SNAKE_COLOR, UNIT_LENGTH} from "../../config/constant.js";
import DataStore from "../../core/DataStore.js";


class SnakeBody {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.dataStore = DataStore.getInstance();
	}

	move({x, y}) {
		this.x = x;
		this.y = y;
	}

	draw() {
		this.dataStore.ctx.fillStyle = SNAKE_COLOR;
		this.dataStore.ctx.fillRect(this.x, this.y, UNIT_LENGTH, UNIT_LENGTH);
	}
}

export default SnakeBody;