import {on, off} from '../../utils/dom'
import {renderThumbStyle, BAR_MAP} from './util'

export default {
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  computed: {
    bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
    },
    wrap () {
      return this.$parent.wrap
    }
  },

  methods: {
    clickTrackHandler (e) {
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client])
      const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2)
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset])

      // 修改scroll-wrap的scrollTop属性值。当值发生变化时会触发scroll事件，从而更新thumb的位置。
      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
    },
    clickThumbHandler (e) {
      if (e.ctrlKey || e.button === 2) return

      this.startDrag(e)
      // getBoundingClientRect
      this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]))
      console.log(this[this.bar.axis], e.currentTarget[this.bar.offset], e[this.bar.client], e.currentTarget.getBoundingClientRect()[this.bar.direction])
    },
    startDrag (e) {
      e.stopImmediatePropagation()
      this.cursorDown = true

      on(document, 'mousemove', this.mouseMoveDocumentHandler)
      on(document, 'mouseup', this.mouseUpDocumentHandler)
      // 禁止选中select
      document.onselectstart = () => false
    },
    mouseMoveDocumentHandler (e) {
      if (this.cursorDown === false) return
      const prevPage = this[this.bar.axis]

      if (!prevPage) return

      const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1)
      const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage)
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset])

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
    },
    mouseUpDocumentHandler (e) {
      this.cursorDown = false
      this[this.bar.axis] = 0
      off(document, 'mousemove', this.mouseMoveDocumentHandler)
      document.onselectstart = null
    }
  },

  destroyed () {
    off(document, 'mouseup', this.mouseUpDocumentHandler)
  },

  // 支持jsx语法呀？
  render (h) {
    const {bar, size, move} = this

    return (
      <div
        class={['c-scrollbar__bar', 'is-' + bar.key]}
        onMousedown={this.clickTrackHandler}
      >
        <div
          ref="thumb"
          class="c-scrollbar__thumb"
          onMousedown={this.clickThumbHandler}
          style={ renderThumbStyle({size, move, bar}) }
        ></div>
      </div>
    )
  }
}