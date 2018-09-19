import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { ToastPlugin } from 'vux'

Vue.use(ToastPlugin)

Vue.config.productionTip = false
// Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
