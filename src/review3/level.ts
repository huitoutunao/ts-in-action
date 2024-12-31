/* 类型系统中的类型层级 */
type Result1 = 'foo' extends string ? 1 : 2; // 1
type Result2 = 1 extends number ? 1 : 2; // 1
type Result3 = true extends boolean ? 1 : 2; // 1
type Result4 = { name: string } extends object ? 1 : 2; // 1
type Result5 = { name: 'foo' } extends object ? 1 : 2; // 1
type Result6 = [] extends object ? 1 : 2; // 1
// *结论：字面量类型 < 对应的原始类型

type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = 'foo' extends 'foo' | 'o' | 'o' ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1
type Result10 = string extends string | false | number ? 1 : 2; // 1
// *结论：字面量类型 < 包含此字面量类型的联合类型，原始类型 < 包含此原始类型的联合类型

type Result11 = 'f' | 'o' | 'o' extends string ? 1 : 2; // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2; // 1
// *结论：同一基础类型的字面量联合类型 < 此基础类型

// *进一步得出结论：字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型
// 例子如下：
type Result13 = 'foo' extends 'foo' | '666'
  ? 'foo' | '666' extends string
    ? 2
    : 1
  : 0;

type Result14 = string extends String ? 1 : 2; // 1
type Result15 = String extends {} ? 1 : 2; // 1
type Result16 = {} extends object ? 1 : 2; // 1
type Result18 = object extends Object ? 1 : 2; // 1
// *结论：原始类型 < 原始类型对应的装箱类型 < Object 类型

type Result22 = Object extends any ? 1 : 2; // 1
type Result23 = Object extends unknown ? 1 : 2; // 1

type Result31 = any extends unknown ? 1 : 2;  // 1
type Result32 = unknown extends any ? 1 : 2;  // 1
// *结论：Object < any / unknown

type Result33 = never extends 'foo' ? 1 : 2; // 1
type Result34 = undefined extends 'foo' ? 1 : 2; // 2
type Result35 = null extends 'foo' ? 1 : 2; // 2
type Result36 = void extends 'foo' ? 1 : 2; // 2
// *结论：never < 字面量类型

// 类型层级链例子
type VerboseTypeChain = never extends 'foo'
  ? 'foo' extends 'foo' | 'bar'
  ? 'foo' | 'bar' extends string
  ? string extends {}
  ? string extends String
  ? String extends {}
  ? {} extends object
  ? object extends {}
  ? {} extends Object
  ? Object extends {}
  ? object extends Object
  ? Object extends object
  ? Object extends any
  ? Object extends unknown
  ? any extends unknown
  ? unknown extends any
  ? 8
  : 7
  : 6
  : 5
  : 4
  : 3
  : 2
  : 1
  : 0
  : -1
  : -2
  : -3
  : -4
  : -5
  : -6
  : -7
  : -8






