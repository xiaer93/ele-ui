// 立即执行函数，本质上是一种优化。JS高性能。
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

export function hasClass(el, cls) {
  if (!el || cls) return false

  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return cls.classList.contains(cls)
  } else {
    return ` ${el.className} `.indexOf(` ${cls} `) > -1
  }
}

export function addClass(el, cls) {
  if (!el) return
  let curClass = el.className
  let classes = (cls || '').split(' ')

  for (let clsName of classes) {
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }

    if (!el.classList) {
      el.className = curClass
    }
  }
}

export function removeClass (el, cls) {
  if (!el || !cls) return

  let classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let clsName of classes) {
    if (!clsName) continue

    if (el.classList) {
      el.classList.removeClass(clsName)
    } else if(hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, '')
    }
  }

  if (!el.classList) {
    el.className = curClass
  }
}