<template>
  <div class="">
    <!-- <p v-if="isNoData">无数据</p> -->
    <group>
      <template v-for="(value, key) in data">
        <cell class="cell-leftfixed"
              :key="key"
              :title="dataMapper[key]"
              :value="value|transValue(key)"></cell>
      </template>

    </group>
    <div class="height-block"></div>
    <x-button v-if="isEditable"
              class="bottom-btn"
              type="primary"
              @click.native="handleClick">编辑</x-button>

  </div>
</template>

<script>
import api from "@/api/client";
import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  Search,
  CellFormPreview
} from "vux";
export default {
  name: "ClientDetail",
  components: {
    Group,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    Search,
    CellFormPreview
  },
  filters: {
    transValue(value, key) {
      let todoKeyMapper = {
        status(val) {
          // 客户状态：1、2-资源，3-意向客户，4-公海客户，5--，6-签约客户，7-沉默客户，8-流失客户
          let mapper = {
            1: "资源",
            2: "资源",
            3: "意向客户",
            4: "公海客户",
            5: "--",
            6: "签约客户",
            7: "沉默客户",
            8: "流失客户"
          };
          return mapper[val];
        },
        source(val) {
          // 客户来源 1:自有导入 2:分配交接 3:公海取回 null:老数据
          let mapper = {
            1: "自有导入",
            2: "分配交接",
            3: "公海取回"
          };
          return mapper[val];
        }
      };
      if (todoKeyMapper[key]) return todoKeyMapper[key](value);
      return value;
    }
  },
  computed: {
    data() {
      let data = {};
      let dataKeys = Object.keys(this.dataMapper);
      for (const key in this.dataMapper) {
        if (
          this.dataSource.hasOwnProperty(key) &&
          this.dataSource[key] !== ""
        ) {
          data[key] = this.dataSource[key];
        }
      }
      return data;
    }
  },
  data() {
    return {
      isNoData: true,
      isEditable: false,
      custId: this.$route.params.custId,
      dataSource: {},
      dataMapper: {
        name: "客户名称",
        status: "客户状态",
        saleProcessName: "销售进程",
        custTypeName: "客户类型",
        companyTrade: "所属行业",
        companyUser: "法人代表",
        companyMoney: "注册资金",
        scope: "经营范围",
        resGroupName: "资源分组",
        companyFax: "公司传真",
        // 所在地区,
        address: "联系地址",
        // 公司网址,
        // 关键字,
        remark: "备注"
      }
    };
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "ClientEditForm" });
    }
  },
  mounted() {
    api
      .getCustDetail({ custId: this.custId })
      .then(res => {
        this.dataSource = res.data.data;
        this.isEditable = this.dataSource.ifEdit;
        this.isNoData = false;
      })
      .catch(() => {});

    // api.getCustFollowList({customerid:this.custId,page:0})
  }
};
</script>
<style lang="less" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
</style>
<style lang="less" >
.cell-leftfixed {
  .vux-cell-primary {
    -webkit-box-flex: unset;
    -ms-flex: unset;
    flex: unset;
  }
  .weui-cell__ft {
    flex: 1;
  }
}
</style>
