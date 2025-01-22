(() => {
  interface Subject {
    /* 科目编号 */
    id: number;
    /* 科目名称 */
    name: string;
    /* 科目分数 */
    score: number;
  }
  interface Student {
    /* 学生编号 */
    id: number;
    /* 学生姓名 */
    name: string;
    /* 学生英文名 */
    en: string;
    /* 学生年龄 */
    age: number;
    /* 学生性别 */
    gender: string;
    /* 学生年级 */
    grade: string;
    /* 学生班级 */
    classes: string;
    /* 考试科目 */
    subject: Subject[];
  }

  /* 练习 */
  const school: Student[] = [
    {
      id: 1,
      name: '张三',
      en: 'zhangsan',
      age: 18,
      gender: '男',
      grade: '高一',
      classes: '1班',
      subject: [
        {
          id: 1,
          name: '语文',
          score: 80
        },
        {
          id: 2,
          name: '数学',
          score: 90,
        },
      ]
    },
    {
      id: 2,
      name: '李四',
      en: 'lisi',
      age: 19,
      gender: '女',
      grade: '高二',
      classes: '2班',
      subject: [
        {
          id: 1,
          name: '语文',
          score: 55,
        },
        {
          id: 2,
          name: '数学',
          score: 50,
        },
      ]
    },
    {
      id: 3,
      name: '王五',
      en: 'wangwu',
      age: 20,
      gender: '男',
      grade: '高三',
      classes: '3班',
      subject: [
        {
          id: 1,
          name: '语文',
          score: 70,
        },
        {
          id: 2,
          name: '数学',
          score: 80,
        },
      ]
    },
  ]

  const demo1 = school.filter(item => item.subject.every(sub => sub.score >= 60))
  console.log(demo1)

  const demo2 = school.map(item => {
    const copy = { ...item }
    if (item.id === 3) copy.name = '赵六'
    return copy
  })
  console.log(demo2)

  const demo3 = school.reduce((acc, cur) => {
    acc += cur.subject.reduce((acc, cur) => acc + cur.score, 0)
    return acc
  }, 0)
  console.log(demo3)

  function greeting(name: string): string {
    return `Hello, ${name}`
  }
  const demo4 = greeting(school[0].name)
  console.log(demo4)

  function printName(): void {
    school.forEach(item => {
      const n = item.en.toLocaleUpperCase()
      console.log(n)
    })
  }
  printName()

  /**
   * Promise all
   * 等待所有 Promise 都完成后，返回一个新的 Promise 对象，该对象 resolve 为一个数组，数组的元素为每个 Promise resolve 的值。
   * 如果其中一个 Promise reject，则返回的 Promise 对象 reject。
   */
  const p1: Promise<string> = new Promise((resolve) => resolve('Promise 1'))
  const p2: Promise<string> = new Promise((resolve) => resolve('Promise 2'))
  const p3: Promise<string> = new Promise((resolve) => resolve('Promise 3'))
  const p4: Promise<string> = new Promise((resolve, reject) => reject('Promise error 4'))
  const result = Promise.all([p1, p2, p3, p4])
  result
    .then(res => {
      console.log({res1: res})
    })
    .catch(err => {
      console.log({err1: err})
    })

  /**
   * Promise allSettled
   * 等待所有 Promise 都完成后，返回一个新的 Promise 对象，该对象 resolve 为一个数组，数组的元素为每个 Promise 的状态。
   * 如果其中一个 Promise reject，则返回的 Promise 对象 resolve。
   */
  const p5: Promise<string> = new Promise((resolve) => resolve('Promise 5'))
  const p6: Promise<string> = new Promise((resolve, reject) => reject('Promise error 6'))
  const result2 = Promise.allSettled([p5, p6])
  result2.then(res => {
    console.log({res2: res})
  })

  /**
   * Promise any
   * 等待所有 Promise 都完成后，返回一个新的 Promise 对象，该对象 resolve 为第一个 Promise resolve 的值。
   * 如果所有 Promise 都 reject，则返回的 Promise 对象 reject。
   */
  const p7: Promise<string> = new Promise((resolve, reject) => reject('Promise error 7'))
  const p8: Promise<string> = new Promise((resolve, reject) => reject('Promise error 8'))
  const p9: Promise<string> = new Promise((resolve, reject) => resolve('Promise 9'))
  const result3 = Promise.any([p7, p8, p9])
  result3
    .then(res => {
      console.log({res3: res})
    })
    .catch(err => {
      console.log({err3: err})
    })

  const p10: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Promise 10')
    }, 3000)
  })
  const p11: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Promise error 11')
    }, 2000)
  })
  const result4 = Promise.race([p10, p11])
  result4.then(res => {
    console.log({res4: res})
  })
  .catch(err => {
    console.log({err4: err})
  })
})()
