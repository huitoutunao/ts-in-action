;(() => {
  // 函数类型表达式
  type GreetFunction = (s: string) => void
  function greeter(fn: GreetFunction) {
    fn('greet hello world')
  }
  function printToConsole(data: string) {
    console.log(data)
  }
  greeter(printToConsole)

  // 调用签名
  // 在 JavaScript 中，函数除了可以被调用，自己也是可以有属性值的。
  type DescriableFunction = {
    description: string
    (someArg: number): boolean // 返回类型使用 :
  }
  function doSomeThing(fn: DescriableFunction) {
    console.log(`${fn.description} returned ${fn(2)}`)
  }
  function fn0(n: number) {
    return n > 1
  }
  fn0.description = '我是函数 fn0' // 添加函数描述属性
  doSomeThing(fn0)

  /* 构造签名
  JavaScript 函数也可以使用 new 操作符调用，当被调用的时候，TypeScript 会认为这是一个构造函数 */
  type SomeConstructor = {
    new (s: string): object
  }
  function fn1(ctor: SomeConstructor) {
    return new ctor('hello')
  }

  // 泛型约束
  function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
    if (obj.length >= minimum) {
      return obj
    } else {
      // 返回 Type 类型，它不仅仅是符合约束的对象
      // return { length: minimum }

      // 正确做法
      return { ...obj, length: minimum }
    }
  }
  // const arr = minimumLength([1, 2, 3], 6)
  // console.log(arr.slice(0))

  // 可选参数
  function fn2(n?: number) {
    console.log(n?.toFixed())
  }
  fn2()
  fn2(1)
  fn2(undefined)

  // 回调中的可选参数
  // 当你写一个回调函数的类型时,不要写一个可选参数, 除非你真的打算调用函数的时候不传入实参
  function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i)
    }
  }
  myForEach([1, 2, 3], (a, i) => {
    console.log(a)
  })
})()
