<template>
  <div class="wrapper">
    <ClientSearchForm />
    <!-- <div v-transfer-dom>
        <popup position="top" v-model="isFilterShow">111</popup>
      </div> -->

    <div class="height-block"></div>
    <div class="height-block"></div>
    <!-- <div v-if="!list.length"
         style="text-align:center">无数据</div> -->
    <template v-for="item in list">
      <group :key="item.custId"
             class="group-nomargintop">
        <cell-box class="list-item">
          <div class="list-item-info"
               @click="handleListItemClick(item.custId)">
            <h4>{{item.custName|genCustName}}</h4>
            <p class="list-item-info-address">{{item.address}}</p>
          </div>
          <div class="list-item-status"
               :class="item.custStatus|transCustStatusClass">
            {{item.custStatus|transCustStatus}}
          </div>
          <div class="list-item-icon-group">
            <i class="wechat">
              <a v-if="item.wxId"
                 @click="invokeWxChat(item.wxId)"><i class="iconfont">&#xe60b;</i></a>
            </i>
            <i class="phone">
              <div v-if="item.mobilePhone"
                   @click="handleShowPhoneNumDialog(item)"><i class="iconfont">&#xe605;</i></div>
              <!-- <a v-if="item.mobilePhone"
                 :href="`tel:${item.mobilePhone}`">电话</a> -->
            </i>
          </div>
        </cell-box>
      </group>
    </template>
    <!-- <a href="tel:155xxxxxxxx">sssssss</a> -->
    <div class="height-block"></div>

    <group class="bottom-btn">
      <x-button type="primary"
                @click.native="handleAddClient">新增客户</x-button>
    </group>
    <div v-transfer-dom>
      <x-dialog hide-on-blur
                v-model="isDialogShow">
        <div style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <div v-for="(item,index) in phoneNumList"
               :key="index">
            <a :href="`tel:${item}`">{{item}}</a>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import ClientSearchForm from "./component/ClientSearchForm";
import api from "@/api/client";
import {
  XDialog,
  Group,
  XButton,
  Popup,
  Flexbox,
  FlexboxItem,
  CellBox,
  Cell,
  Search,
  Tab,
  TabItem
} from "vux";
import axios from "axios";
export default {
  name: "ClientList",
  components: {
    ClientSearchForm,
    XDialog,
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    Popup,
    CellBox,
    Cell,
    Search,
    Tab,
    TabItem
  },
  watch: {
    filterFormData(val) {}
  },
  computed: {},
  filters: {
    genCustName(val) {
      if (!val) return "";
      return val.length < 11 ? val : `${val.slice(0, 10)}...`;
    },
    transCustStatusClass(val) {
      if (!val) return "";
      // 客户状态： 1-资源 2-意向客户 3-签约客户 4-沉默客户 5-流失客户
      let mapper = {
        1: "resource", //"资源",
        2: "will", //"意向",
        3: "sign", //"签约",
        4: "slience", //"沉默",
        5: "lost" //"流失"
      };
      return mapper[val];
    },
    transCustStatus(val) {
      if (!val) return "";
      // 客户状态： 1-资源 2-意向客户 3-签约客户 4-沉默客户 5-流失客户
      let mapper = {
        1: "资源",
        2: "意向",
        3: "签约",
        4: "沉默",
        5: "流失"
      };
      return mapper[val];
    }
  },
  data() {
    return {
      isDialogShow: false,
      isCompanyUser: this.$store.state.userInfoState.userInfo.isCompanyUser,
      shouldClear: false,
      list: [],
      paramsObj: {},
      phoneNumList: []
    };
  },
  methods: {
    handleShowPhoneNumDialog(item) {
      if (item.mobilePhone && item.telPhone) {
        this.isDialogShow = true;
        const { mobilePhone, telPhone } = item;
        // mobilePhone telPhone
        this.phoneNumList = [mobilePhone, telPhone];
      } else {
        let element = document.createElement("a");
        element.href = `tel:${item.mobilePhone}`;
        element.click();
        console.log(element);
      }
    },

    invokeWxChat(id) {
      wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个，且userIds+openIds总数不能超过2000。
        // userIds: id, //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: id,
        //   "wmEAlECwAAHrbWYDOK5u3Af13xlYDDNQ;wmEAlECwAAHrbWYDOK5u3Af13xlYDDNT", // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: "", // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
          // 回调
        },
        fail: function(res) {
          if (res.errMsg.indexOf("function not exist") > -1) {
            alert("版本过低请升级");
          }
        }
      });
    },
    handleFilterReset() {
      for (const key in this.filterFormData) {
        this.filterFormData[key] = "";
      }
      this.shouldClear = Math.random();
    },
    handleFilterSubmit() {
      let params = { ...this.filterFormData };
      for (const key in this.filterFormData) {
        if (
          this.filterFormData.hasOwnProperty(key) &&
          this.filterFormData[key] instanceof Object
        ) {
          params = { ...params, ...this.filterFormData[key] };
        }
      }
      this.paramsObj = params;
      api
        .fetchList({ order: this.sorterSelectedIndex, ...params })
        .then(res => {
          this.list = res.data.list;
          // this.sorterSelectedIndex = order;
          this.isSorterShow = false;
          this.isFilterShow = false;
        });
    },
    handleListItemClick(custId) {
      this.$router.push({ name: "ClientPreview", params: { custId: custId } });
    },
    handleAddClient() {
      this.$router.push({ name: "ClientAddForm" });
    },
    handleTabItemClick(item) {
      this.CurrentfilterOption = item;
    },
    initCurrentFilterOption() {
      // this.CurrentfilterOption = this.fieldList[0];
    }
  },

  mounted() {
    api
      .fetchList({})
      .then(res => {
        this.list = res.data.list;
      })
      .catch(e => {});
    api
      .fetchFieldList()
      .then(res => {
        this.fieldList = res.data.list;
        this.CurrentfilterOption = res.data.list[0];
      })
      .catch(e => {});
  }
};
</script>
<style scoped lang="less">
.list-item {
  justify-content: space-between;
  &-info {
    flex: 8;
    &-address {
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
  &-status {
    display: flex;
    flex: 1;
    align-self: baseline;
    font-size: 12px;
    border: 1px solid;
    justify-content: center;
    border-radius: 5px;
  }
  .resource {
    color: #68b4ff;
  }
  .will {
    color: #f9ae21;
  }
  .sign {
    color: #4ec9bf;
  }
  &-icon-group {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    .phone,
    .wechat {
      flex: 1;
    }
  }
}

.height-block {
  height: 50px;
}
.bottom-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
