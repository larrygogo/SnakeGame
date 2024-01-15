import DataStore from "./core/DataStore.js";
import SourceLoader from "./core/SourceLoader.js";
import HomeScene from "./sences/HomeScene.js";
import {UNIT_LENGTH} from "./config/constant.js";
import {OverScene} from "./sences/OverScene.js";

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
		this.canvas.width = options.width * UNIT_LENGTH;
		this.canvas.height = options.height * UNIT_LENGTH;
		this.level = options.level || 1;
		this.ctx = this.canvas.getContext('2d');
		this.dataStore = DataStore.getInstance();
		this.dataStore.game = this;
		const loader = SourceLoader.getInstance();
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
		// this.currentScene = new HomeScene();
		// this.currentScene = new GameScene();
		this.currentScene = new OverScene();
		this.currentScene.beforeMount();
		this.loop();
	}

	loop() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.currentScene.render();
		requestAnimationFrame(() => this.loop());
	}

	changeScene(scene) {
		this.currentScene.destroy()
		this.currentScene = scene
		this.currentScene.beforeMount()
	}
}

export default Game;