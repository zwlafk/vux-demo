import axios from 'axios'
import Vue from 'vue'



//全局处理ajax request
axios.interceptors.request.use(function (config) {
  console.log('config:', config)
  Vue.$vux.loading.show({
    text: ""
  });
  return config;

}, function (error) {
  Vue.$vux.loading.hide();
  return Promise.reject(error);
});


//全局处理ajax Error
axios.interceptors.response.use(function (response) {
  Vue.$vux.loading.hide();

  //受后端智商限制，在此处理失败
  if (response.data.status==false) return Vue.$vux.toast.show({ text: response.data.msg, position: "middle", type: 'warn' });


  return response;
}, function (error) {
  Vue.$vux.loading.hide();
  let errText = error.response.data.msg || error.response.data
  if (!errText) {
    errText = error.response.status + error.response.statusText
  }
  Vue.$vux.toast.show({ text: errText, position: "middle", type: 'warn' });

  return Promise.reject(error);
});
