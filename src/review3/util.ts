(() => {
  /* 工具类型 */

  /* 属性修饰工具类型 */
  type MyRequired<T> = {
    [P in keyof T]-?: T[P];
  }
  type MyRequiredRes = MyRequired<{ name?: string, age?: number }>;
  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
  }
  type MyReadonlyRes = MyReadonly<{ name: string, age: number }>;
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  }
  type MutableRes = Mutable<{ readonly name: string, age: number }>;

  /* 结构工具类型 */
  type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
  }
  type MyRecordRes1 = MyRecord<string | number, any>;
  type MyRecordRes2 = Record<string, unknown>;
  /* 字典 */
  type Dictionary<T> = {
    [index: string]: T;
  }
  type NumDictionary<T> = {
    [index: number]: T;
  }
  /* Pick、Omit */
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  }
  type MyPickRes = MyPick<{ name: string, age: number }, 'name'>;
  type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
  }
  type MyOmitRes = MyOmit<{ name: string, age: number }, 'age'>;

  /* 交集与差集 */
  type MyExtract<T, U> = T extends U ? T : never;
  type MyExtractRes = MyExtract<string | number | boolean, number | boolean>;
  type MyExclude<T, U> = T extends U ? never : T;
  type MyExcludeRes = MyExclude<string | number | boolean, number | boolean>;

  /* 模式匹配工具类型 */
  type FirstArrayItemType<T extends any[]> = T extends [infer P extends string, ...any[]] ? P : never;
  type FirstArrayItemTypeRes = FirstArrayItemType<[string, number, boolean]>; // string

  const demo = ['1', true, 9]
  type Res2 = typeof demo

  window.onerror = function (message, source, lineno, colno, error) {}
})()
