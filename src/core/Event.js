import DataStore from "./DataStore.js";

class Event {
	constructor(type, listener, isBody = false) {
		this.canvas = DataStore.getInstance().canvas;
		this.type = type;
		this.listener = listener;
		this.isBody = isBody;
	}

	run() {
		if (this.isBody) {
			document.body.addEventListener(this.type, this.listener);
		} else {
			this.canvas.addEventListener(this.type, this.listener);
		}
	}

	remove() {
		if (this.isBody) {
			document.body.removeEventListener(this.type, this.listener);
		} else {
			this.canvas.removeEventListener(this.type, this.listener);
		}
	}
}

export default Event