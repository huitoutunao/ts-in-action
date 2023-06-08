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
})()
