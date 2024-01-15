import {FLOOR_LIGHT_COLOR, UNIT_LENGTH} from "../../config/constant.js";
import DataStore from "../../core/DataStore.js";

export class Floor {
  constructor(x, y, style = FLOOR_LIGHT_COLOR) {
    this.x = x;
    this.y = y;
    this.style = style;
    this.dataStore = DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
  }

  draw() {
    this.ctx.fillStyle = this.style;
    this.ctx.fillRect(this.x, this.y, UNIT_LENGTH, UNIT_LENGTH);
  }
}