(() => {
  function hello(txt: string): void {
    console.log('hello ' + txt)
  }
  hello('world')

  type MyFunc = (arg0: number, arg1: number) => number
  const f0: MyFunc = (x, y) => x + y

  let f: (x: number) => number
  f = function(y: number) {
    return y
  }

  function add(x: number, y: number) {
    return x + y
  }
  const myAdd: typeof add = function(x, y) {
    return x + y
  }

  let add2: {
    (x: number, y: number): number
  }
  add2 = function(x, y) {
    return x + y
  }

  let foo: {
    (x: number): void;
    version: string;
  } = f2
  function f2(x: number) {
    console.log(x)
  }
  f2.version = '1,0'

  const repeat = (str: string, times: number): string => str.repeat(times)

  function greet(
    fn: (a: string) => void
  ): void {
    fn('world')
  }
  function fn1(txt: string) {
    console.log('@@', txt)
  }
  greet(fn1)

  // 函数重载
})()
