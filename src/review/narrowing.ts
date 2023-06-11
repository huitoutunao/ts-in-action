// 类型收窄
;(() => {
  function padLeft(padding: number | string, input: string) {
    if (typeof padding === 'number') {
      return new Array(padding + 1).join(' ') + input
    }

    return padding + input
  }
  console.log(padLeft(1, 'world'))

  function printAll(strs: string | string[] | null) {
    if (strs && typeof strs === 'object') {
      for (const s of strs) {
        // Object is possibly 'null'.
        console.log(s)
      }
    } else if (typeof strs === 'string') {
      console.log(strs)
    } else {
      // do nothing
    }
  }
  printAll(null)
})()
