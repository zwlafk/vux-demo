import Vue from 'vue'
import App from './App'
import router from './router'
import { ToastPlugin, LoadingPlugin, TransferDom, ConfirmPlugin,AlertPlugin } from 'vux'
import './api'
import BaiduMap from 'vue-baidu-map'
import moment from "moment";

import '@/setup'


// import './mock'// mock 不需要时注释掉

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '9DaedVFPZNEutBncHGKa8kQ5YBBS9MWM'
})
Vue.directive('transfer-dom', TransferDom)

Vue.config.productionTip = false

Vue.filter('dateFormat', function (time, format = "YYYY-MM-DD HH:mm") {
  if (!time) return "";
  return moment(time).format(format);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
