import PopupManager from "./popup-manager";
import Vue from 'vue';
import getScrollBarWidth from '../scrollbar-width'
import { merge } from "../utils";
import { hasClass, getStyle, addClass, removeClass } from "../dom";

let isSeed = 0
let scrollBarWidth = undefined
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  beforeMount () {
    this._popupId = `popup-` + isSeed++;
    PopupManager.register(this._popupId, this)
  },
  beforeDestroy () {
    PopupManager.deregister(this._popupId)
    PopupManager.closeModal(this._popupId)
  },

  data () {
    return {
      opened: false,
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false
    }
  },
  
  watch: {
    visible (val) {
      if (val) {
        if (this._opening) return
        if (!this.rendered) {
          Vue.nextTick(() => {
            this.oepn()
          })
        } else {
          this.open()
        }
      } else {
        this.close()
      }
    }
  },

  methods: {
    open (options) {
      if (!this.rendered) {
        this.rendered = true
      }

      const props = merge({}, this.$props || this, options)
      if (this._closeTimer) {
        clearTimeout(this._closeTimer)
        this._closeTimer = null
      }
      clearTimeout(this._openTimer)

      const openDelay = _.toNumber(props.openDelay)
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null
          this.doOpen(props)
        })
      } else {
        this.doOpen(props)
      }
    },
    close () {
      if (this.willClose && !this.willClose()) return

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer)
        this._openTimer = null
      }
      clearTimeout(this._closeTimer)

      const closeDelay = _.toNumber(this.closeDelay)

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null
          this.doClose()
        }, closeDelay)
      } else {
        this.doClose()
      }
    },

    doOpen (props) {
      if (this.willOepn && !this.willOepn()) return
      if (this.opened) return

      this._opening = true

      const dom = this.$el
      const modal = props.modal
      const zIndex = props.zIndex
      if (zIndex) {
        PopupManager.zIndex = zIndex
      }

      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId)
          this._closing = false
        }
        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade)
        if (props.lockScroll) {
          this.withoutHiddenClass = !hasClass(document.body, 'c-popup-parent--hidden')
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight
            this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10)
          }
          scrollBarWidth = getScrollBarWidth()
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
          let bodyOverflowY = getStyle(document.body, 'overflowY')
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
            document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px'
          }
          addClass(document.body, 'c-popup-parent--hidden')
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute'
      }

      dom.style.zIndex = PopupManager.nextZIndex()
      this.opened = true

      this.onOpen && this.onOpen()

      this.doAfterOpen()
    },

    doClose () {
      this._closing = true

      this.onClose && this.onClose()

      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200)
      }

      this.opened = false
      this.doAfterClose()
    },

    doAfterOpen () {
      this._opening = false
    },
    doAfterClose () {
      PopupManager.closeModal(this._popupId)
      this._closing = false
    },
    restoreBodyStyle () {
      if (this.modalClass && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight
        removeClass(document.body, 'c-popup-parent--hidden')
      }
      this.withoutHiddenClass = true
    }
  }
}

export {
  PopupManager
}