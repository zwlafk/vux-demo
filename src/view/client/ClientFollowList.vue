<template>
  <div class="followlist-wrapper">
    <group>
      <template v-for="(item,index) in dataList">

        <cell-box class="followlist-item"
                  :link="{name:'ClientFollowDetail',params:{followId:item.id}}"
                  :key="index">
          <div class="followlist-item-title">{{item.nickname}} {{item.time|dateFormat}}</div>
          <div class="followlist-item-content">{{item.info}}</div>
          <span v-if="item.feedbackImg"
                class="view-pic"
                @click.stop="previewPic(item.feedbackImg)">查看图片</span>
        </cell-box>
      </template>

    </group>
    <div class="height-block"></div>
    <x-button class="bottom-btn"
              @click.native="handleAddFollowRecord"
              type="primary">新增跟进记录</x-button>
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
  methods: {
    previewPic(imgStr) {
      console.log("previewPic", imgStr);
      let imgArr = imgStr.split(",");
      wx.previewImage({
        current: imgArr[0], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      });
    },
    handleAddFollowRecord() {
      this.$router.push({ name: "ClientFollowForm" });
    }
  },
  mounted() {
    api
      .getCustFollowList({ customerid: this.custId, page: 1 })
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
