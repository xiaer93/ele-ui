<template>
  <div>
    <section>
      <c-scrollbar tag="ul" class="demo-scroll" wrap-class="demo-scroll__wrap" view-class="demo-scroll__list">
        <li v-for="item in news" :key="item">{{item}}</li>
      </c-scrollbar>
    </section>
  </div>
</template>

<script>
import CScrollbar from '../components/scrollbar/scrollbar'

export default {
  name:'',
  components: {
    CScrollbar
  },

  data(){
   return {
     news: _.range(10).map(v => `news-${v}`)
   }
  }
}
</script>

<style lang="less">
.demo-scroll {
  width: 300px;
}
.demo-scroll__wrap{
  color: red;
  height: 100px;
}
.demo-scroll__list{
  margin: 0;
  padding: 0;

}
</style>
