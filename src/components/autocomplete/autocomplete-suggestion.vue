<template>
  <transition name="c-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="c-autocomplete-suggestion c-popper"
      :class="[{
        'is-loading': !parent.hideLoading && parent.loading
      }]"
      :style="{width: dropdownWidth}"
    ></div>
  </transition>
</template>

<script>
export default {
  name:'',
  data(){
   return {

   }
  },
  methods: {
    doDestroy () {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
