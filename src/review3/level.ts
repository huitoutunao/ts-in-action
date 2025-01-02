(() => {
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

  /* 函数类型判断 */
  type Func = (...args: any[]) => any;
  type FunctionConditionType<T extends Func> = T extends (...args: any[]) => string ? 'A string return func!' : 'A non-string return func!';
  type StringResult = FunctionConditionType<() => string>;
  type NonStringResult = FunctionConditionType<() => number>;

  /* infer 关键字 */
  type FunctionConditionType2<T extends Func> = T extends (...args: any[]) => infer R ? R : never;
  type StringResult2 = FunctionConditionType2<() => string>;
  type NonStringResult2 = FunctionConditionType2<() => number>;

  type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;
  type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
  type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

  /* 提取首尾两个 */
  type ExtractStartAndEnd<T extends any[]> = T extends [infer Start, ...any[], infer End] ? [Start, End] : T
  type ExtractStartAndEndResult1 = ExtractStartAndEnd<[1, 2, 3]>; // [1, 3]

  /* 调换首尾两个 */
  type SwapStartAndEnd<T extends any[]> = T extends [infer Start, ...infer Left, infer End] ? [End, ...Left,  Start] : T;
  type SwapStartAndEndResult1 = SwapStartAndEnd<[1, 2, 3]>; // [3, 2, 1]

  /* 调换开头两个 */
  type SwapFirstTwo<T extends any[]> = T extends [infer Start1, infer Start2, ...infer Left] ? [Start2, Start1, ...Left] : T;
  type SwapFirstTwoResult1 = SwapFirstTwo<[1, 2, 3]>; // [2, 1, 3]

  /* 从数组到联合类型 */
  type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;
  type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
  type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
  type ArrayItemTypeResult3 = ArrayItemType<[number, string]>; // number | string
  type ArrayItemTypeResult4 = ArrayItemType<(number | string)[]>; // number | string

  /* 提取对象的属性类型 */
  type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;
  type PropTypeResult1 = PropType<{ name: string }, 'name'>;
  type PropTypeResult2 = PropType<{ name: string, age: number }, 'name' | 'age'>;

  /* 反转键名与键值 */
  type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V> ? Record<V & string, K> : never;
  type ReverseKeyValueResult1 = ReverseKeyValue<{ key: 'value' }>;

  /* infer 结构还可以是 Promise 结构 */
  type PromiseValue<T> = T extends Promise<infer R> ? R : T;
  type PromiseValueResult1 = PromiseValue<Promise<number>>; // number
  type PromiseValueResult2 = PromiseValue<number>; // number，但并没有发生提取

  /* 递归嵌套深度 */
  type PromiseValue2<T> = T extends Promise<infer V> ? PromiseValue2<V> : T;
  type PromiseValueResult3 = PromiseValue2<Promise<Promise<boolean>>>;

  /* 分布式条件类型 */
  /* 起作用的条件：首先，你的类型参数需要是一个联合类型。其次，类型参数需要通过泛型参数的方式传入，而不能直接进行条件类型判断。最后，条件类型中的泛型参数不能被包裹。 */
  /* 得出结果是：对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上。 */
  type Naked<T> = T extends boolean ? 'Y' : 'N';
  type NakedRes1 = Naked<number | boolean>; // "N" | "Y"

  /* 需要注意的是，我们并不是只会通过裸露泛型参数，来确保分布式特性能够发生。在某些情况下，我们也会需要包裹泛型参数来禁用掉分布式特性。最常见的场景也许还是联合类型的判断，即我们不希望进行联合类型成员的分布判断，而是希望直接判断这两个联合类型的兼容性判断 */
  type NoDistribute<T> = T & {};
  type Wrapped<T> = NoDistribute<T> extends boolean ? 'Y' : 'N';
  type WrappedRes1 = Wrapped<number | boolean>; // N
  type WrappedRes2 = Wrapped<true | false>; // Y
  type WrappedRes3 = Wrapped<true | false | 599>; // N
})()



