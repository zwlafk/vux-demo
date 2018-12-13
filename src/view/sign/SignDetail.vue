<template>
  <div class="sign-list-content">
    <card class="list-card" v-for="(item,index) in dataList" :key="item.id">
      <div class="sign-header" slot="header">
        <img class="sign-header-avtar" :src="item.avatar!=''?item.avatar:'/static/images/avtar.png'">
        <div class="sign-header-info">
          <div class="nickname">{{item.nickname}}</div>
          <div class="other-info">
            <span>{{item.time_action | dateFormat}}</span>
            <span>{{item.comefrom}} </span>
          </div>
        </div>
      </div>
      <div slot="content" class="card-padding">
        <p class="sign-content" @click="handleSignDetail(item.id)">{{item.info}}</p>
        
        <div>
          <div class="previewer-sign-div" v-for="(it, idx) in item.previewerImages" :key="idx">
            <img class="previewer-sign-img" :src="it.src" @click="show(index,idx)">
          </div>
          <div v-transfer-dom>
            <previewer :list="item.previewerImages" ref="previewer" @on-index-change="logIndexChange"></previewer>
          </div>
        </div>
        <div class="target-info"><i class="iconfont">&#xe639;</i>签到时间：{{item.time_qd | dateFormat}}</div>
        <div class="target-info"><i class="iconfont">&#xe606;</i>签到地点：{{item.address_qd}}</div>
        <div class="target-info"><i class="iconfont">&#xe614;</i>关联客户：{{item.customer}}</div>
        <div class="target-info"><i class="iconfont">&#xe633;</i>联系人姓名：{{item.toucher}}</div>
        <div class="target-info" v-if="item.recordpath!=''">
          <i class="iconfont">&#xe687;</i>
          <div class="record-block" @click="playAudio(item.recordpath)"><i class="iconfont">&#xe600;</i></div>
          {{item.recordtime}}"
        </div>
      </div>
    </card>

    <tab>
      <tab-item selected @on-item-click="onItemClick('reply')">回复<span v-if="replayList.length">({{replayList.length}})</span></tab-item>
      <tab-item @on-item-click="onItemClick('praise')">赞<span v-if="praiseList.length">({{praiseList.length}})</span></tab-item>
    </tab>
    
    <card class="list-card" v-if="currentTabName=='reply'" v-for="item in replayList" :key="item.id">
      <div slot="header">
        <div class="sign-header" slot="header">
          <img class="sign-header-avtar" :src="item.avatar!=''?item.avatar:'/static/images/avtar.png'">
          <div class="sign-header-info">
            <div class="nickname">{{item.nickname}}</div>
            <div class="other-info">
              <span>{{item.time_action | dateFormat}}</span>
              <span>{{item.comefrom}} </span>
            </div>
          </div>
        </div>
        <flexbox class="card-operate-block replay-list-operate">
          <flexbox-item>
            <x-button v-if="item.visible == 'true'"
              @click.native="deleteReplyId = item.id;confirmShow=true;" title="删除">
              <i class="iconfont">&#xe6b5;</i>
            </x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button 
              @click.native="handleAddReply({type:0,targetid:item.id,plid:item.userid,signInId:detailObject.id})" title="回复">
              <i class="iconfont">&#xe621;</i>
            </x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button 
              @click.native="handlePraise({targetid:item.id,type:0},'inner')" title="赞">
              <i class="iconfont" v-if="item.is_zan == 0">&#xe717;</i>
              <i class="iconfont" v-else style="color:rgb(48,125,205)">&#xe717;</i>
              <span v-if="item.num_zan">({{item.num_zan}})</span>
            </x-button>
          </flexbox-item>
        </flexbox>
        <div v-transfer-dom>
          <confirm v-model="confirmShow" title="确认删除" @on-confirm="onConfirm">
            <p style="text-align:center;">确定要删除本条回复信息?</p>
          </confirm>
        </div>
      </div>
      <div slot="content" class="card-padding">
        <p class="sign-content"><span v-if="item.targetid">回复@{{item.targetname}}</span>{{item.info}}</p>
      </div>
    </card>

    <card class="list-card" v-if="currentTabName=='praise'" v-for="item in praiseList" :key="item.id">
      <div slot="header" class="sign-header">
        <img class="sign-header-avtar" :src="item.avatar!=''?item.avatar:'/static/images/avtar.png'">
        <span class="target-info">{{item.nickname}} {{item.comefrom}}</span>
      </div>
      <div slot="content" class="card-padding">
        <p class="sign-content">{{item.info}}</p>
      </div>
    </card>

    <group>
      <flexbox class="bottom-operate-block card-operate-block">
        <flexbox-item>
          <x-button 
            @click.native="handleAddReply({targetid:detailObject.id})" title="回复">
            <i class="iconfont">&#xe621;</i>
          </x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button 
            @click.native="handlePraise({targetid:detailObject.id,type:1},'outer')" title="赞">
            <i class="iconfont">&#xe717;</i>
          </x-button>
        </flexbox-item>
        <flexbox-item v-if="deleteButtonShow"><x-button title="删除"><i class="iconfont">&#xe6b5;</i></x-button></flexbox-item>
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
  TabItem,
  Previewer,
  TransferDom,
  Grid,
  GridItem,
  Confirm
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
    TabItem,
    Previewer,
    Grid,
    GridItem,
    Confirm
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      detailObject: {},
      dataList: [],
      replayList: [],
      praiseList: [],
      deleteButtonShow: false,
      currentTabName: "reply",
      confirmShow: false,
      deleteReplyId: ''
    };
  },
  methods: {
    playAudio(src) {
      if (
        this.currentAudioSrc == src &&
        !this.audio.ended &&
        !this.audio.paused
      ) {
        this.audio.pause();
      } else {
        this.currentAudioSrc = src;
        this.audio = new Audio(src);
        this.audio.play();
      }
    },
    logIndexChange(arg) {
      console.log(arg);
    },
    show(curItemIndex, curPicIndex) {
      // console.log(this.$refs.previewer[0])
      this.$refs.previewer[curItemIndex].show(curPicIndex);
    },
    onItemClick(value) {
      this.currentTabName = value;
    },
    handleAddReply(params) {
      this.$router.push({ name: "SignReplyForm", params: params });
    },
    onConfirm() {
      console.log(this.deleteReplyId)
      this.handleDeleteReply(this.deleteReplyId)
    },
    handleDeleteReply(wlbId) {
      api.fetchDeleteReply({ type: 1, wlbId: wlbId }).then(res => {
        if (res.data.status) {
          this.replayList = this.replayList.filter(item => {
            return item.id != wlbId;
          });
        }
      });
    },
    handlePraise(params, location) {
      /**
       * @param
       * type	int	1.签到2.日志3.日程4.消息（备用）5.通知公告 6.其它
       * targetid	String	赞对象的ID
       */
      api.fetchHandlePraise(params).then(res => {
        console.log(res.data);
        if (res.data.status) {
          if (location == "outer") {
            this.getFetchPraiseList();
          } else {
            this.getFetchReplyList();
          }
        }
      });
    },
    getFetchReplyList() {
      let params = this.$route.params;
      api.fetchReplyList(Object.assign({}, params, { type: 1 })).then(res => {
        if (res.data.status) {
          this.replayList = res.data.list;
        } else {
          console.log(res.data.msg);
        }
      });
    },
    getFetchPraiseList() {
      let params = this.$route.params;
      api.fetchPraiseList(Object.assign({}, params, { type: 1 })).then(res => {
        if (res.data.status) {
          this.praiseList = res.data.list;
        } else {
          console.log(res.data.msg);
        }
      });
    }
  },
  filters: {
    dateFormat: function(el) {
      return moment(el).format("YYYY-MM-DD HH:mm");
    }
  },
  mounted() {
    console.log("signDetail", this);
    let params = this.$route.params;
    params.targetid = params.wsiId;
    api.fetchSignDetail(params).then(res => {
      if (res.data.status) {
        let resultData = res.data.data;
        this.signInId = resultData.id;

        let detailList = [];
        let previewerImages = [];
        let item_pic = resultData.pic != "" ? resultData.pic.split("#") : [];
        item_pic.map(it => {
          let temp = { msrc: it, src: it };
          previewerImages.push(temp);
        });
        resultData.previewerImages = previewerImages;
        detailList.push(resultData);

        this.detailObject = resultData;
        this.dataList = detailList;
      } else {
        console.log(res.data.msg);
      }
    });
    this.getFetchReplyList();
    this.getFetchPraiseList();
  }
};
</script>
<style scoped lang="less">
.sign-list-content {
  padding-bottom: 60px;

  .list-card {
    padding: 0 10px;
    .record-block {
      width: 40%;
      display: inline-block;
      background-color: rgba(242, 242, 242, 1);
    }
  }

  .bottom-operate-block {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .card-operate-block {
    button.weui-btn {
      font-size: 12px;
      color: #999;
      border: none;
      background-color: transparent;
    }
    .weui-btn:after {
      border: none;
    }
  }

  .sign-header {
    position: relative;
    display: flex;
    padding: 10px 0;

    .sign-header-avtar {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .sign-header-info {
      padding-left: 10px;

      .nickname {
        line-height: 24px;
      }

      .other-info {
        color: #999;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  .sign-content {
    font-size: 14px;
    line-height: 24px;
  }

  .target-info {
    color: #999;
    font-size: 12px;
    line-height: 2;
  }

  .btn-submit {
    position: fixed;
    bottom: 0;
  }

  .previewer-sign-img {
    width: 100%;
    height: 100%;
  }

  .previewer-sign-div {
    width: 80px;
    height: 80px;
    display: inline-block;
    overflow: hidden;
  }

  .replay-list-operate {
    width: 40%;
    position: absolute;
    right: 0;
    top: 10px;

    button.weui-btn {
      font-size: 12px;
      padding: 0;
      line-height: 1.5;
    }
  }
}
</style>