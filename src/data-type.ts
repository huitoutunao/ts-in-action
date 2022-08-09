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
