/**
 * # 数据类型
 *
 * ## ES6 的数据类型
 * + Boolean
 * + Number
 * + String
 * + Array
 * + Function
 * + Object
 * + Symbol
 * + undefined
 * + null
 *
 * ## TypeScript 的数据类型
 * + Boolean
 * + Number
 * + String
 * + Array
 * + Function
 * + Object
 * + Symbol
 * + undefined
 * + null
 * + void
 * + any
 * + never
 * + 元组
 * + 枚举
 * + 高级类型
 *
 * ## 类型注解
 *
 * 作用：相当于强类型语言中的类型声明。
 * 语法：(变量/函数):type。
 *
 * @author huitoutunao 2022-08-10
*/

// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'

// bool = 123
// ->vscode 编辑器报错：不能将类型“number”分配给类型“boolean”

// num = 'abc'
// ->vscode 编辑器报错：不能将类型“string”分配给类型“number”

// str = 123
// ->vscode 编辑器报错：不能将类型“number”分配给类型“string”

// 数组
// arr1 与 arr2 的声明方式是等价的，指的是数组元素为数值类型
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]

// let arr2_f: Array<number> = [1, 2, 3, '4']
// ->vscode 编辑器报错：不能将类型“string”分配给类型“number”

let arr2_s: Array<number | string> = [1, 2, 3, '4'] // 成功。联合类型的语法就是在类型之间添加“|”

// 元组
// 限定数组元素的类型和长度
let tuple: [number, string] = [1, '2']

// let tuple_f: [number, string] = [1, '2', 3]
// ->vscode 编辑器报错：不能将类型“[number, string, number]”分配给类型“[number, string]”。源具有 3 个元素，但目标仅允许 2 个。

// 不推荐以下方法在开发中使用
// tuple.push(3)
// console.log(tuple) // >[1, "2", 3]
// tuple[2] // ->vscode 编辑器报错：长度为 "2" 的元组类型 "[number, string]" 在索引 "2" 处没有元素。

// 函数
// add 函数的返回值类型可以不写，通过 ts 类型推断可以得出为 number
let add = (x: number, y: number): number => x + y

// 此写法和上面等价，先定义函数类型，后写函数表达式
let compute: (x: number, y: number) => number
compute = (a, b) => a + b

// 对象
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3

// symbol
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2)

// undefined，null
// un 定义了 undefined 类型，只能赋值 undefined，其他值不被允许
let un: undefined = undefined

let nu: null = null

/**
 * num 变量是上面定义的 number 类型
 * num = null
 * num = undefined
 *
 * 默认情况下 vscode 会报错，使之成立需做如下操作：
 * + 配置 tsconfig 项 strictNullChecks = false
 * + 配置 num 为联合类型
*/

// void
// 无任何返回值的类型
let noReturn = (): void => {}

// any
// 任意赋值
let x: any
x = 1
x = '1'
x = [1]

// never
// 永远不会有返回值
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while(true) {}
}
