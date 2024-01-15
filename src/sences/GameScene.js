import Scene from "../core/Scene.js";
import Event from "../core/Event.js";
import Snake from "../sprites/game/Snake.js";
import Food from "../sprites/game/Food.js";
import {Floor} from "../sprites/game/Floor.js";
import {FLOOR_DARK_COLOR, FLOOR_LIGHT_COLOR, UNIT_LENGTH} from "../config/constant.js";
import {OverScene} from "./OverScene.js";

class GameScene extends Scene{
	constructor() {
		super();
		this.timer = null;
		this.time = 0;

		this.game.dataStore.score = 0;

		const maxX = this.game.width;
		const maxY = this.game.height;

		const maxWidth = maxX * UNIT_LENGTH;
		const maxHeight = maxY * UNIT_LENGTH;

		// 创建地板
		Array.from({length: maxX * maxY}).forEach((_, index) => {
			const floor = new Floor(
				index % maxX * UNIT_LENGTH,
				Math.floor(index / maxX) * UNIT_LENGTH,
				// 奇数行 黑白黑白 偶数行 白黑白黑
				(index % maxX + Math.floor(index / maxX)) % 2 === 0 ? FLOOR_DARK_COLOR : FLOOR_LIGHT_COLOR
			)
			this.addSprite(floor)
		})

		// 创建蛇
		this.snake = new Snake({
			x: maxWidth / 2,
			y: maxHeight / 2,
			forward: 'bottom',
			step: 10,
			length: 3
		});
		this.addSprite(this.snake)

		// 创建食物
		this.foods = [];
		const vacancy1 = this.findVacancy();
		this.foods = [new Food(vacancy1.x, vacancy1.y)];
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
				console.log('游戏结束');
				this.game.changeScene(new OverScene());
			}
		}, 5)
	}

	set time (time) {
		this._time = time;
		if (time % 20 === 0 && time !== 0) {
			this.snake.move();
			this.foods = this.foods.map(food => {
				if (food.isEaten(this.snake)) {
					this.game.dataStore.score += 1;
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
		const vacancy = {
			x: 0,
			y: 0
		}
		do {
			vacancy.x = Math.floor(Math.random() * this.game.width) * UNIT_LENGTH;
			vacancy.y = Math.floor(Math.random() * this.game.height) * UNIT_LENGTH;
		} while (this.foods.some(food => food.x === vacancy.x && food.y === vacancy.y) || this.snake.body.some(body => body.x === vacancy.x && body.y === vacancy.y))
		return vacancy;
	}

	checkIsOver() {
		// 蛇头碰到边界
		const maxX = this.game.width;
		const maxY = this.game.height;
		const maxWidth = maxX * UNIT_LENGTH;
		const maxHeight = maxY * UNIT_LENGTH;

		if (this.snake.x < 0 || this.snake.x > maxWidth || this.snake.y < 0 || this.snake.y > maxHeight) {
			return true;
		}

		// 蛇头碰到身体
		const {x, y} = this.snake;
		return this.snake.body.filter((_, i) => i !== 0).some(body => body.x === x && body.y === y);

	}

	destroy() {
		super.destroy();
		clearInterval(this.timer);
		this.time = 0;
	}
}

export default GameScene;