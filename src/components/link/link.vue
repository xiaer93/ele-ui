<template>
  <a 
    :href="disabled ? null : href"
    :class="[
        'c-link', 
        type ? `c-link--${type}` : '',
        disabled && 'is-disabled',
        underline && !disabled && 'is-underline'
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
    <template v-if="$slots.icon"><slot name="icon"></slot></template>
  </a>
</template>

<script>
// v-bind="$attrs" 透传属性

export default {
    name: 'CLink',

    props: {
        type: {
            type:String,
            default: 'default'
        },
        underline: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        href: String,
        icon: String
    },
    methods: {
        handleClick (evt) {
            if (!this.disabled) {
                if (!this.href) {
                    this.$emit('click', evt)
                }
            }
        }
    }
}
</script>

<style>

</style>