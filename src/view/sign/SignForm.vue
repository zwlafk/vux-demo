<template>
  <div class="sign-form">
    <group>
      <cell  title="签到时间" :value="time"></cell>
      <!-- <x-address  @on-hide="logHide" 
                  @on-show="logShow"
                  title=""
                  :list="addressData" 
                  @on-shadow-change="onShadowChange" 
                  placeholder="请选择地址" 
                  inline-desc="可以设置placeholder" ></x-address> -->
      
      <PopupCustlist class="checkBox"
                      :optionList="radioCustList"
                      :isPopupShow="isCustListShow"
                      @on-change="handlePopupCustlistChange"
                      @close-popup="isCustListShow = false"
                      labelKey="cs_name"
                      valueKey="customerid">
            <cell slot="content" title="选择客户" @click.native="isCustListShow=true" :value="formData.customer" is-link></cell>
      </PopupCustlist>

      <PopupChecklist class="checkBox"
                      :optionList="radioList"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      labelKey="name"
                      valueKey="tscidId">
            <cell slot="content" title="选择联系人" @click.native="isCheckListShow=true" :value="formData.toucherName" is-link></cell>
      </PopupChecklist>


      <PopupMap class="checkBox"
                      :isPopupShow="isMapShow"
                      @on-submit="handlePopupMapCheck"
                      @close-popup="isMapShow = false"
                      labelKey="name"
                      valueKey="rciId">
            <cell class="test" slot="content" title="签到位置" @click.native="isMapShow=true" :value="formData.address" value-align="left" is-link></cell>
      </PopupMap>
      <cell @click.native="uploadImg" title="上传图片" is-link></cell>
      <div style="padding:0 15px;">
        <div class="previewer-sign-div" v-for="(it, idx) in previewerImages" :key="idx">
          <img class="previewer-sign-img" :src="it.src" @click="show(idx)">
          <span class="sign-img-delete" @click="deleteSignImage(idx)"><i class="iconfont">&#xe601;</i></span>
        </div>
        <div v-transfer-dom>
          <previewer :list="previewerImages" ref="previewer"></previewer>
        </div>
      </div>
      <x-textarea :max="500" placeholder="签到内容" v-model="formData.info"></x-textarea>
      <cell title="按住录音" @touchstart.native="handleStartRecord" @touchend.native="handleStopRecord"></cell>
      <div class="target-info" v-if="formData.record!=''">
        <i class="iconfont">&#xe687;</i>
        <div class="record-block" @click="handlePlayVoice(localId)"><i class="iconfont">&#xe600;</i></div>
        {{formData.record_len}}"
        <x-icon class="icon-close" type="ios-close-empty" @click.native="formData.record=''"></x-icon>
      </div>
      <x-button class="bottom-btn"
              type="primary"
              @click.native="handleSubmit">保存</x-button>
    </group>
  </div>
</template>

