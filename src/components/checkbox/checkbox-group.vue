<template>
    <div class="c-checkbox-group" role="group" aria-label="checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
import Emitter from '../../mixins/emitter'

export default {
    name: 'CCheckboxGroup',
    componentName: 'CCheckboxGroup',

    mixins: [Emitter],

    inject: {
        cFormItem: {
            default: ''
        }
    },

    props: {
        value: {},
        disabled: Boolean,

    },
    computed: {

    },
    watch: {
        value(value) {
            // this.dispatch('')
        }
    }
}
</script>