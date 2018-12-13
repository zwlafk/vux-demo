<template>
  <div>
    <group>
      <x-textarea v-model="formData.feedbackComment"
                  placeholder="请输入联系小记，字数不超过2000">
      </x-textarea>
    </group>
    <group>
      <CellBox @click.native="uploadImg">
        +添加图片
      </CellBox>
    </group>
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
    <group>
      <CellBoxChecklist label="销售进程"
                        :optionList="saleProcessList"
                        v-model="formData.saleProcessId"></CellBoxChecklist>

    </group>
    <group>
      <datetime title="下次联系时间"
                v-model="formData.followDate"
                year-row="{value}年"
                month-row="{value}月"
                day-row="{value}日"
                hour-row="{value}时"
                minute-row="{value}分"
                format="YYYY-MM-DD HH:mm" />
    </group>
    <!-- custTypeList -->
    <group>
      <CellBoxChecklist label="客户类型"
                        :optionList="custTypeList"
                        v-model="formData.custTypeId"></CellBoxChecklist>
    </group>
    <!-- suitProcList -->
    <group>
      <CellBoxChecklist label="适用产品"
                        labelKey="name"
                        valueKey="id"
                        splitSymbol="#"
                        multiple
                        :optionList="suitProcList"
                        v-model="formData.suitProcId"></CellBoxChecklist>

    </group>
    <!-- lxfsList -->
    <group>
      <CellBoxChecklist label="本次联系方式"
                        :optionList="lxfsList"
                        v-model="formData.actionType"></CellBoxChecklist>
    </group>
    <group>
      <CellBoxChecklist label="下次联系方式"
                        :optionList="lxfsList"
                        v-model="formData.followType"></CellBoxChecklist>

    </group>
    <!-- labelList -->
    <group>
      <CellBox class="label-checker">
        行动标签
        <checker v-model="checkedLabelObj"
                 type="checkbox"
                 default-item-class="demo1-item"
                 selected-item-class="demo1-item-selected">
          <checker-item :value="item"
                        v-for="(item, index) in labelOptionList"
                        :key="index">{{item.value}}</checker-item>
        </checker>
      </CellBox>

    </group>
    <div class="height-block"></div>
    <x-button class="bottom-btn"
              type="primary"
              @click.native="handleClick">保存</x-button>
  </div>
</template>

<script>
import CellBoxChecklist from "@/components/CellBoxChecklist";
import { wxChooseImage, getAllLocalImgData, uploadAllImg } from "@/util/wxUtil";
import { getDefaultOption } from "@/util";
import moment from "moment";
import api from "@/api/client";
import {
  Checker,
  CheckerItem,
  XTextarea,
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
    Checker,
    CheckerItem,
    XTextarea,
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
  computed: {
    labelOptionList() {
      if (!this.labelList.length) return [];
      return this.labelList.map(e => ({
        key: e.optionlistId,
        value: e.optionName
      }));
    },
    checkedLabelCode() {
      if (!this.checkedLabelObj) return [];

      return this.checkedLabelObj.map(e => e.key);
    }
  },

  data() {
    return {
      checkedLabelObj: null,
      imgHeight: 0,
      imgArr: [],
      isCheckListShow: false,
      custTypeList: [],
      lxfsList: [],
      saleProcessList: [],
      suitProcList: [],
      labelList: [],
      lxyxList:[],
      custId: this.$route.params.custId,
      formData: {
        feedbackComment: "",
        saleProcessId: "",
        followDate: "",
        followType: "",
        actionType: "",
        custTypeId: "",
        suitProcId: ""
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
          if (this.userAgent.includes("iPhone")) {
            //IOS下 src base64显示
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
      console.log(this.formData);
      if (this.formData.followDate) {
        this.formData.followDate = moment(this.formData.followDate).valueOf();
      }
      api
        .saveFollowRecord({
          custId: this.custId,
          ...this.formData,
          labelCode: this.checkedLabelCode.join("#"),
          img: this.penddingImgServerIds.join("#")
        })
        .then(res => {
          this.$router.back();
        });
    },
    handlePopupChecklistChange(val) {
      // 多选要传一个props splitSymbol ,join(splitSymbol)拼接传出，defaul:','
      // val:{label:'',value:''}
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
      this.labelList = res.data.data.labelList;
      this.lxyxList = res.data.data.lxyxList;

      this.formData = {
        ...this.formData,
        followType: getDefaultOption(this.lxfsList),
        actionType: getDefaultOption(this.lxfsList),
        custTypeId: getDefaultOption(this.custTypeList),
        saleProcessId: getDefaultOption(this.saleProcessList),
        suitProcId: getDefaultOption(this.suitProcList,'id'),
        effectiveness: getDefaultOption(this.lxyxList)
      };
      // formData: {
      //   feedbackComment: "",
      //   saleProcessId: "",
      //   followDate: "",
      //   followType: "",
      //   actionType: "",
      //   custTypeId: "",
      //   suitProcId: "",
      // }
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
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}

.label-checker {
  flex-direction: column;
  align-items: flex-start;
}
</style>
