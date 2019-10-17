<template>
  <!-- 基于c-input创建的高级组件 -->
  <div
    class="c-autocomplete"
    v-clickoutside="close"
    role="combobox"
  >
    <c-input
      ref="input"
      v-bind="[$props, $attrs]"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
    >
      <!-- 透传插槽 -->
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </c-input>
    <c-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestions"
      :placement="placement"
      :id="id"
    >
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{'highlighted': highlightedIndex === index}"
        @click="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
      >
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </c-autocomplete-suggestions>
  </div>
</template>

<script>
import CInput from '../input/input'
import Clickoutside from '../../utils/clickoutside'
import CAutocompleteSuggestions from './autocomplete-suggestion'
import Emitter from '../../mixins/emitter'
import Focus from '../../mixins/focus'
import {generateId} from '../../utils/utils'


export default {
  name: 'CAutocomplete',
  componentName: 'CAutocomplete',

  components: {
    CInput,
    CAutocompleteSuggestions
  },

  mixins: [Emitter, Focus('input'), ],

  inheritAttrs: false,

  directives: {Clickoutside},

  props: {
    valueKey: {
      type: String,
      default: 'value'
    },
    popperClass: String,
    popperOptions: Object,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    name: String,
    size: String,
    value: String,
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean,
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    customItem: String,
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
    label: String,
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    hideLoading: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    suggestionVisible () {
      const suggestions = this.suggestions
      let isValidData = Array.isArray(suggestions) && suggestions.length > 0
      return (isValidData || this.loading) && this.activated
    },
    id () {
      return `c-autocomplete-${generateId()}`
    }
  },

  watch: {
    suggestionVisible (val) {
      const $input = this.getInput()
      if ($input) {
        this.broadcast('CAutocompleteSuggestions', 'visible', [val, $input.offsetWidth])
      }
    }
  },

  data () {
   return {
     activated: false,
     suggestions: [],
     loading: false,
     highlightedIndex: -1,
     suggestionDisabled: false
   }
  },
  created () {
    this.debouncedGetData = _.debounce(this.getData, this.debounce)
  },
  mounted () {
    this.$on('item-click', item => {
      this.select(item)
    })
    const $input = this.getInput()
    $input.setAttribute('role', 'textbox')
  },
  beforeDestroy () {
    this.$refs.suggestions.$destroy()
  },
  methods: {
    highlight (index) {
      if (!this.suggestionVisible || this.loading) return

      if (index < 0) {
        this.highlightedIndex = -1
        return
      }

      if (index >= this.suggestions.length) {
        index = this.suggestions.length - 1
      }

      const suggestion = this.$refs.suggestions.$el.querySelector('.c-autocomplete-suggestion__wrap')
      const suggestionList = suggestions.querySelectorAll('.c-autocomplete__list li')

      let highlightItem = suggestionList[index]
      let scrollTop = suggestion.scrollTop
      let offsetTop = highlightItem.offsetTop

      if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
        suggestion.scrollTop += highlightItem.scrollHeight
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= highlightItem.scrollHeight
      }

      this.highlightedIndex = index
      const $input = this.getInput()
      // $input.setAttribute()
    },
    handleKeyEnter(event) {
      if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
        event.preventDefault()
        this.select(this.suggestions[this.highlightedIndex])
      } else if (this.selectWhenUnmatched) {
        this.$emit('select', {value: this.value})
        this.$nextTick(v => {
          this.suggestions = []
          this.highlightedIndex = 1
        })
      }
    },
    handleChange (value) {
      this.$emit('input', value)
      this.suggestionDisabled = false
      if (!this.triggerOnFocus && !value) {
        this.suggestionDisabled = true
        this.suggestions = []
        return
      }
      this.debouncedGetData(value)
    },
    handleFocus (event) {
      this.activated = true
      this.$emit('focus', event)
      if (this.triggerOnFocus) {
        this.debouncedGetData(this.value)
      }
    },
    handleBlur (event) {
      this.$emit('blur', event)
    },
    handleClear () {
      this.activated = false
      this.$emit('clear')
    },

    close () {
      this.activated = false
    },

    select (item) {
      this.$emit('input', item[this.valueKey])
      this.$emit('select', item)
      this.$nextTick(v => {
        this.suggestions = []
        this.highlightedIndex = -1
      })
    },

    getData (queryString) {
      if (this.suggestionDisabled) return

      this.loading = true
      this.fetchSuggestions(queryString, (suggestions) => {
        this.loading = false
        if (this.suggestionDisabled) return

        if (Array.isArray(suggestions)) {
          this.suggestions = suggestions
          this.highlightedIndex = this.highlightFirstItem ? 0 : -1
        } else {
          console.error('[Element Error] autocomplete suggestions must be an array')
        }
      })
    },
    getInput () {
      return this.$refs.input.getInput()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
