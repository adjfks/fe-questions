const deepClone = require('./deepClone.js')

test('deepClone array: ', () => {
  const array = [1, 2, 3, { property1: 'a' }, [1, 2]]
  expect(deepClone(array)).toEqual(array) //toEqual用于测试值相等
  expect(deepClone(array)).not.toBe(array) //toBe用于测试完全相等（深拷贝）
})

test('deepClone object: ', () => {
  const obj = {
    name: 'zs',
    age: 21,
    hobby: ['basketball', 'ice-cream', 'singing'],
    house: [
      {
        location: 'beijing',
        price: 200,
      },
      {
        location: 'shenzhen',
        price: 500,
      },
    ],
    wife: {
      name: 'lisa',
      age: 20,
    },
  }
  expect(deepClone(obj)).toEqual(obj) //toEqual用于测试值相等
  expect(deepClone(obj)).not.toBe(obj) //toBe用于测试完全相等（深拷贝），加上not就是不相等
})

test('deepClone circle: ', () => {
  const array = [1, 2, 3, { property1: 'a' }, [1, 2]]
  array.push(array)
  expect(deepClone(array)).toEqual(array) //toEqual用于测试值相等
  expect(deepClone(array)).not.toBe(array) //toBe用于测试完全相等（深拷贝）
})

test('final version of deepClone: ', () => {
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
    getName: function () {
      console.log(`名字是${this.name}`)
    },
    reg: /\d+/gi,
    error: new Error(),
    a: undefined,
    b: Symbol(),
    [Symbol()]: 123,
    c: NaN,
    d: Infinity,
    e: -Infinity,
  }
  obj.f = obj

  expect(deepClone(obj)).not.toBe(obj) //toBe用于测试完全相等（深拷贝），加上not就是不相等
})
