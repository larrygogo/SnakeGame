import DataStore from "./DataStore.js";

class Event {
	constructor(type, listener) {
		this.canvas = DataStore.getInstance().canvas;
		this.type = type;
		this.listener = listener;
	}

	run() {
		this.canvas.addEventListener(this.type, this.listener);
	}

	remove() {
		this.canvas.removeEventListener(this.type, this.listener);
	}
}