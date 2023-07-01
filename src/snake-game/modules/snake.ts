export default class Snake {
  elem: HTMLElement
  head: HTMLElement
  bodies: HTMLCollection

  constructor() {
    this.elem = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.elem.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value: number) {
    if (this.X === value) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }

    this.head.style.left = `${value}px`
  }

  set Y(value: number) {
    if (this.Y === value) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }

    this.head.style.top = `${value}px`
  }

  addBody() {
    this.elem.insertAdjacentHTML('beforeend', '<div></div>')
  }
}
