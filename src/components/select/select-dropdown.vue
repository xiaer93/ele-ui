<template>
  <div
    class="c-select-dropdown c-popper"
    :class="[{'is-multiple': $parent.multiple}, popperClass]"
    :style="{minWidth: minWidth}"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from '../../utils/vue-popper'

export default {
  name: 'CSelectDropdown',
  componentName: 'CSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    boundariesPadding: {
      default: 0
    },
    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        }
      }
    },
    visibleArrow: {
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data(){
   return {
     minWidth: ''
   }
  },
  computed: {
    popperClass () {
      return this.$parent.popperClass
    }
  },
  watch: {
    '$parent.inputWidth' () {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px'
    }
  },

  mounted () {
    // 引用popper-mixin的必要操作，指定referenceElm、popperElm！
    this.referenceElm = this.$parent.reference.$el
    this.$parent.popperElm = this.popperElm = this.$el
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>

<style lang="less" scoped>

</style>
