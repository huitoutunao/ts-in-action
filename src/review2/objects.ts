(() => {
  // 解构赋值
  const product = {
    id: '1',
    name: 'na',
    price: 10,
  }
  const {id, name, price}:{ id: string, name: string, price: number } = product

  const point: {
    x: number,
    y: number,
  } = {
    x: 1,
    y: 1,
    // z: 1, // 报错
  }

  const obj: {} = {}
  obj.toString()
})()
