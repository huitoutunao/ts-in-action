interface List {
  readonly id: number;
  name: string;
  // [x: string]: any; // 这种也可以解决传入多余字段
  age?: number; // 可选，非必须
}
interface Result {
  data: List[];
}
const render = function (result: Result) {
  result.data.forEach((item) => {
    console.log(item.id, item.name)
    if (item.age) {
      console.log(item.age)
    }
    // item.id++ // 只读属性不允许修改
  })
}
const result = {
  data: [
    {
      id: 0,
      name: 'foo',
    },
    {
      id: 1,
      name: 'bar',
      age: 18,
    },
  ],
}
render(result)

// 以上面为基础举个例子，后端接口返回这样的数据
// const result1 = {
//   data: [
//     {
//       id: 0,
//       name: 'foo',
//       // 返回数据多了这个字段，但 ts 编译不会报错
//       // 传入的对象满足接口的必要条件，是可以成立的，即使传入多余的字段
//       // 「一只鸟，如果看起来像鸭子，叫起来像鸭子，游起来像鸭子，那就可以把它当作鸭子」
//       sex: 'male',
//     },
//     {
//       id: 1,
//       name: 'bar',
//     },
//   ],
// }
// render(result1)

// 上面的变形写法如下
// render({
//   data: [
//     {
//       id: 0,
//       name: 'foo',
//       // vscode 编辑器报错
//       // 不能将类型“{ id: number; name: string; sex: string; }”分配给类型“List”
//       // 对象文字可以只指定已知属性，并且“sex”不在类型“List”中
//       sex: 'male',
//     },
//     {
//       id: 1,
//       name: 'bar',
//     },
//   ],
// } as Result) // 通过 as 断言修复上面报错

// 上面的接口字段都是固定，当不确定一个接口中有多少属性时，可以使用可索引类型的接口
// 数字索引
interface StringArray {
  [index: number]: string;
}
const chars: StringArray = ['1', '2', '3']

// 字符串索引
interface Names {
  [x: string]: string;
  // y: number; // 不允许
  [z: number]: string;
}
