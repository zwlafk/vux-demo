<template>
  <!-- 服务回访列表 -->
  <div class="followlist-wrapper">
    <group>
      <template v-for="item in dataList">
        <cell-box class="followlist-item"
                  :key="item.id">
          <div class="followlist-item-title">{{item.nickname}} {{item.time|dateFormat}}</div>
          <div class="followlist-item-content">{{item.info}}</div>
        </cell-box>
      </template>
    </group>
    <!-- <div class="height-block"></div>
    <x-button class="bottom-btn"
              type="primary">新增跟进记录</x-button> -->
  </div>
</template>

<script>
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
  Sticky,
  Tab,
  TabItem
} from "vux";
export default {
  name: "ClientFeedbackList",
  components: {
    Group,
    Flexbox,
    FlexboxItem,
    XButton,
    Popup,
    CellBox,
    Cell,
    Search,
    Sticky,
    Tab,
    TabItem
  },

  data() {
    return {
      custId: this.$route.params.custId,
      dataList: []
    };
  },
  methods: {},
  mounted() {
    // api.getCustFollowList({});
    api
      .getFeedbackList({ customerid: this.custId, page: 1 })
      .then(res => {
        this.dataList = res.data.list;
      })
      .catch(e => {});
  }
};
</script>
<style lang="less" scoped>
.followlist-wrapper {
  min-height: 100%;
  .vux-cell-box {
    flex-direction: column;
    align-items: flex-start;
    .view-pic {
      align-self: flex-end;
    }
  }
  .height-block {
    height: 50px;
  }
  .bottom-btn {
    position: fixed;
    bottom: 0;
  }
}
</style>
