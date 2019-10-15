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
  return function (mouseup = {}, mouseup = {}) {
    if (!vnode ||
        !vnode.context ||
        !mouseup.target ||
        !mousedown.target ||
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

}