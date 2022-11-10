import DataStore from "./DataStore.js";

class Scene {
	constructor() {
		this.game = DataStore.getInstance().game;
		this.sprites = [];
		this.events = []
	}

	addSprite(sprite) {
		this.sprites.push(sprite);
	}

	addEvent(event) {
		this.events.push(event);
	}

	clearEvents() {
		this.events.forEach(event => {
			event.remove();
		})
	}

	render() {
		this.sprites.forEach(sprite => {
			sprite.draw();
		});
	}

	beforeMount() {
		this.events.forEach(event => {
			event.run();
		});
	}

	destroy() {
		this.clearEvents();
		this.sprites = [];
	}
}

export default Scene