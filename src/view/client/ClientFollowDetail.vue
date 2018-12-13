<template>
  <!-- 服务回访列表 -->
  <div class="follow-wrapper">

    <cell-box class="follow-item">
      <div class="follow-item-title">{{info.username}} {{info.time|dateFormat}}</div>
      <div class="follow-item-content">{{info.info}}</div>
      <span class="view-pic"
            v-if="info.img"
            @click.stop="previewPic(info.img)">查看图片</span>
      <dl v-if="info.customer">
        <dt>关联客户</dt>
        <dd>{{info.customer}}</dd>
      </dl>
      <dl v-if="info.product">
        <dt>关联产品</dt>
        <!-- remind：只有一个元素时后端给的是"慧营销#" -->
        <dd>{{info.product.split("#").join()}}</dd>
      </dl>
      <dl v-if="info.type_cs">
        <dt>客户类型</dt>
        <dd>{{info.type_cs}}</dd>
      </dl>
      <dl v-if="info.toucher">
        <dt>联系人</dt>
        <dd>{{info.toucher}}</dd>
      </dl>
      <dl v-if="info.thread">
        <dt>销售进程 </dt>
        <dd>{{info.thread}}</dd>
      </dl>
      <dl v-if="info.ntime">
        <dt>下次联系</dt>
        <dd>{{info.ntime|dateFormat}}</dd>
      </dl>
      <dl v-if="info.lbs">
        <dt>行动标签</dt>
        <dd class="label">
          <div class="label-item"
               v-for="(item,index) in labelList"
               :key="index">
            {{item}}
          </div>
        </dd>
      </dl>
      <!-- lbs  初次跟进#高意向客户 -->
    </cell-box>
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
  name: "ClientFollowDetail",
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
  computed: {
    labelList() {
      if (!this.info.lbs) return "";
      return this.info.lbs.split("#");
    }
  },
  data() {
    return {
      // infoMapper: {
      //   customer: "关联客户",
      //   product: "关联产品",
      //   type_cs: "客户类型",
      //   toucher: "联系人",
      //   tel: "",
      //   thread: "销售进程",
      //   ntime: "下次联系",
      //   lbs: "",
      // },
      custId: this.$route.params.custId,
      followId: this.$route.params.followId,
      info: {}
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
    }
  },
  mounted() {
    // api.getCustFollow({});
    api
      .getFollowDetail({ gjjlid: this.followId })
      .then(res => {
        this.info = res.data.smap;
      })
      .catch(e => {});
  }
};
</script>
<style lang="less" scoped>
.follow-wrapper {
  min-height: 100%;
  .follow-item {
    flex-direction: column;
    align-items: flex-start;
    .view-pic {
      align-self: flex-end;
      color: blue;
    }
  }
  .height-block {
    height: 50px;
  }
  .bottom-btn {
    position: fixed;
    bottom: 0;
  }

  dt {
    width: 5em;
    float: left;
    // text-align-last: justify;
    // text-align: justify;
  }
  dd {
    // color: #c1c1c1;
    padding-left: 5em;
  }
  dl {
    width: 100%;
  }
  .label {
    display: flex;
    padding-left: 0;
    &-item {
      // flex: 0 0 25%;
      margin-right: .5em
    }
  }
}
</style>
