(() => {
  // 基本类型定义
  let a: number
  a = 10
  // a = 'hello' // 类型报错

  let b: string
  b = 'hello'
  // b = 10 // 类型报错

  let c: boolean
  c = true
  // c = 10 // 类型报错

  // 字面量进行类型声明
  let d: 10
  d = 10
  // d = 11 // 值必须是 10
  // d = 'hello' // 值必须是 10

  let e1: 'male' | 'female'
  e1 = 'male'
  e1 = 'female'
  // e = 10 // 值必须是 male 或 female

  let e2: string | boolean
  e2 = 'hello'
  e2 = false
  // e2 = 10 // 值必须是 string 或 boolean 类型

  // any 指任意类型，一个变量设置类型为 any 后相当于对该变量关闭了 TS 的类型检测
  // 使用 TS 时，不建议使用 any 类型
  // let f: any // 显式 any
  let f // 隐式 any，即 TS 解析器自动判断变量的类型为 any
  f = 10
  f = 'hello'
  f = false

  // unknown 指未知类型的值
  let g: unknown
  g = 10
  g = true
  g = 'hello'

  let g1: string

  // f 类型是 any，它可以赋值给任意变量
  // g1 = f

  /**
   * 1. unknown 实际上是一个类型安全的 any
   * 2. unknown 类型的变量，不能直接赋值给其他变量
   * 总结：尽量使用 unknown 代替 any，any 只作为逃生舱
   * /
  // g1 = g // 类型报错
  // 如何解决呢？
  // 方案一：事先判断变量类型为 string
  // if (typeof g === 'string') {
  //   g1 = g
  // }
  /**
   * 方案二：类型断言，可以用来告诉解析器变量的实际类型
   * 语法：
   *  + 变量 as 类型
   *  + <类型>变量
  */
  g1 = g as string
  g1 = <string>g

  // void 类型表示空，以函数为例，表示没有返回值的函数
  function fn(): void {
    // console.log('hello')
    // return null
    return undefined
    // return true // 类型报错
  }

  // never 表示永远不会返回结果，一般用于输出报错信息的函数
  function fn2(): never {
    throw new Error('报错信息')
    // return null // 类型报错
    // return undefined // 类型报错
  }

  // object 表示一个 js 变量，一般不使用
  let h: object
  h = {}
  h = function() {}

  // {} 用来指定对象中可以包含哪些属性
  // 语法：{属性名: 属性值, 属性名: 属性值}
  // 在属性名后面加上 ?，表示属性是可选
  let h2: { name: string, age?: number }
  h2 = { name: '张三' }
  h2 = { name: '张三', age: 18 }

  // [propName: string]: any 表示任意类型的属性
  let h3: { name: string, [propName: string]: any }
  h3 = { name: '李四', age: 19, gender: '男' }

  /**
   * 设置函数结构的类型声明：
   *  语法：(形参: 类型, 形参: 类型 ...) => 类型
   */
  let h4: (a: number, b: number) => number
  h4 = function(n1, n2): number {
    return n1 + n2
  }

  /**
   * 设置数组类型
   *  语法：类型[] 或者 Array<类型>
   *
  */
  // string[] 表示字符串数组
  let j: string[]
  j = ['a', 'b', 'c']

  let j2: number[]
  j2 = [1, 2, 3]

  let j3: Array<string>
  j3 = ['1', '2', '3']

  /**
   * tuple 元组，元组就是固定长度的数组
   * 语法：[类型，类型，类型 ...]
  */
  let k: [string, string]
  k = ['1', '2']

  /**
   * enum 枚举
  */
  enum Gender {
    Male = 0,
    Female = 1
  }
  let l: { name: string, gender: Gender }
  l = {
    name: '张三',
    gender: Gender.Male,
  }
  // console.log('枚举值', l.gender === Gender.Male)

  // & 表示同时满足
  let m: { name: string } & { age: number }
  m = { name: '王五', age: 17 }

  // 类型别名
  type myType = 1 | 2 | 3
  let n: myType
  n = 1
  // n = 4 // 类型报错
})()
