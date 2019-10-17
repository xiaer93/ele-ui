<template>
  <div 
    v-clickoutside="handleClose"
    ref="wrap"
  >
    <c-button ref="button" @mouseup.stop.prevent @click="handleToggle">展示</c-button>

    <transition name="fade">
      <div v-show="showPopper" ref="popper">
        <p>hello world</p>
      </div>
    </transition>
  </div>

</template>

<script>
import CButton from '../components/button/button'
import Popper from '../utils/vue-popper'
import Clickoutside from '../utils/clickoutside'

export default {
  name: '',

  components: {
    CButton
  },
  mixins: [Popper],

  directives: {
    Clickoutside
  },

  data () {
   return {

   }
  },

  mounted () {
    this.popperElm = this.$refs.popper
    this.referenceElm = this.$refs.button.$el
  },

  methods: {
    handleToggle () {
      this.showPopper = !this.showPopper
    },
    handleClose () {
      this.showPopper = false
    }
  }
}
</script>

<style lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
