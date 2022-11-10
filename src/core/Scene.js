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

	render() {
		this.sprites.forEach(sprite => {
			sprite.draw();
		});
		this.events.forEach(event => {
			event.run();
		});
	}
}

export default Scene