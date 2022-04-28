test('at least node@17.0.0 can use structuredClone', () => {
  let obj = {
    name: '小明',
    age: 24,
    male: true,
    birthday: new Date('1998-04-21'),
    skills: ['唱', '跳', 'rap', '篮球'],
    classmate: [
      {
        name: '小红',
        age: 24,
      },
      {
        name: '小张',
        age: 24,
      },
    ],
    map: new Map([['a', 1, 'b', 2]]),
    set: new Set([1, 2, 3, 4, 5]),
    // getName: function () {
    //   console.log(`名字是${this.name}`)
    // },//函数不能克隆
    reg: /\d+/gi,
    error: new Error(),
    a: undefined,
    // b: Symbol(),
    // [Symbol()]: 123, //Symbol不能被克隆
    c: NaN,
    d: Infinity,
    e: -Infinity,
  }
  obj.f = obj

  // expect(structuredClone(obj)).toEqual(obj)
  expect(structuredClone(obj)).not.toBe(obj) //toBe用于测试完全相等（深拷贝），加上not就是不相等
})
