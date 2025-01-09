(() => {
  type Difference<A, B> = A extends B ? never : A;

  /* 模板字符串类型 */
  type World = 'World';
  type Greeting = `Hello ${World}`; // "Hello World"

  type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;
  type Greet1 = Greet<"linbudu">; // "Hello linbudu"
  type Greet2 = Greet<599>; // "Hello 599"
  type Greet3 = Greet<true>; // "Hello true"
  type Greet4 = Greet<null>; // "Hello null"
  type Greet5 = Greet<undefined>; // "Hello undefined"
  type Greet6 = Greet<0x1fffffffffffff>; // "Hello 9007199254740991"

  // 应用场景
  type Version = `${number}.${number}.${number}`;
  const v1: Version = '1.1.0';
  // X 类型 "1.0" 不能赋值给类型 `${number}.${number}.${number}`
  // const v2: Version = '1.0';
  type Brand = 'iphone' | 'xiaomi' | 'honor';
  type Memory = '16G' | '64G';
  type ItemType = 'official' | 'second-hand';
  type SKU = `${Brand}-${Memory}-${ItemType}`;
})()
