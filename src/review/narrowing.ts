// 类型收窄
;(() => {
  function padLeft(padding: number | string, input: string) {
    if (typeof padding === 'number') {
      return new Array(padding + 1).join(' ') + input
    }

    return padding + input
  }
  console.log(padLeft(1, 'world'))

  function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === 'object') {
      for (const s of strs) {
        // Object is possibly 'null'.
        console.log(s)
      }
    } else if (typeof strs === 'string') {
      console.log(strs)
    } else {
      // do nothing
    }
  }
  printAll(null)

  // in 操作符类型收窄
  type Fish = { swim: () => void }
  type Bird = { fly: () => void }
  function move(animal: Fish | Bird) {
    if ('swim' in animal) {
      return animal.swim()
      // (parameter) animal: Fish
    }

    return animal.fly()
    // (parameter) animal: Bird
  }

  // instanceof 类型收窄
  function logVal(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toDateString())
      // (parameter) x: Date
    } else {
      console.log(x.toLocaleLowerCase())
      // (parameter) x: string
    }
  }

  // TypeScript 可以根据赋值语句的右值，正确的收窄左值。
  let y = Math.random() < 0.5 ? 1 : 'hello world'
  // let y: string | number
  y = 10
  console.log(y) // let y: number
  y = 'say hello'
  console.log(y) // let y: string
  // y = true // 不能将类型 'boolean' 分配给类型 'string | number'

  // 类型判断式（类型谓词）
  // 在这个例子中，pet is Fish 就是我们的类型判断式，一个类型判断式采用 parameterName is Type的形式，但 parameterName 必须是当前函数的参数名。
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
  }

  // 可辨别联合
  // interface Shape {
  //   kind: 'circle' | 'square'
  //   radius?: number
  //   sideLength?: number
  // }
  // function getArea(shape: Shape) {
  //   if (shape.kind === 'circle') {
  //     // return Math.PI * shape.radius ** 2
  //     // 'shape.radius' 可能为 '未定义'

  //     // ! 非空断言可以解决，但是前面设置该属性是可选，现在确定存在，前后语义不符
  //     return Math.PI * shape.radius! ** 2
  //   }
  // }

  // 上面例子的最佳实践
  interface Circle {
    kind: 'circle'
    radius: number
  }
  interface Square {
    kind: 'square'
    sideLength: number
  }
  type Shape = Circle | Square
  function getArea(shape: Shape) {
    if (shape.kind === 'circle') {
      return Math.PI * shape.radius ** 2
    }
  }

  // never 类型
  // never 类型可以赋值给任何类型，然而，没有类型可以赋值给 never （除了 never 自身）。这就意味着你可以在 switch 语句中使用 never 来做一个穷尽检查。
  function getArea2(shape: Shape) {
    switch (shape.kind) {
      case 'circle':
        return Math.PI * shape.radius ** 2
      case 'square':
        return shape.sideLength ** 2
      default:
        const _exhaustiveCheck: never = shape
        return _exhaustiveCheck
    }
  }
})()
