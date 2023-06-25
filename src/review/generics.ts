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
})()
