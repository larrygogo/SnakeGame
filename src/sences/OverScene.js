import Scene from "../core/Scene.js";
import Event from "../core/Event.js";
import {ScorePanel} from "../sprites/over/ScorePanel.js";
import StartButton from "../sprites/over/StartButton.js";
import {UNIT_LENGTH} from "../config/constant.js";
import GameScene from "./GameScene.js";

export class OverScene extends Scene{
  constructor() {
    super();
    // 显示分数
    const scorePanel = new ScorePanel();
    this.addSprite(scorePanel);
    const startButton = new StartButton(this.game.width * UNIT_LENGTH / 2, this.game.height * UNIT_LENGTH / 2);
    this.addSprite(startButton);

    const event = new Event('click', (e) => {
      const {x, y} = e;
      // 获取相对于canvas的坐标
      const {left, top} = this.game.canvas.getBoundingClientRect();
      if (startButton.isClicked(x - left, y - top)) {
        console.log('重新开始');
        this.game.changeScene(new GameScene());
      }
    })
    this.addEvent(event)
  }

}