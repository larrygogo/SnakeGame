import DataStore from "../../core/DataStore.js";
import {FOOD_COLOR, UNIT_LENGTH} from "../../config/constant.js";

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dataStore = DataStore.getInstance();
  }

  isEaten(snake) {
    const {x, y} = snake;
    return this.x === x && this.y === y;
  }

  draw() {
    // 画圆
    const {ctx} = this.dataStore;
    ctx.beginPath();
    ctx.fillStyle = FOOD_COLOR;
    ctx.arc(this.x + UNIT_LENGTH / 2, this.y + UNIT_LENGTH / 2, UNIT_LENGTH / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

export default Food;