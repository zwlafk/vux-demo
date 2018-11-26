<template>
  <div class="">
    <group>
      <x-input  title="签到时间" 
                v-model="formData.time"
                readonly
                text-align="right"></x-input>
      <x-address  @on-hide="logHide" 
                  @on-show="logShow"
                  title=""
                  :list="addressData" 
                  @on-shadow-change="onShadowChange" 
                  placeholder="请选择地址" 
                  inline-desc="可以设置placeholder" ></x-address>
      <x-button @click.native="handleLocation">签到地图</x-button>
      <img v-for="(item,index) in formData.images" :key="index" :src="item" style="width:40px;">
      <x-button @click.native="handleUpload">上传图片</x-button>
      <x-textarea :max="200" name="info" :placeholder="签到内容" v-model="formData.info"></x-textarea>
      <x-button @touchstart.native="handleStartRecord" @touchend.native="handleStopRecord">按住录音</x-button>
      <x-button @click.native="handlePlayVoice(formData.localId)">播放录音</x-button>
      <x-button @click.native="handleSelectEnterpriseContact">选择联系人</x-button>
      <x-button @click.native="handleSelectExternalContact">选择外部联系人</x-button>
    </group>
  </div>
</template>

<script>
import api from "@/api/sign";
import wechat from "@/api/wechat";
import moment from "moment";

import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  CellFormPreview,
  XInput,
  XTextarea,
  XAddress,
  ChinaAddressV4Data
} from "vux";
export default {
  name: "SignForm",
  components: {
    Group,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    CellFormPreview,
    XInput,
    XTextarea,
    XAddress
  },
  data() {
    return { 
      addressData: ChinaAddressV4Data,
      formData: {
        time: moment().format('YYYY-MM-DD HH:mm'),
        info: '',
        latitude: 0,
        longitude: 0,
        name: '',
        address: '',
        images: ['/static/images/head.jpg','/static/images/head.jpg'],
        localId: ''
      },
      // recordButton: true
    };
  },
  methods: {
    handleClick() {
      
    },
    onShadowChange(ids,names) {
      console.log(ids,names)
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    },
    handleLocation(){
      wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度

              wx.openLocation({
                  latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                  longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                  // name: '企蜂通信', // 位置名
                  // address: '翠柏路7号电子商务产业园', // 地址详情说明
                  scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为16
              });
          }
      });
    },
    handleStartRecord() {
      var that = this
      wx.startRecord({
        success: function(res) {
          var tempFilePath = res.tempFilePath 
          // alert(tempFilePath)
        },
        fail: function(res) {
          //录音失败
          alert('录音失败')
        }
      });
    },
    handleStopRecord() {
      var that = this
      wx.stopRecord({
          success: function (res) {
              var localId = res.localId;
              that.formData.localId = localId
              alert(localId)
          }
      });
    },
    handlePlayVoice(localId) {
      wx.playVoice({
          localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    },
    handleUpload() {
      
      var that = this;
      this.formData.images = ['/static/images/head.jpg','/static/images/head.jpg','/static/images/head.jpg','/static/images/head.jpg']
      wx.chooseImage({
        count: 2, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，
                    // andriod中localId可以作为img标签的src属性显示图片；
                    // 而在IOS中需通过上面的接口getLocalImgData获取图片base64数据，从而用于img标签的显示
            var iosImagesArr = []
            localIds.map((item)=>{
              wx.getLocalImgData({
                  localId: item, // 图片的localID
                  success: function (res) {
                      var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                      iosImagesArr.push(localData)
                  }
              });
            })
            that.formData.images = iosImagesArr
            // alert(that.formData.images)
        }
      });
    },
    handleSelectEnterpriseContact() {
      var that = this;
      wx.invoke("selectEnterpriseContact", {
                "fromDepartmentId": -1,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
                "mode": "multi",// 必填，选择模式，single表示单选，multi表示多选
                "type": ["department", "user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                // "selectedDepartmentIds": ["2","3"],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
                // "selectedUserIds": ["lisi","lisi2"]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
        },function(res){
                if (res.err_msg == "selectEnterpriseContact:ok")
                {
                        if(typeof res.result == 'string')
                        {
                                res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
                        }
                        var selectedDepartmentList = res.result.departmentList;// 已选的部门列表
                        for (var i = 0; i < selectedDepartmentList.length; i++)
                        {
                                var department = selectedDepartmentList[i];
                                var departmentId = department.id;// 已选的单个部门ID
                                var departemntName = department.name;// 已选的单个部门名称
                        }
                        var selectedUserList = res.result.userList; // 已选的成员列表
                        var userIdsList = [];
                        for (var i = 0; i < selectedUserList.length; i++)
                        {
                                var user = selectedUserList[i];
                                var userId = user.id; // 已选的单个成员ID
                                var userName = user.name;// 已选的单个成员名称
                                var userAvatar= user.avatar;// 已选的单个成员头像
                                alert(userId)
                                userIdsList.push(userId);
                        }
                        that.handleOpenEnterpriseChat(userIdsList)
                }
        }
      );
    },
    handleOpenEnterpriseChat(userList) {
      wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个，且userIds+openIds总数不能超过2000。
          userIds: userList.join(';'),    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
          // externalUserIds: 'wmEAlECwAAHrbWYDOK5u3Af13xlYDDNQ;wmEAlECwAAHrbWYDOK5u3Af13xlYDDNT', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
          groupName: '',  // 必填，会话名称。单聊时该参数传入空字符串""即可。
          success: function(res) {
              // 回调
          },
          fail: function(res) {
              if(res.errMsg.indexOf('function not exist') > -1){
                  alert('版本过低请升级')
              }
          }
      });
    },
    handleSelectExternalContact() {
      wx.invoke('selectExternalContact', {
                        "filterType": 0, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。默认值为0；除了0与1，其他值非法。在企业微信2.4.22及以后版本支持该参数
        }, function(res){
        if(res.err_msg == "selectExternalContact:ok"){
            userIds  = res.userIds ; //返回此次选择的外部联系人userId列表，数组类型
        }else {
            //错误处理
        }
     });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>

</style>
