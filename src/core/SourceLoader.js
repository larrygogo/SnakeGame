import sourceMap from '../config/sourceMap.js'
// 图片资源加载器
class SourceLoader {
	constructor() {
		this.sourceMap = new Map(sourceMap);
		this.map = new Map();
		for (let [key, value] of this.sourceMap) {
			const image = new Image();
			image.src = value;
			this.map.set(key, image);
		}
	}

	async onLoaded(callback) {
		let loadedCount = 0;
		let totalCount = this.map.size;
		for (let value of this.map.values()) {
			value.onload = () => {
				loadedCount++;
				if (loadedCount >= this.map.size) {
					callback(this.map, loadedCount, totalCount);
				}
			}
		}
	}

	static getInstance() {
		if (!SourceLoader.instance) {
			SourceLoader.instance = new SourceLoader();
		}
		return SourceLoader.instance;
	}
}

export default SourceLoader;