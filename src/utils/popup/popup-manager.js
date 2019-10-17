import {addClass, removeClass} from '../dom'

let hasInitZIndex = false
let zIndex = undefined

let hasModal = false
const getModal = function () {
    // 挂载在全局，一次只有一个modalDom被打开！！！
    let modalDom = PopupManager.modalDom
    if (modalDom) {
        hasModal = true
    } else {
        hasModal = false
        modalDom = document.createElement('div')
        PopupManager.modalDom = modalDom

        modalDom.addEventListener('touchmove', function (event) {
            event.preventDefault()
            event.stopPropagation()
        })

        modalDom.addEventListener('click', function () {
            PopupManager.doOnModalClick && PopupManager.doOnModalClick()
        })
    }

    return modalDom
}

const instances = Object.create(null)
const PopupManager = {
    modalFade: true,

    getInstance (id) {
        return instances[id]
    },
    register (id, instance) {
        if (id && instance) {
            instances[id] = instance
        }
    },
    nextZIndex () {
        return PopupManager.zIndex++
    },
    deregister (id) {
        if (id) {
            // 置为null，后删除
            instances[id] = null
            delete instances[id]
        }
    },

    modalStack: [],
    doOnModalClick () {
        const modalStack = PopupManager.modalStack
        const topItem = _.last(modalStack)
        if (!topItem) return

        const instance = PopupManager.getInstance(topItem.id)
        if (instance && instance.closeOnClickModal) {
            instance.close()
        }
    },
    openModal (id, zIndex, dom, modalClass, modalFade) {
        if (!id || _.isUndefined(zIndex)) return

        this.modalFade = modalFade

        const modalStack = this.modalStack

        for (let item of modalStack) {
            if (item.id === id) return
        }

        const modalDom = getModal()
        addClass(modalDom, 'v-modal')
        if (this.modalFade && !hasModal) {
            addClass(modalDom, 'v-modal-enter')
        }
        if (modalClass) {
            let classArr = modalClass.trim().split(/\s+/)
            classArr.forEach(v => addClass(modalDom, v))
        }
        // enter效果200ms之后移除！
        setTimeout(() => {
            removeClass(modalDom, 'v-modal-enter')
        })

        if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
            dom.parentNode.appendChild(modalDom)
        } else {
            document.body.appendChild(modalDom)
        }

        if (zIndex) {
            modalDom.style.zIndex = zIndex
        }
        modalDom.tabIndex = 0
        modalDom.style.display = ''

        this.modalStack.push({id, zIndex, modalClass})
    },
    closeModal (id) {
        const modalStack = this.modalStack
        const modalDom = getModal()

        if(modalStack.length > 0) {
            const topItem = _.last(modalStack)
            if (topItem.id === id) {
                if (topItem.modalClass) {
                    let classArr = topItem.modalClass.trim().split(/\s+/)
                    classArr.forEach(v => removeClass(modalDom, v))
                }

                modalStack.pop()
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = _.last(modalStack).zIndex
                }
            } else {
                for (let i = modalStack.length - 1; i >= 0; --i) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1)
                        break
                    }
                }
            }
        }

        if (modalStack.length === 0) {
            if (this.modalFade) {
                addClass(modalDom, 'v-modal-leave')
            }
            setTimeout(() => {
                // 最后一个元素特殊处理？
                if (modalStack.length === 0) {
                    if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
                    modalDom.style.display = 'none'
                    PopupManager.modalDom = undefined
                }
                removeClass(modalDom, 'v-modal-leave')
            })
        }
    }
}

Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get () {
        if (hasInitZIndex) {
            zIndex = zIndex || 2000
            hasInitZIndex = true
        }
        return zIndex
    },
    set (value) {
        zIndex = value
    }
})

function getTopPopup () {
    if (PopupManager.modalStack.length > 0) {
        const modalStack = PopupManager.modalStack
        const topPopup = _.last(modalStack)
        if (!topPopup) return
        const instance = PopupManager.getInstance(topPopup.id)

        return instance
    }
}

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        const topPopup = getTopPopup()

        if (topPopup && topPopup.closeOnClickModal) {
            topPopup.handleClose ? topPopup.handleClose() : (topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.closeOnClickModal())
        }
    }
})

export default PopupManager