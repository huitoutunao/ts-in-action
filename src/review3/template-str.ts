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

  // interface Foo {
  //   name: string;
  //   age: number;
  //   job: Job;
  // }

  // type ChangeListener = {
  //   on: (change: `${keyof Foo}Changed`) => void;
  // }
  // let listener: ChangeListener;
  // listener.on('nameChanged');

  // 修改键名
  type CopyWithRename<T extends object> = {
    [K in keyof T as `modified_${string & K}`]: T[K];
  }
  interface Foo2 {
    name: string;
    age: number;
  }
  type CopiedFoo2 = CopyWithRename<Foo2>;
  type Heavy<T extends string> = `${Uppercase<T>}`;
  type Respect<T extends string> = `${Capitalize<T>}`;

  type HeavyName = Heavy<'lih'>; // "LIH"
  type RespectName = Respect<'lih'>; // "Lih"

  type ReverseName<Str extends string> = Str extends `${infer First} ${infer Last}` ? `${Capitalize<Last>} ${First}` : Str;
  type ReverseNameRes = ReverseName<'li h'>; // "H li"

  /* includes */
  type _Include<
    Str extends string,
    Search extends string
  > = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;
  type Include<Str extends string, Search extends string> = Str extends ''
    ? Search extends ''
      ? true
      : false
    : _Include<Str, Search>;
  type IncludeRes1 = Include<'li h', 'li'>; // true
  type IncludeRes4 = Include<' ', ''>; // true
  type IncludeRes5 = Include<'', ''>; // true
  /* trimStart：字符串边缘可能不止有一个空格！递归一下就好了 */
  type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
  /* trimEnd：字符串边缘可能不止有一个空格！递归一下就好了 */
  type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
  /* trim */
  type Trim<V extends string> = TrimLeft<TrimRight<V>>;
  /* Replace */
  type Replace<Str extends string, Search extends string, Replacement extends string> = Str extends `${infer Head}${Search}${infer Tail}` ? `${Head}${Replacement}${Tail}` : Str;
  type ReplaceRes1 = Replace<'你好呀', '呀', '大家好'>;
  type ReplaceRes2 = Replace<'你好呀', 'x', 'xx'>;
  /* ReplaceAll */
  type ReplaceAll<
    Str extends string,
    Search extends string,
    Replacement extends string
  > = Str extends `${infer Head}${Search}${infer Tail}`
    ? ReplaceAll<`${Head}${Replacement}${Tail}`, Search, Replacement>
    : Str;
  /* Split */
  type Split<Str extends string, Delimiter extends string> = Str extends `${infer Head}${Delimiter}${infer Tail}` ? [Head, ...Split<Tail, Delimiter>] : Str extends Delimiter ? [] : [Str];
  type SplitRes1 = Split<'f,o,99', ','>;
  type Delimiters = '-' | '_' | ' ';
  type SplitRes4 = Split<'f_o_o', Delimiters>; // ["f", "o", "o"]
  /* Join */
  type Join<List extends Array<string | number>, Delimiter extends string> =
    List extends []
    ? ''
    : List extends [string | number]
      ? `${List[0]}`
      : List extends [string | number, ...infer Rest]
        // @ts-expect-error
        ? `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
        : string;

  type JoinRes3 = Join<['f', 'o', 'o'], '-'>;
})()
