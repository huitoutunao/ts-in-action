import Food from './food'
import ScorePanel from './score-panel'
import Snake from './snake'

export default class GameControl {
  food: Food
  snake: Snake
  scorePanel: ScorePanel
  direction: string = ''

  constructor() {
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.init()
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this))
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
}
