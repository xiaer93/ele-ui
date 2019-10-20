<template>
  <div class="demo">
    <section>
      <c-tag>标签一</c-tag>
      <c-tag type="success">标签二</c-tag>
      <c-tag type="info">标签三</c-tag>
      <c-tag type="warning">标签四</c-tag>
      <c-tag type="danger">标签五</c-tag>
    </section>
    
    <section>
      <c-tag closable>标签一</c-tag>
    </section>
  </div>
</template>

<script>
import CTag from '../components/tag/tag'

export default {
  name: '',
  components: {
    CTag
  },
  data(){
   return {

   }
  }
}
</script>

<style lang="less" scoped>
/**less 深度选择器方案 */
.demo /deep/ .c-tag{
  margin-left: 10px;
}
</style>
