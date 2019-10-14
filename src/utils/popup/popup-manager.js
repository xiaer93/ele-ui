import {addClass, removeClass} from '../dom'

let hasModal = false
const getModal = function () {
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
        if (this.modalFade && !hasModal) {
            
        }
    }
}