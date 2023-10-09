(() => {
  let a: number = 111
  console.log(a)

  let x: any
  x = 1
  x = 'ok'

  // any 类型污染
  let y: number
  y = x
  y * 12
  y.toFixed() // 运行时暴露问题

  let x2: unknown
  x2 = 123
  // x2.toFixed() // 报错，不能直接调用 unknown 类型变量的方法和属性

  let y2: number
  // y2 = x2 // 报错
  // x = x2 // 正确
  // 再次，unknown 类型变量能够进行的运算是有限的，只能进行比较运算（运算符 ==、===、!=、!==、||、&&、?）、取反运算（运算符!）、typeof 运算符和 instanceof 运算符这几种，其他运算都会报错。

  // 通过「类型收缩」，将不确定的类型缩小为更为明确的类型才能使用类型的方法
  if (typeof x2 === 'number') {
    let r = x2 + 1 // 正确
  }

  // 由于不存在任何属于“空类型”的值，所以该类型被称为never，即不可能有这样的值。
  function errFn(): never {
    throw new Error('Error')
  }
  let v1: number = errFn()
  let v2: boolean = errFn()

  // 大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。
  let s1: string = 'hello'
  let s2: String = new String('oh')

  // 只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中
  const o1: Object = { foo: 0 }
  const o2: object = { foo: 1 }
  o1.toString()
  // o1.foo // 报错

  o2.toString()
  // o2.foo // 报错

  type A = { foo: number }
  type B = A & { bar: string }
  const o3: B = {
    foo: 123,
    bar: 'bar',
  }
  console.log(o3.bar)
})()
