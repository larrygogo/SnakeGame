import SnakeBody from "./SnakeBody.js";
import DataStore from "../core/DataStore.js";

class Snake {
	/**
	 * @param options {Object}
	 * @param options.x {Number}
	 * @param options.y {Number}
	 * @param options.forward {'top' | 'right' | 'bottom' | 'left'}
	 * @param options.step {Number}
	 * @param options.length {Number}
	 */
	constructor(options) {
		this.headImg = DataStore.getInstance().res.get('snakeHead');
		this.bodyImg = DataStore.getInstance().res.get('snakeBody');
		this.x = options.x;
		this.y = options.y;
		this.length = options.length;
		this.forward = options.forward;
		this.step = options.step || 10;
		this.initBody(options.length)
	}

	move() {
		if (this.forward === 'top') {
			this.y -= this.step;
		}
		if (this.forward === 'right') {
			this.x += this.step;
		}
		if (this.forward === 'bottom') {
			this.y += this.step;
		}
		if (this.forward === 'left') {
			this.x -= this.step;
		}
		for (let i = this.body.length - 1; i >= 0; i--) {
			if (i === 0) {
				this.body[i].move(this)
			} else {
				this.body[i].move(this.body[i - 1]);
			}
		}
	}

	initBody(length) {
		this.body = [];
		for (let i = 0; i < length; i++) {
			switch (this.forward) {
				case 'top':
					this.body.push(new SnakeBody(this.x, this.y + (i * this.step), this.step));
					break;
				case 'right':
					this.body.push(new SnakeBody(this.x - (i * this.step), this.y, this.step));
					break;
				case 'bottom':
					this.body.push(new SnakeBody(this.x, this.y - (i * this.step), this.step));
					break;
				case 'left':
					this.body.push(new SnakeBody(this.x + (i * this.step), this.y, this.step));
			}
		}
	}

	// 根据方向旋转图片
	rotateImage(forward) {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const image = DataStore.getInstance().res.get('snakeHead');
		canvas.width = image.width;
		canvas.height = image.height;
		ctx.translate(canvas.width / 2, canvas.height / 2);
		switch (forward) {
			case 'top':
				ctx.rotate(0);
				break;
			case 'right':
				ctx.rotate(Math.PI / 2);
				break;
			case 'bottom':
				ctx.rotate(Math.PI);
				break;
			case 'left':
				ctx.rotate(Math.PI * 3 / 2);
				break;
			default:
				throw new Error('forward is not valid, allowed values are: top, right, bottom, left');
		}
		ctx.translate(-canvas.width / 2, -canvas.height / 2);
		ctx.drawImage(image, 0, 0, image.width, image.height);
		this.headImg = canvas;
	}

	addBody() {
		const lastBody = this.body[this.body.length - 1];
		const x = lastBody.x;
		const y = lastBody.y;
		this.body.push(new SnakeBody(x, y, this.step));
	}

	draw() {
		for (let i = 0; i < this.body.length; i++) {
			if (i === 0) {
				this.body[i].draw(this.headImg);
			} else {
				this.body[i].draw(this.bodyImg);
			}
		}
	}

	get forward() {
		return this._forward;
	}

	set forward(forward) {
		const forwards = ['top', 'right', 'bottom', 'left'];
		if (forwards.includes(forward)) {
			this._forward = forward;
			this.rotateImage(forward);
		} else {
			throw new Error('forward is not valid, allowed values are: top, right, bottom, left');
		}
	}

	get x() {
		return this._x;
	}

	set x(x) {
		this._x = x;
	}

	get y() {
		return this._y;
	}

	set y(y) {
		this._y = y;
	}
}

export default Snake