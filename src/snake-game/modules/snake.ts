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
    this.head.style.left = `${value}px`
  }

  set Y(value: number) {
    this.head.style.top = `${value}px`
  }

  addBody() {
    this.elem.insertAdjacentHTML('beforeend', '<div></div>')
  }
}
