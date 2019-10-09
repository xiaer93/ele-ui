<template>
  <label 
    class="c-radio"
    :class="[
      border && radioSize ? `c-radio--${radioSize}` : '',
      {'is-disabled': isDisabled},
      {'is-focus': focus},
      {'is-bordered': border},
      {'is-checked': model === label}
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span 
      class="c-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="c-radio__inner"></span>
      <input 
        ref="radio"
        type="radio"
        class="c-radio__original"
        :value="label"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span class="c-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import Emitter from '../../mixins/emitter'

/**
 * 点击input触发v-modal和change事件。
 */

export default {
    name: 'CRadio',
    componentName: 'CRadio',

    // 取父组件透传过来的属性
    inject: {
      cForm: {
        default: ''
      },
      cFormItem: {
        default: ''
      }
    },

    mixins: [Emitter],

    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      border: Boolean,
      size: String
    },

    data () {
      return {
        focus: false
      }
    },
    created () {
      this._radioGroup = null
    },
    computed: {
      isGroup () {
        let parent = this.$parent
        while(parent) {
          if (parent.$options.componentName !== 'CRadioGroup') {
            parent = parent.$parent
          } else {
            // eslint-disable-next-line
            this._radioGroup = parent
            return true
          }
        }

        return false
      },
      model: {
        get () {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set (val) {
          if (this.isGroup) {
            this.dispatch('CRadioGroup', 'input', [val])
          } else {
            this.$emit('input', val)
          }
          // 更新当前radio的状态
          this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
        }
      },
      isDisabled () {
        const curStatus = this.disabled || (this.cForm || {}).disabled
        return this.isGroup ? this._radioGroup.disabled || curStatus : curStatus
      },
      tabIndex () {
        return (this.disabled) ? -1 : 0
      },
      _cFormItemSize () {
        return (this.elForm || {}).elFormItemSize
      },
      radioSize () {
        const temRadioSize = (this.size || this._cFormItemSize || {}).size

        return this.isGroup ? this._radioGroup.radioGroupSize || temRadioSize : temRadioSize
      }
    },
    methods: {
      handleChange () {
        this.$nextTick(() => {
          this.$emit('change', this.model)
          this.isGroup && this.dispatch('CRadioGroup', 'handleChange', this.model)
        })
      }
    }
}
</script>

<style>

</style>