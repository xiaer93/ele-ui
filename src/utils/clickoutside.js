import {on} from './dom'

const nodeList = []
const ctx = '@@clickoutsideContext'

let startClick
let seed = 0

on(document, 'mousedown', e => (startClick = e))
on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
})

// v-clickoutside指令函数
function createDocumentHandler (el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode ||
        !vnode.context ||
        !mouseup.target ||
        !mousedown.target ||
        // el是数组吗？v-clickoutside指令可以传入数组el？？？
        el.contains(mouseup.target) ||
        el.contains(mousedown.target) ||
        el === mouseup.target ||
        (vnode.context.popperElm &&
         (vnode.context.popperElm.contains(mouseup.target) || vnode.context.popperElm.contains(mousedown.target))
        )
      ) return

    if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

/**
 * 
 * <div v-element-clickoutside="handleClose"></div>
 */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },
  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },

  unbind(el) {
    const index = nodeList.findIndex(v => v[ctx].id === el[ctx].id)
    if (index !== -1) nodeList.splice(index, 1)

    delete el[ctx]
  }
}