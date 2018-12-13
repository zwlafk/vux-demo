<template  >
  <div class="client-search-form">
    <div class="mask"
         v-if="isMaskShow"
         @click="isFilterShow=false,isSorterShow=false">
    </div>
    <group class="group-nomargintop">
      <search v-model="srarchText"
              ref="search"
              @on-result-click="handleSearch"
              :results="searchResult">
      </search>
    </group>
    <flexbox :gutter="0">
      <flexbox-item>
        <x-button @click.native="isFilterShow=!isFilterShow,isSorterShow=false,initCurrentFilterOption()">筛选 ▾</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="isSorterShow=!isSorterShow,isFilterShow=false">排序 ▾</x-button>
      </flexbox-item>
    </flexbox>
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
          <!-- <template v-for="(item,index) in fieldList">
              <FilterItem v-show="CurrentfilterOption.developCode==item.developCode"
                          v-model="filterFormData[item.searchCode]"
                          :shouldClear="shouldClear"
                          :key="index"
                          v-bind="item"
                          :searchName="item.searchName"
                          :childrenList="item.childList"
                          :dataType="item.dataType"></FilterItem>
            </template> -->
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

</template>

<script>
import api from "@/api/client";
import {
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
      isFilterShow: false,
      isSorterShow: false,
       // custStatus	String	客户状态： 1-资源 2-意向客户 3-签约客户
      // saleProcessId	String	销售进程ID	/resource/custList/search - saleProcess
      // custTypeId 	String	客户类型	/resource/custList/search
      // resGroupId	String	资源分组ID  /resource/custList/search - resGroups
      // ownerAccsStr	String	所有者多个值使用 “，”号分割
      // source	Integer	客户来源：1-自有导入，2-分配交接，3-公海取回，4-AI初筛，5-在线表单,6-数据合作
      // startActionDate	String	最近联系时间 【开始】 endActionDate	String	最近联系时间 【结束】
      // startDate	String	下次联系时间【开始】 endDate	String	下次联系时间【结束】
      // pstartDate	String	添加分配时间 【开始】pendDate	String	添加分配时间【结束】
      // startSignDate	String	签约时间 【开始】 endSignDate	String	签约时间【结束】
      CurrentfilterOption: {},
      fieldList: [
        { searchName: "客户状态" },
        { searchName: "销售进程" },
        { searchName: "客户类型" },
        { searchName: "资源分组" },
        { searchName: "所有者" },
        { searchName: "客户来源" },
        { searchName: "最近联系时间" },
        { searchName: "下次联系时间" },
        { searchName: "添加分配时间" },
        { searchName: "签约时间" }
      ],
      sorterOptionList: [
        { text: "按最近联系时间正序" }, //order:0
        { text: "按最近联系时间倒序" }, //order:1
        { text: "按下次联系时间正序" }, //order:2
        { text: "按下次联系时间倒序" }, //order:3
        { text: "按创建时间正序" }, //order:4
        { text: "按创建时间倒序" } //order:5
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
            params: { queryText: this.srarchText, queryType: "name" }
          },
          {
            title: `查找联系电话 "${this.srarchText}"`,
            params: { queryText: this.srarchText, queryType: "phone" }
          }
        ];
      }
      // 个人版
      return [
        {
          title: `查找客户姓名 "${this.srarchText}"`,
          params: { queryText: this.srarchText, queryType: "name" }
        },
        {
          title: `查找联系电话 "${this.srarchText}"`,
          params: { queryText: this.srarchText, queryType: "phone" }
        },
        {
          title: `查找单位名称 "${this.srarchText}"`,
          params: { queryText: this.srarchText, queryType: "company" }
        }
      ];
    }
  },
  methods: {
    handleSorterItemClick(order) {
      api.fetchList({ order, ...this.paramsObj }).then(res => {
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

<style  lang="less" scoped>
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
