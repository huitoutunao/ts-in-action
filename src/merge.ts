// 声明合并

// 接口的声明合并
// 1、这里出现了函数重载，它们的执行顺序是同一接口定义的按照书写顺序执行，写在最下面的接口优先执行，从下往上。即接口外从下往上，接口内从上到下。
// interface AAA {
//   x: number;
//   foo(bar: number): number; // 3
// }
// interface AAA {
//   y: number;
//   foo(bar: string): string; // 1
//   foo(bar: number[]): number; // 2
// }

// 2、这里的函数重载，出现了类型字面量，因此类型字面量的函数优先级较高，且遵循最下面的接口定义优先级高于上面的接口，其他的还是按照上面的约定。
interface AAA {
  x: number;
  foo(bar: number): number; // 5
  foo(bar: 'a'): number; // 2
}
interface AAA {
  y: number;
  foo(bar: string): string; // 3
  foo(bar: number[]): number; // 4
  foo(bar: 'b'): number; // 1
}

let aaa1: AAA = {
  x: 1,
  y: 2,
  foo(bar: any) {
    return bar
  }
}
