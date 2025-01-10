// @ts-nocheck 以下代码均不会抛出错误

/* import foo from 'pkg';
const res = foo.handler();
// .d.ts 声明文件
declare module 'pkg' {
  const handler: () => boolean;
} */

/* declare module 'pkg2' {
  const handler: () => boolean;
  export default handler; // 默认导出
}

import bar from 'pkg2';
bar(); */

/*
// 导入一个 .md 文件
// index.ts
import raw from './note.md';

const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);

// declare.d.ts
declare module '*.md' {
  const raw: string;
  export default raw;
} */

/*
对于非代码文件的导入，更常见的其实是 .css、.module.css、.png 这一类，但基本语法都相似，我们在后面还会见到更多。

总结一下，declare module 通常用于为没有提供类型定义的库进行类型的补全，以及为非代码文件提供基本类型定义。
*/

(() => {
  /* 类型工程 */

  /* 类型工程-类型指令 */
  // @ts-ignore
  const name1: string = 666;
  // @ts-expect-error
  const name2: string = 666;
  // @ts-expect-error 错误使用此指令，报错
  const age1: number = 666;

  const name3: string = 666;
  const age2: number = 'foo';
})()
