<template>
  <div
    :class="[
      'c-input',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'c-input-group': $slots.prepend || $slots.append,
        'c-input-group--append': $slots.append,

        'c-input--prefix': $slots.prefix || prefixIcon,
        'c-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template>
        <!-- 透传attrs属性 -->
      <input 
        :tabindex="tabindex"
        class="c-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        :aira-label="label"
      >

      <!-- 后置内容 -->
      <span class="c-input__suffix" v-if="getSuffixVisible()">
        <span class="c-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="c-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>

          <i v-if="showClear" class="c-input__icon c-icon-circle-close c-input__clear" @mousedown.prevent @click="clear"></i>
          <i v-if="showPwdVisible" class="c-input__icon c-icon-view c-input__clear" @mousedown.prevent @click="handlePasswordVisible"></i>
          <span v-if="isWordLimitVisible" class="c-input__count">
            <span class="c-input__count-inner">{{textLength}}/{{upperLimit}}</span>
          </span>

        </span>
      </span>
      <!-- 后置元素 -->
      <div class="c-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter'

const isKorean = (text) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text)

export default {
  name:'CInput',
  componentName: 'CInput',

  inheritAttrs: false,

  mixins: [Emitter],

  inject: {
    cForm: {
      default: ''
    },
    cFormItem: {
      default: ''
    }
  },

  data(){
   return {
     hovering: false,
     focused: false,
     passwordVisible: false,
     isComposing: false
   }
  },

  props: {
    value: [String, Number],
    resize: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    tabindex: String,
    prefixIcon: String,
    suffixIcon: String,
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }

  },

  computed: {
    inputDisabled () {
      return this.disabled || (this.cForm || {}).disabled
    },
    inputExceed () {
      return false
    },
    isWordLimitVisible () {
      return this.showWordLimit && this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.inputDisabled && !this.readonly && !this.showPassword
    },
    showClear () {
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering)
    },
    showPwdVisible () {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused)
    },
    nativeInputValue () {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    },
    upperLimit () {
      return this.$attrs.maxlength
    },
    textLength () {
      if (typeof this.value === 'number') {
        return String(this.value).length
      }
      return (this.value || '').length
    }
  },
  watch: {
    nativeInputValue () {
      // 手动修改input的值，而没有使用v-model形式
      this.setNativeInputValue()
    }
  },

  methods: {
    focus () {
      this.getInput().focus()
    },
    blur () {
      this.getInput().blur()
    },
    select () {
      this.getInput().select()
    },
    clear () {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handleBlur (ev) {
      this.focused = false
      this.$emit('blur', ev)
    },
    handleFocus(ev) {
      this.focused = true
      this.$emit('focus', ev)
    },
    handleInput (ev) {
      if (this.isComposing) return

      if (ev.target.value === this.nativeInputValue) return

      this.$emit('input', ev.target.value)
      // this.$nextTick(this.setNativeInputValue)
    },
    handleChange (ev) {
      this.$emit('change', ev.target.value)
    },
    handlePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
      this.focus()
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionUpdate () {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      this.isComposing = !isKorean(lastCharacter)
    },
    handleCompositionEnd (ev) {
      if (this.isComposing) {
        this.isComposing = false
        this.handleInput(ev)
      }
    },

    setNativeInputValue () {
      const input = this.getInput()
      if (!input) return
      if(input.value === this.nativeInputValue) return

      input.value = this.nativeInputValue
    },

    getInput () {
      return this.$refs.input
    },
    getSuffixVisible () {
      return this.$slots.suffix || this.suffixIcon || this.showClear || this.showPassword || this.isWordLimitVisible
    }
  }
}
</script>

<style lang="less" scoped>

</style>
