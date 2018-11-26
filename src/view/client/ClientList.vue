<template>
  <div class="wrapper">
    <div class="mask"
         v-if="isMaskShow"
         @click="isFilterShow=false,isSorterShow=false">
    </div>
    <div class="fixed-header">
      <group class="group-nomargintop">
        <search v-model="srarchText"
                ref="search"
                :results='[{title: srarchText?`查找 "${srarchText}"`:`请输入要搜索的内容`}]'></search>
      </group>
      <flexbox :gutter="0">
        <flexbox-item>
          <x-button @click.native="isFilterShow=!isFilterShow,isSorterShow=false,initCurrentFilterOption()">筛选 ▾</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click.native="isSorterShow=!isSorterShow,isFilterShow=false">排序 ▾</x-button>
        </flexbox-item>
      </flexbox>
      <!-- <transition name="slide-fade"> -->
      <div class="filter"
           v-if="isFilterShow">
        <div class="filter-content"
             style="display: flex;flex: 1;">
          <tab class="vertical-tab filter-form-tab"
               custom-bar-width="0">
            <tab-item v-for="(item,index) in fieldList"
                      :selected="index==0"
                      @on-item-click="handleTabItemClick(item,index)"
                      :key="item.id">
              {{item.searchName}}
            </tab-item>
          </tab>
          <div class="filter-form-content">
            <template v-for="(item,index) in fieldList">
              <FilterItem v-show="CurrentfilterOption.developCode==item.developCode"
                          v-model="filterFormData[item.searchCode]"
                          :shouldClear="shouldClear"
                          :key="index"
                          v-bind="item"
                          :searchName="item.searchName"
                          :childrenList="item.childList"
                          :dataType="item.dataType"></FilterItem>
            </template>
          </div>
          <!-- <FilterGenerator class="filter-form-content"
                             :formFieldList="fieldList"
                             :option="CurrentfilterOption"></FilterGenerator> -->
          <!-- <div>{{CurrentfilterOption}}</div> -->
        </div>
        <div class="filter-footer">
          <x-button mini
                    type="primary"
                    @click.native="handleFilterReset">重置</x-button>
          <x-button mini
                    type="primary"
                    @click.native="handleFilterSubmit">确定</x-button>
        </div>
      </div>
      <div class="sorter"
           v-if="isSorterShow">
        <tab class="vertical-tab"
             custom-bar-width="0">
          <tab-item v-for="(item,index) in sorterOptionList"
                    :selected="index==sorterSelectedIndex"
                    @on-item-click="handleSorterItemClick(index)"
                    :key="item.id">{{item.text}}</tab-item>
        </tab>
      </div>
      <!-- </transition> -->
    </div>
    <!-- <div v-transfer-dom>
        <popup position="top" v-model="isFilterShow">111</popup>
      </div> -->

    <div class="height-block"></div>
    <div class="height-block"></div>
    <div v-if="!list.length"
         style="text-align:center">无数据</div>
    <template v-for="item in list">
      <group :key="item.custId"
             class="group-nomargintop">
        <cell-box class="list-item">
          <div class="list-item-info"
               @click="handleListItemClick(item.custId)">
            <h4>{{item.custName|genCustName}}</h4>
            <p>{{item.address}}</p>
          </div>
          <div class="list-item-status">
            {{item.custStatus|transCustStatus}}
          </div>
          <div class="list-item-icon-group">
            <i class="wechat">
              <a v-if="item.wxId"
                 @click="invokeWxChat(item.wxId)">微信</a>
            </i>
            <i class="phone">
              <a v-if="item.mobilePhone"
                 :href="`tel:${item.mobilePhone}`">电话</a>
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
  </div>
</template>

<script>
import FilterItem from "@/components/FilterItem";
import api from "@/api/client";
import {
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
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    Popup,
    CellBox,
    Cell,
    Search,
    FilterItem,
    Tab,
    TabItem
  },
  watch: {
    filterFormData(val) {}
  },
  computed: {
    filterFormData() {
      if (!this.fieldList.length) return {};
      let data = {};
      let fieldListLength = this.fieldList.length;
      for (let i = 0; i < fieldListLength; i++) {
        data[this.fieldList[i].searchCode] = "";
      }
      return data;
    },
    isMaskShow() {
      return this.isFilterShow || this.isSorterShow;
    }
  },
  filters: {
    genCustName(val) {
      if (!val) return "";
      return val.length < 11 ? val : `${val.slice(0, 10)}...`;
    },
    transCustStatus(val) {
      if (!val) return "";
      // 客户状态： 1-资源 2-意向客户 3-签约客户 4-沉默客户 5-流失客户
      let mapper = {
        1: "资源",
        2: "意向客户",
        3: "签约客户",
        4: "沉默客户",
        5: "流失客户"
      };
      return mapper[val];
    }
  },
  data() {
    return {
      srarchText: "",
      shouldClear: false,
      list: [],
      fieldList: [],
      sorterOptionList: [
        { text: "按最近联系时间正序" }, //order:0
        { text: "按最近联系时间倒序" }, //order:1
        { text: "按下次联系时间正序" }, //order:2
        { text: "按下次联系时间倒序" }, //order:3
        { text: "按创建时间正序" }, //order:4
        { text: "按创建时间倒序" } //order:5
      ],
      isFilterShow: false,
      isSorterShow: false,
      CurrentfilterOption: {},
      sorterSelectedIndex: 4, //默认按创建时间排序
      paramsObj: {}
    };
  },
  methods: {
    invokeWxChat(id) {
      wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个，且userIds+openIds总数不能超过2000。
        // userIds: id, //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds:id,
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
        .fetchList({ page: 0, order: this.sorterSelectedIndex, ...params })
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
    handleSorterItemClick(order) {
      api.fetchList({ page: 0, order, ...this.paramsObj }).then(res => {
        this.list = res.data.list;
        this.sorterSelectedIndex = order;
        this.isSorterShow = false;
      });
    },
    handleTabItemClick(item) {
      this.CurrentfilterOption = item;
    },
    initCurrentFilterOption() {
      this.CurrentfilterOption = this.fieldList[0];
    }
  },
  mounted() {
    api.fetchList({ page: 0 }).then(res => {
      this.list = res.data.list;
    });
    api.fetchFieldList().then(res => {
      this.fieldList = res.data.list;
      this.CurrentfilterOption = res.data.list[0];
    });
  }
};
</script>
<style scoped lang="less">
.list-item {
  justify-content: space-between;
  &-info {
    flex: 8;
  }
  &-status {
    display: flex;
    flex: 1;
    align-self: baseline;
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
.filter,
.sorter {
  position: absolute;
  background-color: #fff;
  z-index: 1;
  width: 100%;
}

// .slide-fade-enter-active {
//   transition: all 0.3s ease;
// }
// .slide-fade-leave-active {
//   transition: all 0.3s ease;
// }
// .slide-fade-enter
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//   transform: translateX(10px);
//   opacity: 0;
// }
// .slide-fade-leave-to
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//   transform: translateX(-10px);
//   opacity: 0;
// }

.filter {
  display: flex;
  background-color: #fff;
  height: 281px;
  flex-direction: column;
  .vertical-tab {
    overflow-y: auto;
  }
  .filter-form-tab {
    flex: 1;
  }
  .filter-form-content {
    overflow-x: hidden;
    overflow-y: auto;
    flex: 2;
  }
}
.mask {
  width: 100%;
  height: 100%;
  background-color: rgb(158, 153, 153);
  position: fixed;
  top: 0;
  opacity: 0.8;
  z-index: 1;
}
.fixed-header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
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
