import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/index.pcss'
import router from './router/index'

Vue.config.errorHandle = function (e) {
  console.log(e)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
