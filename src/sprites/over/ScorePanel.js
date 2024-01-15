import DataStore from "../../core/DataStore.js";

export class ScorePanel {
  constructor() {
    this.score = DataStore.getInstance().score ?? 0;
  }

  draw() {
    const {ctx} = DataStore.getInstance();
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fff';
    // 获取文字的宽度
    const textWidth = ctx.measureText(`分数：${this.score}`).width;
    ctx.fillText(`分数：${this.score}`, (ctx.canvas.width - textWidth) / 2, 30);
  }
}