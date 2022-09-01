// 泛型
function log<T>(value: T): T {
  console.log(value)
  return value
}

log<string[]>(['a', 'b'])

// 类型别名与接口定义等价
// type log = <T>(value: T) => T
// let myLog: log = log

// 类型接口
// T 只约束当前的类型
// interface Log {
//   <T>(value: string): T
// }

// T 约束整个接口的类型
// T = string 指定默认类型
// 如果不指定 T 的默认类型，那么使用时须指定
// let myLog: Log<number> = log
// interface Log<T = string> {
//   (value: string): T
// }
// let myLog: Log = log
// myLog('m')

// 泛型类
class Log<T> {
  // 注意：泛型不能对 static 静态成员使用
  run(value: T) {
    console.log(value)
    return value
  }
}
let log1 = new Log<number>()
log1.run(1)
let log2 = new Log()
log2.run('1') // 合法
log2.run(1) // 合法

// 类型约束
interface Len {
  length: number;
}
function clog<T extends Len>(value: T): T {
  console.log(value, value.length)
  return value
}
clog([1, 2]) // 参数具有 length 属性
clog('123') // 参数具有 length 属性

/**
 * 总结
 * + 函数和类可以轻松地支持多种类型，增强程序的扩展性
 * + 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
 * + 灵活控制类型之间的约束
*/
