;(() => {
  // 对象类型

  // readonly 属性
  // 不过使用 readonly 并不意味着一个值就完全是不变的，亦或者说，内部的内容是不能变的。readonly 仅仅表明属性本身是不能被重新写入的。
  interface Home {
    readonly resident: {
      name: string
      age: number
    }
  }

  function visitForBirthday(home: Home) {
    console.log(`Happy birthday ${home.resident.name}!`)
    home.resident.age++
  }

  function evict(home: Home) {
    // 无法为 resident 赋值，因为它是只读属性。
    // home.resident = {
    //   name: 'Tom',
    //   age: 18,
    // }
  }

  // 索引签名
  interface StringArray {
    [index: number]: string
  }
  const getStringArray = () => ['1', '2', '3']
  const myArray: StringArray = getStringArray()
  const secondItem = myArray[1]
  console.log(secondItem)

  // 虽然 TypeScript 可以同时支持 string 和 number 类型，但数字索引的返回类型一定要是字符索引返回类型的子类型。
  interface Animal {
    name: string
  }
  interface Dog extends Animal {
    breed: string
  }
  /* 报错：数字索引的返回类型一定要是字符索引返回类型的子类型。
  interface NotOkay {
    [x: number]: Animal
    [x: string]: Dog
  } */
  interface NotOkay {
    [x: string]: Animal
    [x: number]: Dog
  }

  // 属性继承
  // extends 关键字实现
  // 接口可以继承多个类型
  interface Colorful {
    color: string
  }
  interface Circle {
    radius: number
  }
  interface ColorCircle extends Colorful, Circle {}
  const cc: ColorCircle = {
    color: 'red',
    radius: 24,
  }

  // 交叉类型：TypeScript 也提供了名为交叉类型（Intersection types）的方法，用于合并已经存在的对象类型。操作符：&
  type ColorCircle2 = Colorful & Circle

  // 接口继承与交叉类型最大的区别：使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会。

  // ReadonlyArray：是一个特殊类型，它可以描述数组不能被改变。
  // 当我们看到一个函数返回 ReadonlyArray，就是在告诉我们不能去更改其中的内容，当我们看到一个函数支持传入 ReadonlyArray，这是在告诉我们我们可以放心的传入数组到函数中，而不用担心会改变数组的内容。
  // ReadonlyArray<Type> 提供了更简短的写法 readonly Type[]

  // 元组类型：当你明确知道数组包含多少个元素，并且每个位置元素的类型都明确知道的时候，就适合使用元组类型。
  // 元组类型可以使用可选操作符，但是要把它放在最后
  type Either2dOr3d = [number, number, number?]
  // 在大部分的代码中，元组只是被创建，使用完后也不会被修改，所以尽可能的将元组设置为 readonly 是一个好习惯。
  function doSomething(pair: readonly [string, number]) {
    // pair[0] = "hello!"
    // 报错：元组不能被修改
  }
  // 如果我们给一个数组字面量 const 断言，也会被推断为 readonly 元组类型。
  let point = [3, 4] as const
  function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2)
  }
  // distanceFromOrigin(point)
  // 类型“readonly [3, 4]”的参数不能赋给类型“[number, number]”的参数。
  // 类型 "readonly [3, 4]" 为 "readonly"，不能分配给可变类型 "[number, number]"。

})()
