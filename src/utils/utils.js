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

export const isKorean = (text) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text)

export const valueEquals = (a, b) => {
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false

  if (a.length !== b.length) return false

  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }

  return true
}