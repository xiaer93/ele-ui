<template>
  <button
    class="c-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'c-button--' + type : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle 
      }
    ]"
  >
    <i class="c-icon-loading" v-if="loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
    name: 'CButton',

    inject: {
      cForm: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },

    computed: {
      buttonDisabled () {
        return this.disabled || (this.cForm || {}).disabled
      }
    },

    methods: {
        handleClick (evt) {
          // console.log('btn::click') this.$emit('click', 123456)
            this.$emit('click', evt)
        }
    }
}
</script>

<style>

</style>