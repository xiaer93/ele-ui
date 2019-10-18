<template>
  <li
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
    class="c-select-dropdown__item"
    v-show="visible"
    :class="{
      'selected': itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': hover
    }"
  >
    <slot><span>{{ currentLabel }}</span></slot>
  </li>
</template>

<script>
import Emitter from '../../mixins/emitter'
import {escapeRegexpString} from '../../utils/utils'

export default {
  name: 'COption',
  componentName: 'COption',

  mixins: [Emitter],

  inject: ['select'],

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data(){
   return {
     index: -1,
     groupDisabled: false,
     visible: true,
     hitState: false,
     hover: false
   }
  },
  computed: {
    isObject () {
      return _.isPlainObject(this.value)
    },
    currentLabel () {
      return this.label || (this.isObject ? '' : this.value)
    },
    currentValue () {
      return this.value || this.label || ''
    },
    itemSelected () {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value)
      } else {
        return this.contains(this.select.value, this.value)
      }
    },
    // 此属性有何意义？
    itemReached () {
      if (this.select.multiple) {
        return !this.itemSelected && 
        (this.select.value || []).length > this.select.multipleLimit && this.select.multipleLimit > 0
      } else {
        return false
      }
    }
  },

  watch: {
    // 更新select组件选项值
    currentLabel() {
      if (!this.created && !this.select.remote) this.dispatch('CSelect', 'setSelected')
    },
    value (val, oldVal) {
      const {remote, valueKey} = this.select
      if (!this.created && !remote) {
        if (valueKey && _.isObject(val) && _.isObject(oldVal) && val[valueKey] === oldVal[valueKey]) {
          return
        }
        this.dispatch('CSelect', 'setSelected')
      }
    }
  },

  methods: {
    isEqual (a, b) {
      if (!this.isObject) {
        return a === b
      } else {
        const valueKey = this.select.valueKey
        return _.get(a, valueKey, null) === _.get(b, valueKey)
      }
    },
    contains (arr = [], target) {
      if (!this.isObject) {
        return arr && arr.includes(target)
      } else {
        const valueKey = this.select.valueKey
        return arr && arr.some(v => _.get(v, valueKey) === _.get(target, valueKey))
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
