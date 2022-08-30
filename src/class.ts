// 类 继承和成员修饰符
// ts 的类覆盖了 es6 的类
class Cat {
  constructor(name: string) {
    this.name = name
  }
  public name: string
  // name: string = 'cat' // 初始化，这种写法也可以
  // name?: string // 或者给它定义可选
  run() {}
  private myFun() {}
  protected myPro() {}
  readonly legs: number = 4
  static food: string = 'dorayaki'
}
// ts 的类与 es6 的类区别如下：
// 1、「类的成员属性」都是实例属性，而不是原型属性，「类的成员方法」都是原型方法。
// 2、实例的属性必须有初始值或在构造函数中初始化。
console.log(Cat.prototype) // >{run: ƒ, constructor: ƒ}
const cat = new Cat('miaomiao')
console.log(cat) // >Cat {name: 'miaomiao'}
// cat.myPro() // 错误

// 类继承
class Doraemon extends Cat {
  constructor(name: string, color: string) {
    super(name)
    this.color = color
    // this.myPro() // 正确
  }
  color: string
}

// 修饰符，这是 ts 对 es 的扩展
// public 公有修饰符
// private 私有修饰符
// private 可修饰构造器 constructor，结果是这个类即不能实例化，也不能被继承
// protected 保护修饰符，作用是只能在当前类或者子类访问，实例访问不被允许
// protected 可修饰构造器 constructor，结果是这个类不能实例化，但可以被继承
// readonly 只读修饰符，作用是只读，不能更改
// 构造函数中的参数添加修饰符，可以使之成为实例属性
// static 静态修饰符，只允许类名访问 Cat.food，它也可以被继承 Doraemon.food


// 抽象类
// 抽象类只能被继承，不能被实例化
abstract class Animal {
  eat() {
    console.log('eat')
  }

  // 在抽象类里面指定一个无具体实现的方法，称为抽象方法
  abstract sleep(): void
}

class Dog extends Animal {
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  run() {}
  sleep() {
    console.log('dog sleep')
  }
}

let dog = new Dog('wangwang')
dog.eat()

// 多态
class Pig extends Animal {
  sleep() {
    console.log('pig sleep')
  }
}

let pig = new Pig()

let animals: Animal[] = [dog, pig]
animals.forEach((item) => {
  item.sleep()
})

// 返回 this 实现链式调用
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}

new WorkFlow().step1().step2()

class MyFlow extends WorkFlow {
  next() {
    return this
  }
}

new MyFlow().next().step1().next().step2()
