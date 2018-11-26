<template>
  <div class="sign-list-content">
    <divider>head</divider>
    <card v-for="item in dataList" :key="item.id">
      <div slot="header">
        <img :src="item.avatar" style="width:40px;">
        <span style="color:#999;font-size:12px;">{{item.nickname}} {{item.comefrom}}</span>
      </div>
      <div slot="content" class="card-padding">
        <p style="font-size:14px;line-height:1.2;">{{item.info}}</p>
        <div>
          <img v-for="(imageSrc,index) in item.pic.split('<$imgurl$>')" :key="index" :src="imageSrc" style="width:40px;" />
        </div>
        {{item.recordpath}}录音（总长{{item.recordtime}}秒）
        <div>签到地点:{{item.address_qd}}</div>
        <div>关联客户:{{item.customer}}</div>
        <div>联系人姓名:{{item.toucher}}</div>
        <div>签到时间:{{item.time_qd | dateFormat}}</div>
      </div>
    </card>

    <tab>
      <tab-item selected @on-item-click="onItemClick('reply')">回复<span v-if="replayList.length">({{replayList.length}})</span></tab-item>
      <tab-item @on-item-click="onItemClick('praise')">赞<span v-if="praiseList.length">({{praiseList.length}})</span></tab-item>
    </tab>
    <card v-if="currentTabName=='reply'" v-for="item in replayList" :key="item.id">
      <div slot="header">
        <img :src="item.avatar" style="width:40px;">
        <span style="color:#999;font-size:12px;">{{item.nickname}} {{item.comefrom}}</span>
        <flexbox>
          <flexbox-item><x-button @click.native="handleAddReply({targetid:item.id,plid:item.userid})">回复</x-button></flexbox-item>
          <flexbox-item><x-button>赞</x-button></flexbox-item>
          <flexbox-item><x-button @click.native="handleDeleteReply(item.id)">删除</x-button></flexbox-item>
        </flexbox>
      </div>
      <div slot="content" class="card-padding">
        <p style="font-size:14px;line-height:1.2;"><span v-if="item.targetid">回复@{{item.targetname}}</span>{{item.info}}</p>
      </div>
    </card>

    <card v-if="currentTabName=='praise'" v-for="item in praiseList" :key="item.id">
      <div slot="header">
        <img :src="item.avatar" style="width:40px;">
        <span style="color:#999;font-size:12px;">{{item.nickname}} {{item.comefrom}}</span>
      </div>
      <div slot="content" class="card-padding">
        <p style="font-size:14px;line-height:1.2;">{{item.info}}</p>
      </div>
    </card>

    <group>
      <flexbox>
        <flexbox-item><x-button @click.native="handleAddReply({targetid:detailObject.id,plid:detailObject.userid})">回复</x-button></flexbox-item>
        <flexbox-item><x-button>赞</x-button></flexbox-item>
        <flexbox-item v-if="deleteButtonShow"><x-button>删除</x-button></flexbox-item>
      </flexbox>
    </group>
  </div>
</template>


<script>
import api from "@/api/sign";
import moment from "moment";
import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  Search,
  CellFormPreview,
  Card,
  Divider,
  Flexbox,
  FlexboxItem,
  Tab,
  TabItem
} from "vux";
export default {
  name: "SignWrapper",
  components: {
    Group,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    Search,
    CellFormPreview,
    Card,
    Divider,
    Flexbox,
    FlexboxItem,
    Tab,
    TabItem
  },
  data() {
    return {
      detailObject:{},
      dataList: [],
      replayList: [],
      praiseList: [],
      deleteButtonShow: false,
      currentTabName: "reply"
    };
  },
  methods: {
    onItemClick(value) {
      this.currentTabName = value
    },
    handleAddReply(params) {
      this.$router.push({ name: "SignReplyForm",params:params });
    },
    handleDeleteReply(wlbId) {
      api.fetchDeleteReply({ type: 1, wlbId: wlbId }).then(res => {
        if (res.data.status) {
          // console.log("1", this.replayList);
          // console.log("delete success");
          this.replayList = this.replayList.filter(item => {
            return item.id != wlbId;
          });
          // console.log("2", this.replayList);
        }
      });
    }
  },
  filters: {
    dateFormat: function(el) {
      return moment(el).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    console.log("signDetail", this);
    let params = this.$route.params;
    api.fetchSignDetail(params).then(res => {
      if (res.data.status) {
        let detailList = [];
        detailList.push(res.data.data);
        this.detailObject = res.data.data;
        this.dataList = detailList;
      } else {
        console.log(res.data.msg);
      }
    })
    api.fetchReplyList(Object.assign({}, params, { type: 1 })).then(res => {
      if (res.data.status) {
        this.replayList = res.data.list;
      } else {
        console.log(res.data.msg);
      }
    })
    api.fetchPraiseList(Object.assign({}, params, { type: 1 })).then(res => {
      if (res.data.status) {
        this.praiseList = res.data.list;
      } else {
        console.log(res.data.msg);
      }
    })
  }
};
</script>
<style scoped lang="less">
.sign-list-content {
  padding-bottom: 60px;

  .btn-submit {
    position: fixed;
    bottom: 0;
  }
}
</style>