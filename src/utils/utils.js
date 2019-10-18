export function toObject(ary) {
  let res = Object.create(null)
  for (let i = 0; i < ary.length; ++i) {
    if (ary[i]) {
      extend(res, ary[i])
    }
  }
  return res
}

export function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key]
  }
  return to
}


// 浅层合并
export function merge (target) {
  for (let i = 1, j = arguments.length; i < j; ++i) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (_.has(source, prop)) {
        let value = source[prop]
        if (!_.isUndefined(value)) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

export function generateId () {
  return Math.floor(Math.random() * 10000)
}

export function getPropByPath () {

}

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')