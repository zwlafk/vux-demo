<template>
  <div class="commentlist-wrapper">

    <group>
      <template v-for="item in dataList">
        <cell-box class="commentlist-item"
                  :key="item.id">
          <div class="commentlist-item-title">{{item.nickname}} {{item.time|dateFormat}}</div>
          <div class="commentlist-item-content">{{item.info}}</div>
        </cell-box>
      </template>
    </group>

    <div class="height-block"></div>
    <x-button class="bottom-btn"
              :link="{name:'ClientCommentForm'}"
              type="primary">新增点评</x-button>
  </div>
</template>

<script>
import moment from "moment";
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
  name: "ClientCommentList",
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
    api.getCustCommentList({ customerid: this.custId, page: 1 }).then(res => {
      console.log(res.data, "dadadadadad");
      this.dataList = res.data.list;
    });
  }
};
</script>
<style lang="less" scoped>
.commentlist-wrapper {
  min-height: 100%;
  .commentlist-item-title{
    color: #8e8e8e;
    font-size: 14px;
  }
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
