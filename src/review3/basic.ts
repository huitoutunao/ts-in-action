interface Res {
  code: 10000 | 10001 | 10002;
  status: 'success' | 'fail';
  data: any;
}

/* 可以认为它其实就是快速生成一个符合指定类型，但没有实际值的变量，同时它也不存在于运行时中。 */
declare const res: Res

if (res.status === 'fail') {}

interface Tmp {
  user: { vip: true, expires: string } | { vip: false, promotion: string };
}

declare const tmp: Tmp
if (tmp.user.vip) {
  console.log(tmp.user.expires)
} else {
  console.log(tmp.user.promotion)
}

interface Foo {
  propA: boolean;
  propB: string;
  propC: number;
  propD: string;
}
type PropFoo = Foo[keyof Foo]
type Clone<T> = {
  [K in keyof T]: T[K]
}
type CloneFoo = Clone<Foo>

const nullVal = null
const func = (a: number, b: number) => {
  return a + b
}
/* 绝大部分情况下，typeof 返回的类型就是当你把鼠标悬浮在变量名上时出现的推导后的类型，并且是最窄的推导程度（即到字面量类型的级别）。 */
type Func = typeof func

/*
  + input 函数的某个参数
  + is 关键字 + 预期类型，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会被这个类型守卫调用方后续的类型控制流分析收集到。
*/
function isString(input: unknown): input is string {
  return typeof input === 'string'
}
function bar(input: string | number) {
  if (isString(input)) {
    (input).replace('a', 'b')
  }
}

interface Foo1 {
  foo: string;
  fooOnly: boolean;
  shared: number;
}
interface Bar1 {
  bar: string;
  barOnly: boolean;
  shared: number;
}
function handle(input: Foo1 | Bar1) {
  if ('foo' in input) {
    console.log(input.fooOnly)
  } else {
    console.log(input.barOnly)
  }
}

/* 泛型嵌套 */
interface IRes<T> {
  code: number;
  error?: string;
  data: T;
}
interface IUserProfileRes {
  name: string;
  age: number;
  avatar: string;
}
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return Promise.resolve({
    code: 0,
    data: {
      name: 'foo',
      age: 18,
      avatar: '',
    },
  })
}
