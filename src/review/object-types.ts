(() => {
  // 对象类型

  // readonly 属性
  // 不过使用 readonly 并不意味着一个值就完全是不变的，亦或者说，内部的内容是不能变的。readonly 仅仅表明属性本身是不能被重新写入的。
  interface Home {
    readonly resident: {
      name: string
      age: number
    }
  }

  function visitForBirthday(home: Home) {
    console.log(`Happy birthday ${home.resident.name}!`)
    home.resident.age++
  }

  function evict(home: Home) {
    // 无法为 resident 赋值，因为它是只读属性。
    // home.resident = {
    //   name: 'Tom',
    //   age: 18,
    // }
  }

  // 索引签名
})()
