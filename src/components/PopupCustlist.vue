<template  >
  <div>
    <slot name="content"></slot>
    <div v-transfer-dom>
      <popup v-model="isCheckListShow"
             position="bottom"
             height="100%"
             should-scroll-top-on-show>
        <search
          position="fixed"
          auto-scroll-to-top
          v-model="searchValue"
          @on-cancel="searchOnCancel"
          @on-submit="searchOnSubmit"
          ref="search"></search>
        <group class="cust-list-group">
          <card
            class="list-card"
            v-if="optionList.length>0 && !showSearchData"
            v-for="(item) in optionList"
            :key="item.customerid"
            @click.native="handlerSelectCust(item)"
          >
            <div class="sign-header" slot="header">
              <div class="sign-header-info">
                <div class="nickname">{{item.cs_name}}</div>
                <div class="external-info" v-if="item.space">
                  距离{{parseInt(item.space)}}米
                </div>
              </div>
            </div>
            <div slot="content" class="card-padding">
              <div class="target-info">
                <i class="iconfont">&#xe606;</i>
                {{item.address}}
                <span v-if="!item.address">无定位信息</span>
              </div>
              <div class="target-info">
                <i class="iconfont">&#xe639;</i>
                上次拜访时间：{{item.lastTime}}
              </div>
            </div>
          </card>
          <card
            class="list-card"
            v-if="searchListData.length>0 && showSearchData"
            v-for="(item) in searchListData"
            :key="item.customerid"
            @click.native="handlerSelectCust(item)"
          >
            <div class="sign-header" slot="header">
              <div class="sign-header-info">
                <div class="nickname">{{item.cs_name}}</div>
              </div>
            </div>
          </card>
        </group>
        <div class="height-block"></div>
      </popup>
    </div>
  </div>

</template>

<script>
import { Popup, XButton, CellBox, Group, Checklist, Card, Search } from "vux";
import api from "@/api/sign";
export default {
  name: "PopupCustlist",
  components: {
    Popup,
    XButton,
    CellBox,
    Group,
    Checklist,
    Card,
    Search
  },
  props: {
    labelKey: {
      type: String,
      default: "optionName"
    },
    valueKey: {
      type: String,
      default: "optionlistId"
    },
    fieldName: {},
    value: {},
    optionList: {},
    title: {},
    isPopupShow: {},
  },
  filters: {},
  watch: {
    isPopupShow(val) {
      this.isCheckListShow = val;
    },
    optionList(curVal,oldVal) {
      this.listData = curVal
    }
  },
  data() {
    return {
      isCheckListShow: this.isPopupShow,
      searchValue:'',
      showSearchData: false,
      searchListData: [],
    };
  },
  computed: {
    
  },
  methods: {
    searchOnSubmit() {
      api.fetchAllCustList({"name":this.searchValue}).then(res=>{
        if(res.data.resultCode == 1){
          this.showSearchData = true
          this.searchListData = res.data.result.nearCustomers
        }
        // console.log(res)
      })
    },
    searchOnCancel() {
      // this.$emit("close-popup");
      this.showSearchData = false
    },
    handlerSelectCust(item) {
      // console.log('hahah:',item);
      this.$emit("on-change",{label:item.cs_name,value:item.customerid});
      this.$emit("close-popup");
    }
  },
  mounted() {
    console.log(this.isCheckListShow, "isCheckListShow", this.isPopupShow);
  }
};
</script>

<style scoped lang="less">
  .cust-list-group {
    padding-top: 40px;
  }
  .sign-header {
    padding: 10px 0;

    .sign-header-info {
      position: relative;
      padding-left: 10px;

      .nickname {
        line-height: 24px;
      }

      .other-info {
        color: #999;
        font-size: 12px;
        line-height: 16px;
      }

      .external-info {
        position: absolute;
        width: 70px;
        color: #999;
        font-size: 12px;
        right: 0;
        top: 4px;
      }
    }
  }
  .target-info {
    color: #999;
    font-size: 12px;
    line-height: 2;
  }
</style>
