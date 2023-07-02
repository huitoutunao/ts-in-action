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

    // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log('水平方向发生了掉头')
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.X) {
        // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X - 10
      } else {
        // 向左走
        value = this.X + 10
      }
    }

    this.moveBody()
    this.head.style.left = `${value}px`
    this.checkHeadBody()
  }

  set Y(value: number) {
    if (this.Y === value) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }

    // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    this.moveBody()
    this.head.style.top = `${value}px`
    this.checkHeadBody()
  }

  addBody() {
    this.elem.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 移动身体
  moveBody() {
    /*
    *   将后边的身体设置为前边身体的位置
    *       举例子：
    *           第4节 = 第3节的位置
    *           第3节 = 第2节的位置
    *           第2节 = 蛇头的位置
    */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop

      ;(this.bodies[i] as HTMLElement).style.left = X + 'px'
      ;(this.bodies[i] as HTMLElement).style.top = Y + 'px'
    }
  }

  // 检查蛇头是否撞到身体的方法
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己了！')
      }
    }
  }
}
