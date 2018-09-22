import axios from 'axios'
import store from './store'
import vue from 'vue'
axios.interceptors.response.use(function(config) {
    // Do something before response is sent
    return config;
  }, function(error) {
    // Do something with response error
    // console.log('iiiiiiiiiiiii',error.response.data.msg)
    vue.$vux.toast.text("验证码已发送", "middle");
    // store.commit("resumeState/setIsToastShow", true);
    return Promise.reject(error);
});
export default axios