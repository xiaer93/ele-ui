<template>
  <component
    :is="_cTag"
    class="c-radio-group"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot></slot>
  </component>
</template>

<script>
import Emmiter from '../../mixins/emitter'

const keyCode = Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
});

export default {
    name: 'CRadioGroup',
    componentName: 'CRadioGroup',

    inject: {
        cFormItem: {
            default: ''
        }
    },

    mixins: [Emmiter],

    props: {
        value: {},
        size: String,
        fill: String,
        textColor: String,
        disabled: Boolean
    },

    computed: {
        _cFormItemSize () {
            return (this.cFormItem || {}).cFormItemSize
        },
        _cTag () {
            return (this.$vnode.data || {}).tag || 'div'
        },
        radioGroupSize () {
            return (this.size || this._cFormItemSize || {}).size
        }
    },

    created () {
        // 监听子组件的dispatch触发的事件
        this.$on('handleChange', value => {
            this.$emit('change', value)
        })
    },
    mounted () {
        const radios = this.$el.querySelectorAll('[type=radio]')
        const firstLabel = this.$el.querySelectorAll('[role=radio]')[0]
        if (![].some.call(radios, radio => radio.checked) && firstLabel) {
            firstLabel.tabIndex = 0
        }
    },
    methods: {
        handleKeydown (e) {
            const target = e.target
            const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]'
            const radios = this.$el.querySelectorAll(className)
            const length = radios.length;

            const index = [].indexOf.call(radios, target)
            const roleRadios = this.$el.querySelectorAll('[role=radio]')

            switch(e.keyCode) {
                case keyCode.LEFT:
                case keyCode.UP:
                    e.stopPropagation();
                    e.preventDefault();
                    if (index === 0) {
                        roleRadios[length - 1].click();
                        roleRadios[length - 1].focus();
                    } else {
                        roleRadios[index - 1].click();
                        roleRadios[index - 1].focus();
                    }
                    break;
                default:
                    break;
            }
        }
    },
    watch: {
        value (newVal) {
            // 向上触发什么事件？
            this.dispatch('CFormItem', 'c.form.change', [newVal])
        }
    }
}
</script>

<style>

</style>