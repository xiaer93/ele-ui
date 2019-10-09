<template>
  <section class="c-container" :class="{'is-vertical': isVertical}">
      <slot></slot>
  </section>
</template>

<script>
export default {
    name: 'CContainer',

    props: {
        direction: {
            type: String
        }
    },

    computed: {
        isVertical () {
            if (this.direction === 'vertical') {
                return true
            } else if (this.direction === 'horizontal') {
                return false
            }

            return this.$slots && this.$slots.default ? this.$slots.default.some(vnode => {
                const tag = vnode.componentOptions && vnode.componentOptions.tag
                return tag === 'c-header' || tag === 'c-footer'
            }) : false
        }
    }
}
</script>

<style>

</style>