(() => {
  /* 属性修饰进阶-深层的属性修饰 */
  type DeepPartial<T extends object> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  }
  type DeepRequired<T extends object> = {
    [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
  }
  type DeepReadonly<T extends object> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
  }
  type DeepMutable<T extends object> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
  }

  type NonNullable<T> = T extends null | undefined ? never : T;
  type DeepNonNullable<T extends object> = {
    [K in keyof T]: T[K] extends object ? DeepNonNullable<T[K]> : NonNullable<T[K]>;
  }

  type Nullable<T> = T | null;
  type DeepNullable<T extends object> = {
    [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
  }

  /* 属性修饰进阶-基于已知属性的部分修饰，以及基于属性类型的部分修饰 */
  // 展平对象数据结构
  type Flatten<T> = {
    [KeyType in keyof T]: T[KeyType] extends object
      ? Flatten<T[KeyType]>
      : T[KeyType];
  } & {};
  type MarkPropsAsOptional<T extends object, K extends keyof T = keyof T> = Flatten<DeepPartial<Pick<T, K>> & Omit<T, K>>;
  type MarkPropsAsOptionalStruct = MarkPropsAsOptional<{
    foo: string;
    bar: number;
    baz: boolean;
  }, 'bar'>

  type MarkPropsAsRequired<
    T extends object,
    K extends keyof T = keyof T
  > = Flatten<Omit<T, K> & Required<Pick<T, K>>>;
  type MarkPropsAsReadonly<
    T extends object,
    K extends keyof T = keyof T
  > = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>;
  type MarkPropsAsMutable<
    T extends object,
    K extends keyof T = keyof T
  > = Flatten<Omit<T, K> & DeepMutable<Pick<T, K>>>;
  type MarkPropsAsNullable<
    T extends object,
    K extends keyof T = keyof T
  > = Flatten<Omit<T, K> & DeepNullable<Pick<T, K>>>;

  /* 结构工具类型进阶 */
  type FuncStruct = (...args: any[]) => any;
  type FunctionKeys<T extends object> = {
    [K in keyof T]: T[K] extends FuncStruct ? K : never;
  }[keyof T]
  type Tmp<T extends object> = {
    [K in keyof T]: T[K] extends FuncStruct ? K : never;
  };
  type Res = Tmp<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>;

  type ExpectedPropKeys<T extends object, ValueType> = {
    [K in keyof T]-?: T[K] extends ValueType ? K : never;
  }[keyof T]
  type FunctionKeysNew<T extends object> = ExpectedPropKeys<T, FuncStruct>;
  type ExpectedPropKeysRes = FunctionKeysNew<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>

  // 根据值类型筛选属性
  type PickByValueType<T extends object, ValueType> = Pick<T, ExpectedPropKeys<T, ValueType>>;
  type PickByValueTypeRes = PickByValueType<{ foo: string, bar: boolean, baz: number }, string | number>;

  // 根据值类型排除属性
  type FilteredPropKeys<T extends object, ValueType> = {
    [K in keyof T]-?: T[K] extends ValueType ? never : K;
  }[keyof T];
  type OmitByValueType<T extends object, ValueType> = Pick<T, FilteredPropKeys<T, ValueType>>;
  type OmitByValueTypeRes = OmitByValueType<{ foo: string, bar: boolean, baz: number }, string>;

  // ExpectedPropKeys 和 FilteredPropKeys 合并在一起
  type Conditional<Value, Condition, Resolved, Rejected> = [Value] extends [Condition] ? Resolved : Rejected;
  type StrictConditional<A, B, Resolved, Rejected, Fallback = never> =
    [A] extends [B]
      ? [B] extends [A]
        ? Resolved
        : Rejected
    : Fallback;
  type ValueTypeFilter<T extends object, ValueType, Positive extends boolean> = {
    [K in keyof T]-?: T[K] extends ValueType ? Conditional<Positive, true, K, never> : Conditional<Positive, true, never, K>;
  }[keyof T]
  type StrictValueTypeFilter<T extends object, ValueType, Positive extends boolean = true> = {
    [K in keyof T]-?: StrictConditional<
      ValueType,
      T[K],
      Positive extends true ? K : never,
      Positive extends true ? never : K,
      Positive extends true ? never : K
    >
  }[keyof T]
  type PickByValueType2<T extends object, ValueType> = Pick<T, ValueTypeFilter<T, ValueType, true>>;
  type OmitByValueType2<T extends object, ValueType> = Pick<T, ValueTypeFilter<T, ValueType, false>>;

  type StrictPickByValueType<T extends object, ValueType> = Pick<T, StrictValueTypeFilter<T, ValueType>>;
  type StrictOmitByValueType<T extends object, ValueType> = Pick<T, StrictValueTypeFilter<T, ValueType, false>>;
  type StrictPickByValueTypeRes = StrictPickByValueType<{ foo: 1, bar: 1 | 2, baz: 1 | 2 | 3 }, 1 | 2>;
  type StrictOmitByValueTypeRes = StrictOmitByValueType<{ foo: 1, bar: 1 | 2, baz: 1 | 2 | 3 }, 1 | 2>;

  /* 结构互斥的工具类型 */
  interface VIP {
    vipExpires: number;
  }
  interface CommonUser {
    promotionUsed: boolean;
  }
  interface Visitor {
    refererType: string;
  }
  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);
  type XORUser = XOR<VIP, CommonUser>;
  const user: XORUser = {
    vipExpires: 123,
    // promotionUsed: false,
  };

  type Tmp1 = Flatten<Without<VIP, CommonUser>>;
  type Tmp2 = Flatten<Tmp1 & CommonUser>;
  type Tmp3 = XOR<VIP, XOR<CommonUser, Visitor>>;
  type XORStruct = XOR<{}, {foo: string, bar: number}>;

  /* 集合工具类型进阶 */
  // 并集
  type Concurrence<A, B> = A | B;
  // 交集
  type Intersection<A, B> = A extends B ? A : never;
  // 差集
  type Difference<A, B> = A extends B ? never : A;
  // 补集
  type Complement<A, B extends A> = Difference<A, B>;

  // 使用更精确的对象类型描述结构
  type PlainObjectType = Record<string, any>;
  // 属性名并集
  type ObjectKeysConcurrence<T extends PlainObjectType, U extends PlainObjectType> = keyof T | keyof U;
  // 属性名交集
  type ObjectKeysIntersection<T extends PlainObjectType, U extends PlainObjectType> = Intersection<keyof T, keyof U>;
  // 属性名差集
  type ObjectKeysDifference<T extends PlainObjectType, U extends PlainObjectType> = Difference<keyof T, keyof U>;
  // 属性名补集
  type ObjectKeysComplement<T extends U, U extends PlainObjectType> = Complement<keyof T, keyof U>;

  // 对象层面交集
  type ObjectIntersection<T extends PlainObjectType, U extends PlainObjectType> = Pick<T, ObjectKeysIntersection<T, U>>;
  // 对象层面差集
  type ObjectDifference<T extends PlainObjectType, U extends PlainObjectType> = Pick<T, ObjectKeysDifference<T, U>>;
  // 对象层面补集
  type ObjectComplement<T extends U, U extends PlainObjectType> = Pick<T, ObjectKeysComplement<T, U>>;
  // 对象层面并集
  // 假设以 U 的同名属性类型优先
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 U 优先级更高)，再加上 U 比 T 多的部分即可
  type Merge<T extends PlainObjectType, U extends PlainObjectType> = ObjectDifference<T, U> & ObjectIntersection<U, T> & ObjectDifference<U, T>;
  // 假设要保证原对象优先级更高，那么只需要在交集处理中将 T 视为原集合，U 作为后传入的集合
  // T 比 U 多的部分，加上 T 与 U 交集的部分(类型不同则以 T 优先级更高)，再加上 U 比 T 多的部分即可
  type Assign<T extends PlainObjectType, U extends PlainObjectType> = ObjectDifference<T, U> & ObjectIntersection<T, U> & ObjectDifference<U, T>;
  // 实现不完全的并集，即使用对象 U 的属性类型覆盖对象 T 中的同名属性类型，但不会将 U 独特的部分合并过来
  type Override<T extends PlainObjectType, U extends PlainObjectType> = ObjectDifference<T, U> & ObjectIntersection<U, T>;
})()
