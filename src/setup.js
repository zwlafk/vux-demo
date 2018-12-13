import axios from "axios"

// corpid=ww184db0f35d1176d3&corpsecret=Vbx4dpdsR9Y4__0zv56gx44F2QP_EzBn4u59Rdjsq4w
// params：公司id ， 应用id （均为固定值）
// /api/get/signature
axios.get('/wx/getSignature', 
{
  // params: {
  //   corpid:"ww184db0f35d1176d3",
  //   corpsecret:"XgqQTQgJUyBQstkJ_4b0Xemav1wkUGqdXQ8YiTFYT4M",
  //   url: 'http://bnddk.vaiwan.com/'
  // }
}).then(res => {

  wx.config({
    beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: "ww184db0f35d1176d3", // 必填，企业微信的corpID

    
    ...res.data.data,
    jsApiList: ['startRecord', 'stopRecord', 'openDefaultBrowser', 'getLocation', 'chooseImage', , 'getLocalImgData', 'selectEnterpriseContact', 'openEnterpriseChat', 'selectExternalContact']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}).then(() => {
  wx.ready(function () {

   // alert('ready')

  });

  wx.error(function (res) {

    alert('errr')
    console.log('err', res)
  });
}).catch(e => { alert('catch') })