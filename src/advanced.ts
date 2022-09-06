/**
 * 类型检查机制
 * 定义：TypeScript 编译器在做类型检查时，所秉持的一些原则，以及表现出的一些行为。
 * 作用：辅助开发，提高开发效率。
 * + 类型推断
 * + 类型兼容性
 * + 类型保护
*/
/**
 * 类型推断
 * 不需要指定变量的类型（函数的返回值类型），TypeScript 可以根据某些规则自动地为其推断出一个类型。
 * + 基础类型推断
 * + 最佳通用类型推断
 * + 上下文类型推断
*/

// 基础类型推断
let a = 1
let b = [1, null]
let c = (x = 1) => x + 2
window.onkeydown = (event) => {
  console.log(event.target)
}

interface Foo {
  bar: number
}
let foo = {} as Foo
foo.bar = 1

// 类型兼容性
// 定义：当一个类型 y 可以被赋值给另一个类型 x 时，我们就可以说类型 x 兼容类型 y
//  x 兼容 y：x（目标类型）= y（源类型）

let s: string = 'a'
s = null // null 是字符型的子类型

// 接口兼容性
interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any;
}

let x1: X = {a: 1, b: 2}
let y1: Y = {a: 1, b: 2, c: 3}
x1 = y1 // 成员少的可以兼容成员多的；源类型成员必须包含目标类型成员；
// y1 = x1 // 不合法

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

// 1、参数个数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2) // 不合法

// 可选参数和剩余参数
let a1 = (p1: number, p2: number) => {}
let b1 = (p1?: number, p2?: number) => {}
let c1 = (...args: number[]) => {}
// 固定参数可以兼容可选参数和剩余参数
// 可选参数是不兼容固定参数和剩余参数，可通过配置 strictFunctionTypes = false 达到兼容效果
// 剩余参数可以兼容可选参数和固定参数

// 2、参数类型
let handler3 = (a: string) => {}
// hof(handler3) // 不合法，参数类型不一致

interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface Point2D {
  x: number;
  y: number;
}

// 函数参数可以相互赋值的情况下，称为函数参数的双向协变，允许一个精确的类型赋值给不那么精确的类型。
let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d
// p2d = p3d // 不兼容

// 3、返回值类型
let ff1 = () => ({name: 'jack'})
let gg1 = () => ({name: 'jack', location: 'Beijing'})
ff1 = gg1
// gg1 = ff1 // 不兼容
