class DataStore {
	constructor() {
		this.data = new Map();
		this.res = null
		this.canvas = null
		this.ctx = null
		this.game = null
		this.scenes = new Map()
	}

	add(key, value) {
		this.data.set(key, value);
		return this;
	}

	get(key) {
		return this.data.get(key);
	}

	destroy() {
		for (let value of this.data.values()) {
			value = null;
		}
		this.data.clear()
	}

	static getInstance() {
		if (!DataStore.instance) {
			DataStore.instance = new DataStore();
		}
		return DataStore.instance;
	}
}

export default DataStore;