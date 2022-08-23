// 函数定义
function add0(x: number, y: number) {
  return x + y
}

let add1: (x: number, y: number) => number

type add2 = (x: number, y: number) => number

interface add3 {
  (x: number, y: number): number
}

// 必须传入 2 个数值类型的参数
// add0(1, 2)

// 如果第二个参数作为可选，需要这么定义类型。
// 注意：必选参数不能位于可选参数之后。
function add4(x: number, y?: number) {
  return y ? x + y : x
}
// add4(1) // => 通过
// add4(1, 2) // => 通过

// 赋予参数默认值
function add5(x: number, y = 1, z: number, q = 2) {
  // console.log(x, y, z, q) // >1,1,3,2
  return x + y + z + q
}
add5(1, undefined, 3)

// 剩余参数定义
function add6(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}
add6(1, 2, 3, 4, 5)

// 函数重载定义
// ts 编译回去寻找重载列表，优先匹配第一个合适的定义
function add7(...rest: number[]): number
function add7(...rest: string[]): string
function add7(...rest: any[]): any {
  const value = rest[0]
  if (typeof value === 'string') {
    return rest.join()
  }
  if (typeof value === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}

