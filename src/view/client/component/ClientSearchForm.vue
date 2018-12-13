<template>
  <div class="client-search-form">
    <div class="mask" v-if="isMaskShow" @click="isFilterShow=false,isSorterShow=false"></div>
    <group class="group-nomargintop">
      <search
        v-model="srarchText"
        ref="search"
        @on-result-click="handleSearch"
        :results="searchResult"
      ></search>
    </group>
    <flexbox :gutter="0">
      <flexbox-item>
        <x-button @click.native="isFilterShow=!isFilterShow,isSorterShow=false">筛选 ▾</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="isSorterShow=!isSorterShow,isFilterShow=false">排序 ▾</x-button>
      </flexbox-item>
    </flexbox>
    <div class="filter" v-if="isFilterShow">
      <div class="filter-content" style="display: flex;flex: 1;">
        <tab class="vertical-tab filter-form-tab" custom-bar-width="0">
          <tab-item
            v-for="(item,index) in fieldList"
            :selected="index==0"
            @on-item-click="handleTabItemClick(item,index)"
            :key="item.id"
          >{{item.searchName}}</tab-item>
        </tab>
        <div class="filter-form-content">
          <group>
            <checklist v-show="filterName=='custStatus'" :max="1" :options="custStatusOptions"></checklist>
            <checklist v-show="filterName=='source'" :max="1" :options="sourceOptions"></checklist>
          </group>
        </div>
      </div>
      <div class="filter-footer">
        <x-button mini type="primary" @click.native="handleFilterReset">重置</x-button>
        <x-button mini type="primary" @click.native="handleFilterSubmit">确定</x-button>
      </div>
    </div>
    <div class="sorter" v-if="isSorterShow">
      <tab class="vertical-tab" custom-bar-width="0">
        <tab-item
          v-for="(item,index) in sorterOptionList"
          :selected="index==sorterSelectedIndex"
          @on-item-click="handleSorterItemClick(index)"
          :key="item.id"
        >{{item.text}}</tab-item>
      </tab>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('clientState')

import api from "@/api/client";
import {
  Checklist,
  CellBox,
  Group,
  XInput,
  Datetime,
  Search,
  Flexbox,
  FlexboxItem,
  XButton,
  Tab,
  TabItem
} from "vux";
import DateRangePicker from "@/components/DateRangePicker";
import PopupChecklist from "@/components/PopupChecklist";
export default {
  name: "ClientSearchForm",
  components: {
    Checklist,
    Tab,
    TabItem,
    XButton,
    FlexboxItem,
    Flexbox,
    Search,
    DateRangePicker,
    PopupChecklist,
    CellBox,
    Group,
    Datetime,
    XInput
  },
  props: {},
  filters: {},
  watch: {},
  data() {
    return {
      sorterSelectedIndex: 4, //默认按创建时间排序
      srarchText: "",
      filterName: "custStatus",
      isFilterShow: false,
      isSorterShow: false,
      custStatusOptions: [
        {
          key: 1,
          value: "资源"
        },
        {
          key: 2,
          value: "意向客户"
        },
        {
          key: 3,
          value: "签约客户"
        }
      ],
      // custStatus	String	客户状态： 1-资源 2-意向客户 3-签约客户
      // saleProcessId	String	销售进程ID	/resource/custList/search - saleProcess
      // custTypeId 	String	客户类型	/resource/custList/search
      // resGroupId	String	资源分组ID  /resource/custList/search - resGroups
      // ownerAccsStr	String	所有者多个值使用 “，”号分割
      sourceOptions: [
        {
          key: 1,
          value: "自有导入"
        },
        {
          key: 2,
          value: "分配交接"
        },
        {
          key: 3,
          value: "公海取回"
        },
        {
          key: 4,
          value: "AI初筛"
        },
        {
          key: 5,
          value: "在线表单"
        },
        {
          key: 6,
          value: "数据合作"
        }
      ],
      // source	Integer	客户来源：1-自有导入，2-分配交接，3-公海取回，4-AI初筛，5-在线表单,6-数据合作
      // startActionDate	String	最近联系时间 【开始】 endActionDate	String	最近联系时间 【结束】
      // startDate	String	下次联系时间【开始】 endDate	String	下次联系时间【结束】
      // pstartDate	String	添加分配时间 【开始】pendDate	String	添加分配时间【结束】
      // startSignDate	String	签约时间 【开始】 endSignDate	String	签约时间【结束】
      CurrentfilterOption: {},
      fieldList: [
        {
          searchName: "客户状态",
          name: "custStatus"
        },
        {
          searchName: "销售进程",
          name: "saleProcessId"
        },
        {
          searchName: "客户类型",
          name: "custTypeId"
        },
        {
          searchName: "资源分组",
          name: "resGroupId"
        },
        {
          searchName: "所有者",
          name: "ownerAccsStr"
        },
        {
          searchName: "客户来源",
          name: "source"
        },
        {
          searchName: "最近联系时间",
          name: "startActionDate"
        },
        {
          searchName: "下次联系时间",
          name: "startDate"
        },
        {
          searchName: "添加分配时间",
          name: "pstartDate"
        },
        {
          searchName: "签约时间",
          name: "startSignDate"
        }
      ],
      sorterOptionList: [
        {
          text: "按最近联系时间正序"
        }, //order:0
        {
          text: "按最近联系时间倒序"
        }, //order:1
        {
          text: "按下次联系时间正序"
        }, //order:2
        {
          text: "按下次联系时间倒序"
        }, //order:3
        {
          text: "按创建时间正序"
        }, //order:4
        {
          text: "按创建时间倒序"
        } //order:5
      ]
    };
  },
  watch: {},
  computed: {
    isMaskShow() {
      return this.isFilterShow || this.isSorterShow;
    },
    searchResult() {
      if (!this.srarchText) {
        return [
          {
            title: `请输入要搜索的内容`,
            params: {}
          }
        ];
      }
      if (this.isCompanyUser) {
        // 企业版
        return [
          {
            title: `查找客户名称 "${this.srarchText}"`,
            params: {
              queryText: this.srarchText,
              queryType: "name"
            }
          },
          {
            title: `查找联系电话 "${this.srarchText}"`,
            params: {
              queryText: this.srarchText,
              queryType: "phone"
            }
          }
        ];
      }
      // 个人版
      return [
        {
          title: `查找客户姓名 "${this.srarchText}"`,
          params: {
            queryText: this.srarchText,
            queryType: "name"
          }
        },
        {
          title: `查找联系电话 "${this.srarchText}"`,
          params: {
            queryText: this.srarchText,
            queryType: "phone"
          }
        },
        {
          title: `查找单位名称 "${this.srarchText}"`,
          params: {
            queryText: this.srarchText,
            queryType: "company"
          }
        }
      ];
    }
  },
  methods: {
    // service / api with Vuex
    ...mapActions([
      'setParams'
    ]),
    handleTabItemClick(item, index) {
      this.filterName = item.name;
      this.setParams({a:1,b:2})
    },
    handleSorterItemClick(order) {
      api
        .fetchList({
          order,
          ...this.paramsObj
        })
        .then(res => {
          this.list = res.data.list;
          this.sorterSelectedIndex = order;
          this.isSorterShow = false;
        });
    },
    handleSearch(item) {
      const { params } = item;
      // queryText
      api.fetchList(params).then(res => {
        this.list = res.data.list;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.client-search-form {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgb(158, 153, 153);
    position: fixed;
    top: 0;
    opacity: 0.8;
  }
  .filter,
  .sorter {
    position: absolute;
    background-color: #fff;
    z-index: 1;
    width: 100%;
  }
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
}
</style>
