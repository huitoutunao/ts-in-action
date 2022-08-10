// 数字枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
// 默认从 0 开始枚举
console.log(Role.Reporter) // > 0
console.log(Role.Developer) // > 1
// console.log(Role)

/**
 * enum Role {
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest
  }
 * 改变初始枚举值 Reporter = 1
 * console.log(Role.Reporter) // > 1
 * console.log(Role.Developer) // > 2
 *
*/

// 字符串枚举
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}

console.log(Message.Success) // > 恭喜你，成功了

// 异构枚举
// 指数字枚举和字符串枚举混合（不建议使用）
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员
// Role.Reporter = 2 // 枚举成员值不允许修改
enum Char {}
