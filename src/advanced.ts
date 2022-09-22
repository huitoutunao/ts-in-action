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
// 口诀
// 结构之间兼容：成员少的兼容成员多的
// 函数之间兼容：参数多的兼容参数少的

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

function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
function overload(a: any, b: any): any {}
// function overload(a: any, b: any, c: any): any {} // 不兼容，实现参数的个数多余目标函数的个数

// 枚举兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple = 3
let n: number = Fruit.Apple
// let color: Color.Red = Fruit.Apple // 不兼容，枚举与枚举之间不兼容

// 类兼容性
// 静态成员和构造函数是不参与比较
class A {
  constructor(p: number, b: number) {}
  id: number
  private name: string = ''
}
class B {
  static s = 1
  constructor(p: number) {}
  id: number
  private name: string = ''
}

let aa = new A(1, 2)
let bb = new B(1)
// aa = bb
// bb = aa

// 如果父类含有私有成员，那么它的子类和父类是可以相互兼容的
class AA extends A {}
let aaa = new AA(1, 3)
aa = aaa
aaa = aa

// 泛型兼容性
interface Empty<T> {
  // value: T // 导致下面的等式 obj1 = obj2 不兼容
}

let obj1: Empty<number> = {}
let obj2: Empty<string> = {}
obj1 = obj2

let log3 = <T>(x: T): T => {
  console.log('x')
  return x
}

let log4 = <U>(y: U): U => {
  console.log('y')
  return y
}

log3 = log4 // 没有指定泛型的具体类型，它们是兼容的

// 类型保护
// 定义：TypeScript 能够在特定的区块中保证变量属于某种确定的类型。可以在此区块中放心地引用此类型的属性，或者调用此类型的方法。
enum Type { Strong, Week }

class Java {
  helloJava() {
    console.log('hello java')
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('hello javascript')
  }
  javascript: any
}

// 类型保护函数
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // 1、instanceof
  // if (lang instanceof Java) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 2、in
  // 前提是分别给 Java 和 JavaScript 类添加属性 java 和 javascript
  // if ('java' in lang) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 3、typeof
  // 前提是给函数 getLanguage 添加参数 x
  // if (typeof x === 'string') {
  //   x.length
  // } else {
  //   x.toFixed(2)
  // }

  // 4、创建类型保护函数 isJava
  // if (isJava(lang)) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  return lang
}

// 高级类型：交叉类型与联合类型
// 交叉类型就是取并集
interface DogInterface {
  run(): void
}
interface CatInterface {
  jump(): void
}

let pet: DogInterface & CatInterface = {
  run() {},
  jump() {},
}

let aa1: number | string = '1' // 限定变量取值类型
let bb1: 'a' | 'b' | 'c' // 限定变量取值范围
let cc1: 1 | 2 | 3 // 限定变量取值范围

class Dogg implements DogInterface {
  run() {}
  eat() {}
}

class Catt implements CatInterface {
  jump() {}
  eat() {}
}
enum Master { Boy, Girl }
function getPet(master: Master) {
  // 对象联合类型，只能访问公有成员
  let pet = master === Master.Boy ? new Dogg() : new Catt()
  pet.eat()
  return pet
}

// 可区分的联合类型
interface Square {
  kind: 'square';
  size: number;
}
interface Retangle {
  kind: 'retangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  r: number;
}
type Shape = Square | Retangle | Circle
function area(s: Shape) {
  switch(s.kind) {
    case 'square':
      return s.size * s.size
    case 'retangle':
      return s.width * s.height
    case 'circle':
      return Math.PI * s.r ** 2
    default:
      return ((e: never) => { throw new Error(e) })(s)
  }
}
console.log(area({ kind: 'circle', r: 1 }))

// 索引类型
// keyof T
interface Obj {
  a: number;
  b: string;
}
let key: keyof Obj

// 索引访问操作符
// T[K]
let value: Obj['a']

// T extends U

let obj3 = {
  a: 1,
  b: 2,
  c: 3,
}
function getValue<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((item) => obj[item])
}
console.log(getValue(obj3, ['a', 'b']))
// console.log(getValue(obj3, ['e', 'f'])) // 不合法

// 映射类型
interface Obj4 {
  a: string;
  b: number;
  c: boolean;
}

// 同态类型
type ReadonlyObj4 = Readonly<Obj4>

type PartialObj4 = Partial<Obj4>

type PickObj4 = Pick<Obj4, 'a' | 'b'>

// 非同态类型
type RecordObj4 = Record<'x' | 'y', Obj4>

// 条件类型
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object';

type T1 = TypeName<string>
type T2 = TypeName<string[]>

// 命名空间
namespace Shape {
  export function square(x: number) {
    return x * x
  }
}
Shape.square(2)

