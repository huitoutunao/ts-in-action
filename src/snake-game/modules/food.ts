export default class Food {
  elem: HTMLElement

  constructor() {
    // 末尾加上叹号，表示 id 为 food 的元素必定存在（非空）
    this.elem = document.getElementById('food')!
  }

  get X() {
    return this.elem.offsetLeft
  }

  get Y() {
    return this.elem.offsetTop
  }

  change() {
    const top = Math.round(Math.random() * 29) * 10
    const left = Math.round(Math.random() * 29) * 10

    this.elem.style.top = `${top}px`
    this.elem.style.left = `${left}px`
  }
}
