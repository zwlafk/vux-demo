<template>
  <div class="sign-list-content">
    <div class="no-data-tip" v-if="dataList.length==0">什么数据都没有！</div>
    <card
      class="list-card"
      v-if="dataList.length>0"
      v-for="(item, index) in dataList"
      :key="item.id"
    >
      <div class="sign-header" slot="header">
        <img class="sign-header-avtar" :src="item.avatar!=''?item.avatar:'/static/images/avtar.png'">
        <div class="sign-header-info">
          <div class="nickname">{{item.nickname}}</div>
          <div class="other-info">
            <span>{{item.time_action | dateFormat}}</span>
            <span v-if="item.comefrom!=''">来自{{item.comefrom}}</span>
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
            <previewer
              :list="item.previewerImages"
              ref="previewer"
              @on-index-change="logIndexChange"
            ></previewer>
          </div>
        </div>
        <div class="target-info">
          <i class="iconfont">&#xe606;</i>
          签到地点：{{item.address_qd}}
        </div>
        <div class="target-info">
          <i class="iconfont">&#xe614;</i>
          关联客户：{{item.customer}}
        </div>
        <div class="target-info" v-if="item.recordpath!=''">
          <i class="iconfont">&#xe687;</i>
          <div class="record-block" @click="playAudio(item.recordpath)">
            <i class="iconfont">&#xe600;</i>
          </div>
          {{item.recordtime}}"
        </div>
        <flexbox :gutter="8" class="card-operate-block">
          <flexbox-item>
            <!-- 回复 -->
            <x-button @click.native="handleAddReply(item.id)" title="回复">
              <i class="iconfont">&#xe621;</i>
            </x-button>
          </flexbox-item>
          <flexbox-item>
            <!-- 赞 -->
            <x-button @click.native="handlePraise(item.id)" title="赞">
              <i class="iconfont" v-if="item.is_zan == 0">&#xe717;</i>
              <i class="iconfont" v-else style="color:rgb(48,125,205)">&#xe717;</i>
              <span v-if="item.num_zan">({{item.num_zan}})</span>
            </x-button>
          </flexbox-item>
          <flexbox-item v-if="item.ifCandel">
            <!-- 删除 -->
            <x-button @click.native="currentWsiId=item.id;confirmShow=true" title="删除">
              <i class="iconfont">&#xe6b5;</i>
            </x-button>
          </flexbox-item>
        </flexbox>

        <div v-transfer-dom>
          <confirm v-model="confirmShow" title="确认删除" @on-confirm="onConfirm">
            <p style="text-align:center;">确定要删除本条签到信息?</p>
          </confirm>
        </div>
      </div>
    </card>

    <group>
      <x-button type="primary" class="bottom-operate-block btn-submit" @click.native="handleSignForm" title="签到">签到</x-button>
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
  Previewer,
  TransferDom,
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
    Previewer,
    Confirm
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      currentAudioSrc: "",
      audio: {},
      confirmShow: false,
      currentWsiId: "",
      dataList: [
        // {previewerImages:[
        //   {src:'http://qftx-hyx-file-test.oss-cn-hangzhou.aliyuncs.com/headImg/ny5/ny5001'},
        //   {src:'http://qftx-hyx-file-test.oss-cn-hangzhou.aliyuncs.com/headImg/ny5/ny5001'}
        // ]},
        // {previewerImages:[
        //   {src:'http://qftx-hyx-file-test.oss-cn-hangzhou.aliyuncs.com/headImg/ny5/ny5002'},
        //   {src:'http://qftx-hyx-file-test.oss-cn-hangzhou.aliyuncs.com/headImg/ny5/ny5002'}
        // ]}
      ],
      deleteButtonShow: true
    };
  },
  filters: {
    dateFormat: function(el) {
      return moment(el).format("YYYY-MM-DD HH:mm");
    }
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
      // console.log(this.$refs.previewer)
      // console.log(curItemIndex,curPicIndex)

      this.$refs.previewer[curItemIndex].show(curPicIndex);
    },
    handleAddReply(targetid) {
      this.$router.push({
        name: "SignReplyForm",
        params: { type: 1, targetid: targetid }
      });
    },
    handlePraise(targetid) {
      /**
       * @param
       * type	int	1.签到2.日志3.日程4.消息（备用）5.通知公告 6.其它
       * targetid	String	赞对象的ID
       */
      var params = { targetid: targetid, type: 1 };
      api.fetchHandlePraise(params).then(res => {
        console.log(res.data);
        if (res.data.status) {
          this.getFetchList();
        }
      });
    },
    handleSignDetail(wsiId) {
      this.$router.push({ name: "SignDetail", params: { wsiId: wsiId } });
    },
    handleDeleteSign(wsiId) {
      api.fetchDeleteSign({ wsiId: wsiId, type: 1 }).then(res => {
        if (res.data.status) {
          this.dataList = this.dataList.filter(item => {
            return item.id != wsiId;
          });
        } else {
          console.log(res.data.msg);
        }
      });
    },
    handleSignForm() {
      this.$router.push({ name: "SignForm" });
    },
    onConfirm() {
      this.handleDeleteSign(this.currentWsiId);
    },
    getFetchList() {
      api.fetchList().then(res => {
        if (res.data.status) {
          console.log(res.data.list);
          let dataList = res.data.list;

          dataList.map((item, index) => {
            let previewerImages = [];
            let item_pic = item.pic != "" ? item.pic.split("#") : [];
            item_pic.map(it => {
              let temp = { msrc: it, src: it };
              previewerImages.push(temp);
            });
            // console.log("previewerImages",previewerImages)
            dataList[index].previewerImages = previewerImages;
          });
          this.dataList = dataList;
        } else {
          console.log(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.getFetchList();
  }
};
</script>
<style scoped lang="less">
.sign-list-content {
  padding-bottom: 60px;

  .bottom-operate-block {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .list-card {
    padding: 0 10px;

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

    .record-block {
      width: 40%;
      display: inline-block;
      background-color: rgba(242, 242, 242, 1);
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
    // 控制显示的行，超出...
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  .target-info {
    color: #999;
    font-size: 12px;
    line-height: 2;
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
}
</style>