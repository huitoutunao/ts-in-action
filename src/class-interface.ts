// 类与接口
interface Human {
  // 接口不能约束类的构造函数
  // new(name: string): void;

  name: string;
  eat(): void;
}

// 类实现接口，使用 implements 关键字
class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }

  // 报错：属性“name”在类型“Asian”中是私有属性，但在类型“Human”中不是
  // 接口只能约束公有成员
  // private name: string

  name: string
  eat() {}
  sleep() {}
}

// 接口继承接口
// 作用：抽离可重用的接口或者将多个接口合并成一个
interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void;
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {},
}

// 接口继承类
// 接口把类的成员抽象出来
class Auto {
  state = 1
}
interface AutoInterface extends Auto {}

class C implements AutoInterface {
  state = 1
}

class Bus extends Auto implements AutoInterface {

}
