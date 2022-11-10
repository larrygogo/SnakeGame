import Food from "/src/sprites/Food.js";
import DataStore from "./core/DataStore.js";
import SourceLoader from "./core/SourceLoader.js";
import Snake from "./sprites/Snake.js";
import StartButton from "./sprites/StartButton.js";
import HomeScene from "./sences/HomeScene.js";

class Game {
	/**
	 * @param options
	 * @param options.level {Number: 1 | 2 | 3}
	 * @param options.width {Number}
	 * @param options.height {Number}
	 */
	constructor(options) {
		this.canvas = document.createElement("canvas");
		document.body.append(this.canvas);
		this.width = options.width;
		this.height = options.height;
		this.canvas.width = options.width * 10;
		this.canvas.height = options.height * 10;
		this.level = options.level || 1;
		this.ctx = this.canvas.getContext('2d');
		this.dataStore = DataStore.getInstance();
		this.dataStore.game = this;
		const loader = SourceLoader.getInstance();
		this.timer = null;
		this.gameIsOver = true;
		this.currentScene = null;
		loader.onLoaded(map => this.onFirstLoad(map))
	}

	onFirstLoad(map) {
		this.dataStore.canvas = this.canvas;
		this.dataStore.ctx = this.ctx;
		this.dataStore.res = map;
		this.start()
	}

	start() {
		this.currentScene = new HomeScene();
		this.loop();
	}

	set time (time) {
		this._time = time;
		if (time % 20 === 0) {
			this.snake.move();
			this.foods = this.foods.map(food => {
				if (food.isEaten(this.snake)) {
					this.snake.addBody()
					const vacancy = this.findVacancy();
					return new Food(vacancy.x, vacancy.y)
				}
				return food;
			});

		}
	}

	initGameStart() {
		this.gameIsOver = false;
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
		this.time = 0;
	}

	get time() {
		return this._time;
	}

	loop() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.currentScene.render();
		requestAnimationFrame(() => this.loop());
	}

	initEvent() {
		document.addEventListener('keydown', e => {
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
		})

		this.canvas.addEventListener('click', e => {
			const {x, y} = e;
			console.log(x, y);
			if (this.startButton.isClicked(x, y)) {
				this.initGameStart();
				this.timer = setInterval(() => this.time++, 5);
			}
		})
	}

	findVacancy() {
		const x = Math.floor(Math.random() * this.width - 1) * 10 + 10;
		const y = Math.floor(Math.random() * this.height - 1) * 10 + 10;
		const body = this.snake.body;
		for (let i = 0; i < body.length; i++) {
			if (body[i].x === x && body[i].y === y) {
				return this.findVacancy();
			}
		}
		console.log(x, y);
		return {x, y}
	}

	checkIsOver() {
		const {x, y} = this.snake;
		const body = this.snake.body;
		if (x < 10 || x > (this.width - 1) * 10 || y < 10 || y > (this.height - 1) * 10) {
			return true;
		}
		for (let i = 1; i < body.length; i++) {
			if (body[i].x === x && body[i].y === y) {
				return true;
			}
		}
		return false;
	}
}

export default Game;