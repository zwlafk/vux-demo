<template>
  <div>
    <group>
      <x-input title="联系小记"
               v-model="formData.feedbackComment"></x-input>
      <CellBox @click.native="uploadImg">
        +添加图片
      </CellBox>
      <div style="display:flex;flex-wrap:wrap;">
        <div v-for="(item,index) in imgArr"
             :key="index"
             style="height:40px;overflow:hidden;flex:0 0 25%;text-align: center;"
             :style="{height:imgHeight}">
          <img class="uploaded-image"
               :key="index"
               :src="item"
               alt=""
               width="100%"
               srcset="">
          <!-- <img src="http://www.w3school.com.cn/i/eg_mouse.jpg"
               alt=""
               width="100%"
               srcset=""> -->

        </div>

      </div>

      <!-- saleProcessList -->
      <CellBoxChecklist label="销售进程"
                        :optionList="saleProcessList"
                        v-model="formData.saleProcessId"></CellBoxChecklist>

      <datetime title="下次联系时间"
                v-model="formData.followDate"
                format="YYYY-MM-DD" />
      <!-- custTypeList -->
      <CellBoxChecklist label="客户类型"
                        :optionList="custTypeList"
                        v-model="formData.custTypeId"></CellBoxChecklist>
      <!-- suitProcList -->
      <CellBoxChecklist label="适用产品"
                        labelKey="name"
                        valueKey="id"
                        splitSymbol="#"
                        multiple
                        :optionList="suitProcList"
                        v-model="formData.suitProcId"></CellBoxChecklist>

      <!-- lxfsList -->
      <CellBoxChecklist label="本次联系方式"
                        :optionList="lxfsList"
                        v-model="formData.actionType"></CellBoxChecklist>
      <CellBoxChecklist label="下次联系方式"
                        :optionList="lxfsList"
                        v-model="formData.followType"></CellBoxChecklist>

      <!-- labelList -->

      <CellBox>
        行动标签
      </CellBox>


    </group>
    <x-button class="bottom-btn"
              type="primary"
              @click.native="handleClick">保存</x-button>
  </div>
</template>

<script>
import CellBoxChecklist from "@/components/CellBoxChecklist";
import { wxChooseImage, getAllLocalImgData, uploadAllImg } from "@/util/wxUtil";
import api from "@/api/client";
import {
  Group,
  XButton,
  Popup,
  Flexbox,
  FlexboxItem,
  CellBox,
  Cell,
  Datetime,
  Search,
  XInput
} from "vux";
export default {
  name: "ClientFollowForm",
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    CellBoxChecklist,
    Popup,
    CellBox,
    Datetime,
    Cell,
    Search,
    XInput
  },
  data() {
    return {
      imgHeight: 0,
      imgArr: [],
      isCheckListShow: false,
      custTypeList: [],
      lxfsList: [],
      saleProcessList: [],
      suitProcList: [],
      custId: this.$route.params.custId,
      formData: {
        feedbackComment: "",
        saleProcessId: "",
        followDate: "",
        followType: "",
        actionType: "",
        custTypeId: "",
        suitProcId: "",
        labelCode: ""
      },
      penddingImgIds: [],
      penddingImgServerIds: [],
      userAgent: ""
    };
  },
  methods: {
    uploadImg() {
      // wx.previewImage({
      //   current: "http://www.w3school.com.cn/i/eg_mouse.jpg", // 当前显示图片的http链接
      //   urls: [] // 需要预览的图片http链接列表
      // });

      wxChooseImage()
        .then(localIds => {
          this.penddingImgIds = localIds;
          if (!this.userAgent.includes("iPhone")) {
            this.imgArr = localIds; //android直接使用localIds作为img src显示
          }
          return uploadAllImg(this.penddingImgIds);
        })
        .then(serverIds => {
          this.penddingImgServerIds = serverIds;
          if (this.userAgent.includes("iPhone")) {//IOS下 src base64显示
            return getAllLocalImgData(this.penddingImgIds);
          }
          return;
        })
        .then(LocalImgData => {
          this.imgArr = LocalImgData;
        })
        .catch(e => {});
    },
    handleClick() {
      api
        .saveFollowRecord({
          custId: this.custId,
          ...this.formData,
          img: this.penddingImgServerIds.join("#")
        })
        .then(res => {
          this.$router.back();
        });
    },
    handlePopupChecklistChange(val) {
      // 多选要传一个props splitSymbol ,join(splitSymbol)拼接传出，defaul:','
      // val:{label:'',value:''}
      console.log(val.value.join(), "handlePopupChecklistChange  valuevalue");
      console.log(val.label.join(), "handlePopupChecklistChange  labellabel");
      this.checkedLabels = val.label.join();
      this.$emit("input", val.value.join());
    }
  },
  mounted() {
    this.imgHeight = document.body.clientWidth / 4 + "px";

    api.initFollow().then(res => {
      const { data } = res;
      this.custTypeList = res.data.data.custTypeList;
      this.lxfsList = res.data.data.lxfsList;
      this.saleProcessList = res.data.data.saleProcessList;
      this.suitProcList = res.data.data.suitProcList;
    });
    // todo userAgent不同图片上传后回调不同（IOS Android）
    this.userAgent = navigator.userAgent;
  }
};
</script>
<style lang="less" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
.uploaded-image {
  // width: 5em;
  // vertical-align: top;
}
</style>
