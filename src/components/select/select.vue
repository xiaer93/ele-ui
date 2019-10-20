<template>
  <div
    class="c-select"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="c-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{'max-width': inputWidth - 32 + 'px', width: '100%'}"
    >
      <span v-if="collapseTags && selected.length">
        
      </span>
      
    </div>
    <c-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :disabled="selectDisabled"
      :readonly="readonly"
      :class="{'is-focus': visible}"
      :tabindex="(multiple && filterable) ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debounceOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debounceOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!shoeClose" :class="['c-select__caret', 'c-select-input__icon', 'c-icon-' + iconClass]"></i>
        <i v-if="showClose" class="c-select__caret c-input__icon c-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </c-input>
    <transition
      name="c-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy"
    >
      <c-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false"
      >
        <c-scrollbar
          tag="ul"
          wrap-class="c-select-dropdown__wrap"
          view-class="c-select-dropdown__list"
          ref="scrollbar"
          :class="{'is-empty': !allowCreate && query && filteredOptionsCount === 0}"
          v-show="options.length > 0 && !loading"
        >
          <c-option :value="query" created v-if="showNewOption"></c-option>
          <slot></slot>
        </c-scrollbar>
        <template
          v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0))"
        >
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="c-select-dropdown__empty">
            {{emptyText}}
          </p>
        </template>
      </c-select-menu>
    </transition>
  </div>
</template>

<script>
import CInput from '../input/input'
import CSelectMenu from './select-dropdown'
import CScrollbar from '../scrollbar/scrollbar'
import COption from './option'
import CTag from '../tag/tag'

import Emitter from '../../mixins/emitter'
import Focus from '../../mixins/focus'
import Clickoutside from '../../utils/clickoutside'
import {addResizeListener, removeResizeListener} from '../../utils/resize-event'
import { isKorean, valueEquals } from '../../utils/utils'

export default {
  name: '',
  name: 'CSelect',
  componentName: 'CSelect',

  components: {
    CInput,
    CSelectMenu,
    CScrollbar,
    COption,
    CTag
  },

  mixins: [Emitter, Focus('reference'), ],

  inject: {
    cForm: {
      default: ''
    },
    cFormItem: {
      default: ''
    }
  },

  provide () {
    return {
      'select': this
    }
  },

  directives: {
    Clickoutside
  },

  data () {
   return {
     options: [],
     cachedOptions: [],
     createdLabel: null,
     createdSelected: false,
     selected: this.multiple ? [] : {},
     inputLength: 20,
     inputWidth: 0,
     initialInputHeight: 0,
     cachedPlaceHolder: '',
     optionsCount: 0,
     filteredOptionsCount: 0,
     visible: false,
     softFocus: false,
     selectedLabel: '',
     hoverIndex: -1,
     query: '',
     previousQuery: null,
     inputHovering: false,
     currentPlaceholder: '',
     menuVisibleOnFocus: false,
     isOnComposition: false,
     isSilentBlur: false
   }
  },

  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    autoComplete: {
      type: String,
      validator (val) {
        return true
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default () {
        // 多语言
        return 'c.select.placeholder'
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    selectDisabled () {
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },
    placeholder (val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val
    },
    value (val, oldVal) {
      if (this.multiple) {

      }
      this.setSelected()
      if (this.filterable && !this.multiple) {
        this.inputLength = 201`
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch('CFormItem', 'c.form.change', val)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
