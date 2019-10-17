<template>
  <transition name="c-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="c-autocomplete-suggestion c-popper"
      :class="{'is-loading': !parent.hideLoading && parent.loading}"
      :style="{width: dropdownWidth}"
      role="region"
    >
      <c-scrollbar
        tag="ul"
        wrap-class="c-autocomplete-suggestion__wrap"
        view-class="c-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading"><i class="c-icon-loading"></i></li>
        <slot v-else></slot>
      </c-scrollbar>
    </div>
  </transition>
</template>

<script>
import Popper from '../../utils/vue-popper'
import Emitter from '../../mixins/emitter'
import CScrollbar from '../scrollbar/scrollbar'

export default {
  name: 'CAutocompleteSuggestions',
  componentName: 'CAutocompleteSuggestions',

  mixins: [Popper, Emitter],
  components: {
    CScrollbar
  },

  data(){
   return {
     parent: this.$parent,
     dropdownWidth: ''
   }
  },
  props: {
    options: {
      default () {
        return {
          gpuAcceleration: false
        }
      }
    },
    id: String
  },
  methods: {
    select(item) {
      this.dispatch('CAutocomplete', 'item-click', item)
    }
  },
  updated () {
    this.$nextTick(v => {
      this.popperJS && this.updatePopper()
    })
  },
  mounted () {
    // hack操作？符合要求吗？
    // 设定popper的dom元素
    this.$parent.popperElm = this.popperElm = this.$el
    this.referenceElm = this.$parent.$refs.input.$refs.input

    this.referenceList = this.$el.querySelector('.c-autocomplete-suggestion__list')
    this.referenceList.setAttribute('role', 'listbox')
    this.referenceList.setAttribute('id', this.id)
  },
  created () {
    this.$on('visible', (val, inputWidth) => {
      this.dropdownWidth = inputWidth + 'px'
      this.showPopper = val
    })
  }
}
</script>

<style lang="less" scoped>

</style>
