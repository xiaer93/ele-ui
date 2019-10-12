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