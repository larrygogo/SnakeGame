import Scene from "../core/Scene.js";
import Event from "../core/Event.js";
import Snake from "../sprites/game/Snake.js";
import Food from "../sprites/game/Food.js";
import HomeScene from "./HomeScene.js";

class GameScene extends Scene{
	constructor() {
		super();
		this.timer = null;
		this.time = 0
		this.foods = [];
		this.snake = new Snake({
			x: 20,
			y: 20,
			forward: 'bottom',
			step: 10,
			length: 3
		});
		const vacancy1 = this.findVacancy();
		const vacancy2 = this.findVacancy();
		this.foods = [new Food(vacancy1.x, vacancy1.y), new Food(vacancy2.x, vacancy2.y)];
		this.addSprite(this.snake)
		this.foods.forEach(food => this.addSprite(food))
		const event = new Event('keydown', (e) => {
			switch (e.key) {
				case 'ArrowUp':
					if(this.snake.forward !== 'bottom') {
						this.snake.forward = 'top';
					}
					break;
				case 'ArrowRight':
					if(this.snake.forward !== 'left') {
						this.snake.forward = 'right';
					}
					break;
				case 'ArrowDown':
					if(this.snake.forward !== 'top') {
						this.snake.forward = 'bottom';
					}
					break;
				case 'ArrowLeft':
					if(this.snake.forward !== 'right') {
						this.snake.forward = 'left';
					}
					break;
			}
		}, true)
		this.addEvent(event)
	}

	beforeMount() {
		super.beforeMount();
		this.timer = setInterval(() => {
			this.time++;
			if (this.checkIsOver()) {
				this.game.changeScene(new HomeScene());
			}
		}, 5)
	}

	set time (time) {
		this._time = time;
		if (time % 20 === 0 && time !== 0) {
			this.snake.move();
			this.foods = this.foods.map(food => {
				if (food.isEaten(this.snake)) {
					this.snake.addBody()
					const vacancy = this.findVacancy();
					food.x = vacancy.x;
					food.y = vacancy.y;
				}
				return food;
			});
		}
	}

	get time() {
		return this._time;
	}

	findVacancy() {
		// 生成 1 - 49 的随机数
		const random = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		const x = random(1, this.game.width - 1) * 10;
		const y = random(1, this.game.height - 1) * 10;
		const body = this.snake.body;
		for (let i = 0; i < body.length; i++) {
			if (body[i].x === x && body[i].y === y) {
				return this.findVacancy();
			}
		}
		return {x, y}
	}

	checkIsOver() {
		const {x, y} = this.snake;
		const body = this.snake.body;
		if (x < 10 || x > (this.game.width - 1) * 10 || y < 10 || y > (this.game.height - 1) * 10) {
			return true;
		}
		for (let i = 1; i < body.length; i++) {
			if (body[i].x === x && body[i].y === y) {
				return true;
			}
		}
		return false;
	}

	destroy() {
		super.destroy();
		clearInterval(this.timer);
		this.time = 0;
	}
}

export default GameScene;