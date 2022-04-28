// 可以继续遍历的类型
const objectToInit = ['Object', 'Array', 'Set', 'Map', 'Arguments']

// 判断类型函数
function isObject(o) {
  return o !== null && (typeof o === 'object' || typeof o === 'function')
}

// 判断具体类型函数
function getType(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

// 统一初始化函数
function initCloneTarget(target) {
  return new target.constructor()
}

// 拷贝Symbol
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
  // 或者
  // return Object(Symbol(target.description))
  // 或者
  // return Object(target.valueOf())
}

// 拷贝正则对象
function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new RegExp(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

// 拷贝函数
function cloneFunction(target) {
  // return eval(`(${target})`)
  // 或者
  return new Function(`return (${target})()`)
}

// 直接拷贝函数
function directCloneTarget(target, type) {
  let _constructor = target.constructor
  switch (type) {
    case 'String':
    case 'Boolean':
    case 'Number':
    case 'Error':
    case 'Date':
      return new _constructor(target.valueOf())
    // 或者
    // return new Object(target.valueOf())
    // 或者
    // return new Object(_constructor.prototype.valueOf.call(target)) 对于Date对象不适用
    case 'RegExp':
      return cloneReg(target)
    case 'Symbol':
      return cloneSymbol(target)
    case 'Function':
      return cloneFunction(target)
    default:
      return null
  }
}

function deepClone(target, map = new WeakMap()) {
  if (!isObject(target)) return target //基本类型或null直接返回

  const type = getType(target) //取得target具体类型

  let cloneTarget
  if (objectToInit.includes(type)) {
    cloneTarget = initCloneTarget(target) //初始化
  } else {
    return directCloneTarget(target, type)
  }

  // 解决循环引用
  if (map.has(target)) return map.get(target)
  else map.set(target, cloneTarget)

  // 处理map
  if (type === 'Map') {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map))
    })
  }

  // 处理Set
  else if (type === 'Set') {
    target.forEach((key, value) => {
      cloneTarget.add(deepClone(value, map))
    })
  }

  // 处理Array Object Arguments
  else if (type === 'Array' || type === 'Object' || type === 'Arguments') {
    Reflect.ownKeys(target).forEach((key) => {
      cloneTarget[key] = deepClone(target[key], map)
    })
  }
  return cloneTarget
}

module.exports = deepClone
