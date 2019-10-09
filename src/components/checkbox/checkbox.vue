<template>
  <label 
    class="c-checkbox"
    :class="[
        {
            'is-disabled': isDisabled,
            'is-bordered': border,
            'is-checked': isChecked
        }
    ]"
    :id="id"
  >
    <span 
        class="c-checkbox__input"
        :class="{
            'is-disabled': isDisabled,
            'is-checked': isChecked,
            'is-indeterminate': indeterminate,
            'is-focus': focus
        }"    
        :tabindex="indeterminate ? 0 : false"
        :role="indeterminate ? 'checkbox' : false"
        :aria-checked="indeterminate ? 'mixed' : false"
    >
        <span class="c-checkbox__inner"></span>
        <input 
            v-if="trueLabel || falseLabel"
            type="checkbox" 
            class="c-checkbox__original"
            :name="name"
            :disabled="isDisabled"
            :true-value="trueLabel"
            :false-value="falseLabel"
            v-model="model"
            @change="handleChange"
            @focus="focus = true"
            @blur="focus = false"
        >
        <input 
            v-else
            type="checkbox" 
            class="c-checkbox__original"
            :name="name"
            :disabled="isDisabled"
            :value="label"
            v-model="model"
            @change="handleChange"
            @focus="focus = true"
            @blur="focus = false"
        >

    </span>
    <span class="c-checkbox__label" v-if="$slots.default || label">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import Emitter from '../../mixins/emitter'

export default {
    name: 'CCheckbox',
    componentName: 'CCheckbox',
    mixins: [Emitter],

    inject: {
        cForm: {
            default: ''
        },
        cFormItem: {
            default: ''
        }
    },

    props: {
        value: {},
        label: {},
        indeterminate: Boolean,
        disabled: Boolean,
        checked: Boolean,
        name: String,
        id: String,
        border: Boolean,
        trueLabel: [String, Number],
        falseLabel: [String, Number]
    },

    data () {
        return {
            focus: false,
            selfModal: false
        }
    },
    computed: {
        model: {
            get () {
                return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModal
            },
            set (val) {
                // 参考自：https://cn.vuejs.org/v2/guide/forms.html#%E5%A4%8D%E9%80%89%E6%A1%86
                // 如果多个checkbox绑定同一个数组，则此时工台数组变化。
                if(this.isGroup) {
                    console.log(val)
                    // 触发checkboxGroup的input事件
                    this.dispatch('CCheckboxGroup', 'input', [val])
                } else {
                    // 触发checkbox的input事件
                    this.$emit('input', val)
                    this.selfModal = val
                }
            }
        },
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'CCheckboxGroup') {
                    parent = parent.$parent;
                } else {
                    this._checkboxGroup = parent
                    return true;
                }
            }
            return false;
        },
        isChecked () {
            if(_.isBoolean(this.model)) {
                return this.model
            } else if (_.isArray(this.model)) {
                return this.model.includes(this.label)
            } else if (this.model !== null && this.model !== undefined) {
                return this.model === this.trueLabel
            }
        },
        store() {
            return this._checkboxGroup ? this._checkboxGroup.value : this.value;
        },
        isDisabled () {
            return this.isGroup ? this._checkboxGroup.disabled || this.disabled || (this.cForm || {}).disabled : this.disabled || (this.cForm || {}).disabled
        }
    },
    created () {
        this._checkboxGroup = null
    },
    methods: {
        handleChange (ev) {
            let value
            if (ev.target.checked) {
                value = this.trueLabel === undefined ? true : this.trueLabel
            } else {
                value = this.falseLabel === undefined ? false : this.falseLabel
            }
            this.$emit('change', value, ev)
            this.$nextTick(() => {
                if (this.isGroup) {
                    // 触发checkboxGroup上的change事件。
                    this.dispatch('CCheckboxGroup', 'change', [this._checkboxGroup.value])
                }
            })
        }
    }
}
</script>

<style>

</style>