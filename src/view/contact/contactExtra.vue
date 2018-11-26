<template>
  <div class="">
    <group>
      <search placeholder="注：不选择绑定现有联系人将自动创建一个客户"></search>
    </group>
    <group>
      <cell v-for='item in dataList' :key="item.userid" value-align="left" class="extra-item">
        <img :src="item.avatar" class="avatar"/>
        <span class="name">{{item.name}}</span>
        <p>{{translate("sexDic",item.sex)}}</p>
        <div class="bindStatusBox">

          <PopupChecklist class="checkBox"
                          :optionList="radioList"
                          :isPopupShow="isCheckListShow"
                          @on-change="handlePopupChecklistChange"
                          @close-popup="isCheckListShow = false"
                          labelKey="name"
                          valueKey="rciId">
          <cell-box  is-link
                      slot="content"
                      class="inner-cell"
                      @click.native="openPopupCheckList(item.userid)">
                      <span v-if="item.bindStatus != 1" class="bindStatus">{{translate("bindDic",item.bindStatus)}}</span>
                      <span v-if="item.bindStatus != 0" class="contactMan">{{item.lmName}}</span>
                      <span v-if="item.bindStatus == 2" class="changeOrgin">更换</span>
                    </cell-box>
          </PopupChecklist>


        </div>
      </cell>
    </group>
    <group>
      <x-button type="primary"
                @click.native="handleBtnClick">导入</x-button>
    </group>
  </div>
</template>

<script>
import api from "@/api/contact";
import utils from '@/util/translateUtils'
import PopupChecklist from "@/components/PopupChecklist";
import {
  Group,
  XButton,
  Actionsheet,
  Selector,
  CellBox,
  Cell,
  PopupRadio,
  Icon,
  Search,
  CellFormPreview
} from "vux";
export default {
  name: "contactExtra",
  components: {
    Group,
    Actionsheet,
    XButton,
    Selector,
    CellBox,
    Cell,
    Icon,
    PopupRadio,
    Search,
    CellFormPreview,
    PopupChecklist
  },
  data() {
    return {
      searchs:"",
      isCheckListShow:false,
      dataList: [],
      radioList:[],
      currentUser:"",
    };
  },
  methods: {
    handleBtnClick() {
      api.fetchImport(this.dataList).then(res=>{
        let {data:{result}} = res
        this.$vux.alert.show({
          title: '导入结果',
          content: result
        })
      })
    },
    translate(type,val){
      return utils[type](val)
    },
    handlePopupChecklistChange(val){
      let json = {
        rciId : val ? val : "",
        bindStatus : val ? 1 : 0
      }
      this.dataList.map((it,idx)=>{
          if(it.userid == this.currentUser){
            it = Object.assign({},it,json)
          }
      })
    },
    openPopupCheckList(userid){
      this.currentUser = userid
      this.isCheckListShow = true
    }
  },
  mounted() {
    api.fetchExtraRadio().then(res=>{
      let {data:{result:{list}}} = res
      this.radioList = list
    })

    // api.fetchExtraList({"rciId":"3cf8aa5263124a2cb4eb887a316611a0","userIdStr":"chenhm"}).then(res => {
    //   let {data:{result:{wxAccountList}}} = res
    //   console.log(res)
    //   this.dataList = wxAccountList;
    // });
    wx.invoke('selectExternalContact', {
                      "filterType": 0, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。默认值为0；除了0与1，其他值非法。在企业微信2.4.22及以后版本支持该参数
      }, function(res){
      if(res.err_msg == "selectExternalContact:ok"){
          userIds  = res.userIds ; //返回此次选择的外部联系人userId列表，数组类型
          let params = {
            ...this.$route.params,
            userIdStr:userIds.join(",")
          }
          api.fetchExtraList(params).then(res => {
            let {data:{result:{wxAccountList}}} = res
            //   console.log(res)
             this.dataList = wxAccountList;
          });
      }else {
          //错误处理
          console.log("error")
      }
   });
  }
};
</script>
<style lang="less">
.extra-item.weui-cell{
    padding-left: 70px;
    line-height: 24px;
    font-size: 14px;
  .checkBox{
    float:right;
    .inner-cell{
      padding: 0 30px 0 10px;;
      line-height: 48px;
      .bindStatus{
        margin-right: 10px;
      }
    }
  }
  .name{
    font-size: 16px;
  }
  .avatar{
    border-radius: 50%;
    width: 50px;
    position: absolute;
    left: 10px;
  }
  .bindStatusBox{
    line-height: 48px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .changeOrgin{
    text-decoration: underline;
    color:#17719f;
  }
}
</style>
