// 数字枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
// 默认从 0 开始枚举
// console.log(Role.Reporter) // > 0
// console.log(Role.Developer) // > 1
// console.log(Role)

/**
 * enum Role {
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest
  }
 * 改变初始枚举值 Reporter = 1
 * console.log(Role.Reporter) // > 1
 * console.log(Role.Developer) // > 2
 *
*/

// 字符串枚举
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}

// console.log(Message.Success) // > 恭喜你，成功了

// 异构枚举
// 指数字枚举和字符串枚举混合（不建议使用）
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员
// Role.Reporter = 2 // 枚举成员值不允许修改
// 常量枚举：1、无初始值；2、对已有枚举成员的引用；3、常量表达式；
// 常量枚举是在编译时计算得出结果，以常量的形式显示在运行环境。
// 计算枚举：非常量的表达式，这些值不会在编译时计算，而会保留至运行阶段计算
enum Char {
  a,
  b = Char.a,
  c = 1 + 3,
  // compute
  d = Math.random(),
  e = '123'.length,
  f = 1 // 在 compute 后面的枚举成员须要初始值，所以不能直接写 f
}

// 常量枚举
// 常量枚举会在编译阶段被移除
// 作用：当不需要一个对象，而需要对象的值时，减少编译环境的代码量
const enum Month {
  Jan,
  Feb,
  Mar,
}
// 可以将这段代码放置官网编译下 https://www.typescriptlang.org/play
let month = [Month.Jan, Month.Feb, Month.Mar]

// 枚举类型
enum E { a, b }
enum F { a = 0, b = 0 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// e === f 不同类型，返回 false

let e1: E.a = 1
let e2: E.b
// e1 === e2 同上
let e3: E.a = 1
// console.log('enum', e1 === e3) // >true

let g1: G = G.b
let g2: G.a = G.a // 只能赋值 G.a
// console.log('g2', g2) // >apple
