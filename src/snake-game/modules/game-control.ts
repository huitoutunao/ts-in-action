import Food from './food'
import ScorePanel from './score-panel'
import Snake from './snake'

export default class GameControl {
  food: Food
  snake: Snake
  scorePanel: ScorePanel
  direction: string = ''
  isLive = true

  constructor() {
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run()
  }

  /*
    Chrome       IE
    ArrowUp      Up
    ArrowDown    Down
    ArrowLeft    Left
    ArrowRight   Right
  */
  keydownHandler(e: KeyboardEvent) {
    this.direction = e.key
  }

  run() {
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
    }

    this.checkEat(X, Y)

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      alert((e as Error).message + ' GAME OVER!')
      this.isLive = false
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}
