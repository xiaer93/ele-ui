<template>
  <aside class="c-aside" :style="{width}">
      <slot></slot>
  </aside>
</template>

<script>
export default {
    name: 'CSide',
    props: {
        width: {
            type: String,
            default: '300px'
        }
    }
}
</script>

<style>

</style>