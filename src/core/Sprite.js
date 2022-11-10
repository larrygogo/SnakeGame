import DataStore from "./DataStore.js";

class Sprite {
	image = null;
	x = 0;
	y = 0;
	width = 0;
	height = 0;
	collisions = false

	constructor(image, x, y, width, height, collisions = false) {
		this.dataStore = DataStore.getInstance()
		this.ctx = this.dataStore.ctx
		this.image = image
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.collisions = collisions
	}

	draw(x, y, width, height) {
		this.ctx.drawImage(this.image, 0, 0, this.width, this.height, x - (width / 2), y - (height / 2), width, height)
	}

	isClicked(x, y) {
		return x > this.x - this.width / 2 && x < this.x + this.width / 2 && y > this.y - this.height / 2 && y < this.y + this.height / 2
	}
}

export default Sprite