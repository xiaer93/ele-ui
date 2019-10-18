<template>
  <div
    class="c-select"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="c-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{'max-width': inputWidth - 32 + 'px', width: '100%'}"
    >
      <span v-if="collapseTags && selected.length">
        
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data(){
   return {

   }
  }
}
</script>

<style lang="less" scoped>

</style>
