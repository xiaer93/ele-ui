<template>
  <footer class="c-footer" :style="{height}">
      <slot></slot>
  </footer>
</template>

<script>
export default {
    name: 'CFooter',

    props: {
        height: String,
        default: _.constant('60px')
    }
}
</script>

<style>

</style>