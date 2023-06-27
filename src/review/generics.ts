(() => {
  // 泛型变量
  function identity<T>(msg: T): T {
    return msg
  }
  identity('myString') // 类型推断（常用）
  // identity<string>('myString') // 比较复杂的情况，可以指定类型参数

  // function loggingIdentity<T>(arg: Array<T>): Array<T> {
  function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
  }
  loggingIdentity([1, 2, 3]) // 传入 number[]
  loggingIdentity(['1', '2', '3']) // 传入 string[]
  const lists = [
    {
      name: 'hello',
      school: {
        address: '广东省',
      },
    }
  ]
  loggingIdentity(lists)

  // 在泛型约束中使用类型参数
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }
  const o1 = {a: 1, b: 2}
  getProperty(o1, 'a')
  // getProperty(o1, 'c')
  // 类型 "c" 的参数不能赋给类型 "a" | "b" 的参数。
})()
