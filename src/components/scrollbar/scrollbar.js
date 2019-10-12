import {addResizeListener, removeResizeListener} from '../../utils/resize-event'
import scrollbarWidth from '../../utils/scrollbar-width'
import {toObject} from '../../utils/utils'
import Bar from './bar'

export default {
  name: 'CScrollbar',
  componentName: 'CScrollbar',

  components: {
    Bar
  },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    }
  },
  computed: {
    wrap () {
      return this.$refs.wrap
    }
  },
  render (h) {
    let gutter = scrollbarWidth()
    let style = this.wrapStyle

    if (gutter) {
      const gutterWidth = `-${gutter}px`
      const gutterStyle = `margin-bottom: ${gutterWidth}; margin-right: ${gutterWidth};`

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle)
        style.marginRight = style.marginBottom = gutterWidth
      } else if (_.isString(this.wrapStyle)) {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }

    const view = h(this.tag, {
      class: ['c-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default)

    const wrap = (
      <div
        ref="wrap"
        style={style}
        onScroll={this.handleScroll}
        class={[this.wrapClass, 'c-scrollbar__wrap', gutter ? '' : 'c-scrollbar__wrap--hidden-default']}
      >
        { [view] }
      </div>
    )

    let nodes;
    if (!this.native) {
      nodes = ([
        wrap,
        <Bar
          move={this.moveX}
          size={this.sizeWidth}
        ></Bar>,
        <Bar
          vertical
          move={this.moveY}
          size={this.sizeHeight}
        ></Bar>
      ])
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={[this.wrapClass, 'c-scrollbar__wrap']}
          style={style}
        >{ [view] }</div>
      ])
    }

    return h('div', {class: 'c-scrollbar'}, nodes)
  },
  methods: {
    handleScroll () {
      const wrap = this.wrap

      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight)
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth)
    },
    update () {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap
      if (!wrap) return

      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight)
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth)

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : ''
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : ''
    }
  },
  mounted () {
    if (this.native) return

    this.$nextTick(this.update)
    // 滚动容器如果发生尺寸更新，则需要重新计算sizeHeight，即侧边滚动thumb的高度。
    !this.noresize && addResizeListener(this.$refs.resize, this.update)
  },
  beforeDestroy () {
    if (this.native) return

    !this.noresize && removeResizeListener(this.$refs.resize, this.update)
  }
}