<script>
import api from "@/api/sign";
// import wechat from "@/api/wechat";
import moment from "moment";
import PopupChecklist from "@/components/PopupChecklist";
import PopupCustlist from "@/components/PopupCustlist";
import PopupMap from "@/components/PopupMap";
import { wxChooseImage, getAllLocalImgData, uploadAllImg } from "@/util/wxUtil";

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
  ChinaAddressV4Data,
  Previewer,
  TransferDom
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
    XAddress,
    PopupChecklist,
    PopupCustlist,
    PopupMap,
    Previewer
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      addresssData: ChinaAddressV4Data,
      isCheckListShow:false,
      isCustListShow:false,
      isMapShow:false,
      radioCustList: [],
      radioList: [],
      time: moment().format('YYYY-MM-DD HH:mm'),
      mapShow: false,
      previewerImages: [],
      penddingImgServerIds: [],
      lat:'',
      lng:'',
      localId: '',//录音id
      startRecordTimeStamp:0,
      endRecordTimeStamp:0,
      userAgentComefrom:'',
      formData: {
        lat: '30.2910480267',
        lon: '120.1261552476',
        address: '',
        customerid: '',
        customer: '',
        toucherid: '',
        toucherName: '',
        info: '',
        comefrom: '企业微信',
        pic: '',
        record: '',
        record_len: ''
      },
      // recordButton: true
    };
  },
  methods: {
    show (curPicIndex) {
      // console.log(this.$refs.previewer)
      // console.log(curItemIndex,curPicIndex)

      this.$refs.previewer.show(curPicIndex)
    },
    handleSubmit() {
      console.log(this.penddingImgServerIds)
      this.formData.pic = this.penddingImgServerIds.join()
      if(this.formData.info == ''){
        this.formData.info = '外勤签到'
      }
      api.fetchAddSign(this.formData).then((res)=>{
        if(res.data.status){
          if (this.$route.query.goindex === 'true') {
            this.$router.push('/')
          } else {
            this.$router.back(-1)
          }
        }
      })
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
    handleStartRecord() {
      var that = this
      that.startRecordTimeStamp = new Date().getTime()
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

      wx.onVoiceRecordEnd({
          // 录音时间超过一分钟没有停止的时候会执行 complete 回调
          complete: function (res) {
              var localId = res.localId;
              that.handleUploadVoice(localId,60)
          }
      });
    },
    handleStopRecord() {
      var that = this
      that.endRecordTimeStamp = new Date().getTime()
      wx.stopRecord({
          success: function (res) {
              var localId = res.localId;
              that.localId = localId
              // alert(localId)
              that.handleUploadVoice(localId)
          }
      });
    },
    handlePlayVoice(localId) {
      wx.playVoice({
          localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    },
    handleUploadVoice(localId,timelength) {
      var that = this;
      wx.uploadVoice({
          localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
              var serverId = res.serverId; // 返回音频的服务器端ID
              // alert(serverId)
              that.formData.record = serverId;
              that.formData.record_len = timelength?timelength:moment(that.endRecordTimeStamp-that.startRecordTimeStamp).format('s')
          }
      });
    },
    uploadImg() {
      // wx.previewImage({
      //   current: "http://www.w3school.com.cn/i/eg_mouse.jpg", // 当前显示图片的http链接
      //   urls: [] // 需要预览的图片http链接列表
      // });
// console.log(this.userAgentComefrom)
      let loadedImagesLength = this.previewerImages.length
      if(loadedImagesLength >= 4){
        return false;
      } 
      let count = 4-loadedImagesLength;
      wxChooseImage(count)
        .then(localIds => {
          this.penddingImgIds = localIds;
          if (this.userAgentComefrom != 'ios') {
            //android直接使用localIds作为img src显示
            localIds.map(item => {
              this.previewerImages.push({'src':item})
            })
          }
          return uploadAllImg(this.penddingImgIds);
        })
        .then(serverIds => {
          this.penddingImgServerIds = serverIds;
          if (this.userAgentComefrom == 'ios') {
            //IOS下 src base64显示
            return getAllLocalImgData(this.penddingImgIds);
          }
          return;
        })
        .then(LocalImgData => {
          LocalImgData.map(item => {
            this.previewerImages.push({'src':item})
          })
        })
        .catch(e => {});
    },
    getDevicesInfo(){
      let ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf('andriod') > -1) {
        this.userAgentComefrom = 'andriod'
      }else if(/iphone|ipad/i.test(ua)){
        this.userAgentComefrom = 'ios'
      }else{
        this.userAgentComefrom = 'pc端'
      }
    },
    handlePopupChecklistChange(val) {
      this.formData.toucherid = val.value.length>0?val.value.join():''
      this.formData.toucherName = val.label.length>0?val.label.join():''
    },
    handlePopupCustlistChange(val) {
      this.formData.customerid = val.value
      this.formData.customer = val.label
    },
    handlePopupMapCheck(val) {
      console.log("handlePopupMapCheck",val)
      this.formData.address = val.address
      this.formData.lat = val.point.lat
      this.formData.lon = val.point.lng
    },
    getLocationpoint() {
      let self = this
      if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
            function (position) {
              let latitude = position.coords.latitude;//获取纬度
              let longitude = position.coords.longitude;//获取经度
              self.formData.lat = latitude
              self.formData.lon = longitude
              self.lat = latitude
              self.lng = longitude
            },
            function(err){
              alert(err.message)
              console.warn(`ERROR(${err.code}): ${err.message}`);
            }
          );
      }else{
          alert("不支持定位功能");
      }
    },
    getFetchNearCustList() {
      api.fetchNearCustList(
        {"lat":this.formData.lat,"lon":this.formData.lon}
      ).then((res)=>{
        this.radioCustList = res.data.result.nearCustomers
      })
    },
    deleteSignImage(index) {
      this.previewerImages.splice(index,1)
      this.penddingImgServerIds.splice(index,1)
      this.formData.pic = this.penddingImgServerIds.join()
    }
  },
  mounted() {
    this.getDevicesInfo()
    this.getLocationpoint()
    // this.getFetchNearCustList()

    api.fetchLinkManList().then((res)=>{
      if(res.data.resultCode == 1){
        this.radioList = res.data.result.list
        // console.log(this.radioList)
      }
    })

  },
  watch: {
    lat(curVal,oldVal){
      this.getFetchNearCustList()
    },
    lng(curVal,oldVal){
      this.getFetchNearCustList()
    }
  }
};
</script>
<style lang="less" scoped>
.sign-form {
  .bottom-btn {
    position: fixed;
    bottom: 0;
  }
  .map {
    width: 100%;
    height: 400px;
  }
  .target-info {
    color: #999;
    font-size: 12px;
    line-height: 2;
    position: relative;
    padding: 0 15px;

    .icon-close {
      position: absolute;
      fill: #999;
      right: 8px;
      top: 4px;
    }
  }
  .record-block {
    width: 40%;
    display: inline-block;
    background-color: rgba(242, 242, 242, 1);
  }
  .previewer-sign-img {
    width: 100%;
    height: 100%;
  }

  .previewer-sign-div {
    width: 80px;
    height: 80px;
    display: inline-block;
    overflow: hidden;
    position: relative;

    .sign-img-delete {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 20;
      font-size: 16px;
      line-height: 16px;
      background-color: #fff;

      .iconfont {
        padding: 0;
        color: gray;
      }
    }
  }
}
</style>
