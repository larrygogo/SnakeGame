import SnakeBody from "./SnakeBody.js";
import {UNIT_LENGTH} from "../../config/constant.js";

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
		this.x = options.x;
		this.y = options.y;
		this.length = options.length;
		this.forward = options.forward;
		this.initBody(options.length)
	}

	move() {
		if (this.forward === 'top') {
			this.y -= UNIT_LENGTH;
		}
		if (this.forward === 'right') {
			this.x += UNIT_LENGTH;
		}
		if (this.forward === 'bottom') {
			this.y += UNIT_LENGTH;
		}
		if (this.forward === 'left') {
			this.x -= UNIT_LENGTH;
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
					this.body.push(new SnakeBody(this.x, this.y + (i * UNIT_LENGTH), UNIT_LENGTH));
					break;
				case 'right':
					this.body.push(new SnakeBody(this.x - (i * UNIT_LENGTH), this.y, UNIT_LENGTH));
					break;
				case 'bottom':
					this.body.push(new SnakeBody(this.x, this.y - (i * UNIT_LENGTH), UNIT_LENGTH));
					break;
				case 'left':
					this.body.push(new SnakeBody(this.x + (i * UNIT_LENGTH), this.y, UNIT_LENGTH));
			}
		}
	}


	addBody() {
		const lastBody = this.body[this.body.length - 1];
		const x = lastBody.x;
		const y = lastBody.y;
		this.body.push(new SnakeBody(x, y));
	}

	draw() {
		for (let i = 0; i < this.body.length; i++) {
			this.body[i].draw();
		}
	}

	get forward() {
		return this._forward;
	}

	set forward(forward) {
		const forwards = ['top', 'right', 'bottom', 'left'];
		if (forwards.includes(forward)) {
			this._forward = forward;
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