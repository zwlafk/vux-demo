<template>
  <div class="">
    <template v-if="hasData">
      <group class="group-cell-without-border">
        <cell :title="data.cs_name"
              :link="{name:'ClientDetail'}">

          <Descriptor slot="inline-desc"
                      :dataSource="data"
                      :dataMapper="dataMapper" />

        </cell>
      </group>
      <!-- 联系人 -->
      <group v-if="isCompanyUser"
             class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>联系人</span>
            <span class="cell-titlebtn-pullright"
                  @click="handleAddContact"><i class="iconfont">&#xe61a;</i></span>
          </div>
          <!-- content -->
          <div slot="inline-desc"
               v-if="data.toucher_size">
            <div v-for="item in data.list_toucher"
                 :key="item.id">
              <p>{{`${item.nickname} ${item.position}`}}</p>
              <div v-if="item.telphone"
                   class="contact-list-item">
                <span class="contact-list-item-tel">常用电话 {{item.telphone}}</span>
                <span><a :href="`tel:${item.telphone}`"><i class="iconfont">&#xe605;</i></a></span>
              </div>
              <div v-if="item.telphonebak"
                   class="contact-list-item">
                <span class="contact-list-item-tel">备用电话 {{item.telphonebak}}</span>
                <span><a :href="`tel:${item.telphonebak}`"><i class="iconfont">&#xe605;</i></a></span>
              </div>

            </div>

            <!-- <template v-for="item in data.list_toucher">
              <p>{{nickname}}</p>
              <p>水分很大空间发挥空间的撒谎方可加萨</p>
            </template> -->

          </div>
        </cell>
        <cell :link="{name:'contact',params:{rciId:custId}}"
              v-if="data.toucher_size">
          <div slot="title">
            <i>查看全部{{' | '+data.toucher_size}}</i>
          </div>
        </cell>
      </group>

      <!-- 跟进记录 -->
      <group class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>跟进记录</span>
            <span class="cell-titlebtn-pullright"
                  @click="handleAddFollow"><i class="iconfont">&#xe61a;</i></span>
          </div>
          <!-- content -->

          <div slot="inline-desc"
               v-if="data.gjjl_size">
            <!-- <p>xx 2011-01-01 00:00</p>
            <p>水分很大空间发挥空间的撒谎方可加萨</p> -->
            <div v-for="item in data.obj_gjjl"
                 :key="item.id">
              <p style="font-size:14px">{{item.nickname}} | {{item.time|dateFormat}}</p>
              <p>{{item.info}}</p>

            </div>
          </div>
        </cell>
        <cell :link="{name:'ClientFollowList'}"
              v-if="data.gjjl_size">
          <div slot="title">
            <i>查看全部{{' | '+data.gjjl_size}}</i>
          </div>
        </cell>
      </group>

      <!-- 服务回访 -->
      <group class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>服务回访</span>
          </div>
          <!-- content -->
          <div slot="inline-desc"
               v-if="data.fwhf_size">
            <div v-for="item in data.obj_fwhf"
                 :key="item.id">
              <p>{{item.nickname}} {{item.time|dateFormat}}</p>
              <p>{{item.info}}</p>

            </div>
          </div>
        </cell>
        <cell :link="{name:'ClientFeedbackList'}"
              v-if="data.fwhf_size">
          <div slot="title">
            <i>查看全部{{' | '+data.fwhf_size}}</i>
          </div>
        </cell>
      </group>

      <!-- 点评记录 -->
      <group class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>点评记录</span>
            <span class="cell-titlebtn-pullright"
                  @click="handleAddComment"><i class="iconfont">&#xe61a;</i></span>
          </div>
          <!-- content -->
          <div slot="inline-desc"
               v-if="data.dp_size">
            <div v-for="item in data.obj_dp"
                 :key="item.id">
              <p>{{item.nickname}} {{item.time|dateFormat}}</p>
              <p>{{item.info}}</p>

            </div>
          </div>
        </cell>
        <cell :link="{name:'ClientCommentList'}"
              v-if="data.dp_size">
          <div slot="title">
            <i>查看全部{{' | '+data.dp_size}}</i>
          </div>
        </cell>
      </group>

      <!-- 通话记录 -->
      <group class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>通话记录</span>
          </div>
          <!-- content -->
          <div slot="inline-desc"
               v-if="data.calllg_size">
            <div class="soundlist-item"
                 v-for="item in data.list_calllg"
                 :key="item.id">
              <div>
                <p>{{item.toucher_name}} {{item.time|dateFormat}} {{item.time_len|formatSeconds}}</p>
                <p>{{item.call_num}}{{item.type|transCallType}}</p>
              </div>
              <div v-if="item.record_path"
                   class="playaudio"
                   @click="playAudio(item.record_path)"><i class="iconfont">&#xe610;</i></div>

            </div>
          </div>
        </cell>
        <cell :link="{name:'ClientSoundList'}"
              v-if="data.calllg_size">
          <div slot="title">
            <i>查看全部{{' | '+data.calllg_size}}</i>
          </div>
        </cell>
      </group>
    </template>
    <div class="height-block"></div>
    <tabbar v-if="sale_status!==''"
            class="tabbar-btn-group">
      <!--  资源：跟进、签到、放弃客户、签约
            意向：跟进、签到、放弃客户、签约
            签约：跟进、签到 -->
      <!-- sale_status  1-待分配，2-资源，3-意向客户，4-公海客户，5-资源回收站，6-签约客户，7-沉默客户，8-流失客户'
 -->
      <tabbar-item v-if="sale_status==3||sale_status==2||sale_status==6"
                   @on-item-click="handleTabbarItemClick('follow')">
        <span slot="label">跟进</span>
      </tabbar-item>
      <tabbar-item v-if="sale_status==3||sale_status==2||sale_status==6"
                   @on-item-click="handleTabbarItemClick('sign')">
        <span slot="label">签到</span>
      </tabbar-item>
      <tabbar-item v-if="sale_status!=6"
                   @on-item-click="handleTabbarItemClick('abandon')">
        <span slot="label">放弃客户</span>
      </tabbar-item>
      <tabbar-item v-if="sale_status!=6"
                   @on-item-click="handleTabbarItemClick('signed')">
        <span slot="label">签约</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import api from "@/api/client";
import moment from "moment";
import Descriptor from "@/components/Descriptor";
import {
  Group,
  XButton,
  Tabbar,
  TabbarItem,
  Flexbox,
  FlexboxItem,
  CellBox,
  Cell
} from "vux";
export default {
  name: "ClientPreview",
  components: {
    Group,
    Flexbox,
    Tabbar,
    TabbarItem,
    FlexboxItem,
    Descriptor,
    XButton,
    CellBox,
    Cell
  },
  filters: {
    transCallType(val) {
      if (!val) return "";
      // 呼叫类型（1：已接来电-呼入已接，2：未接来电-呼入未接，3：已拨电话-呼出已接，4：未接去电-呼出未接）
      let mapper = {
        1: "已接来电-呼入已接",
        2: "未接来电-呼入未接",
        3: "已拨电话-呼出已接",
        4: "未接去电-呼出未接"
      };
      return mapper[val];
    }
  },
  computed: {
    // contactNumList() {
    //   if (!this.hasData) return [];
    //   if (this.data.toucher_size) return this.list_toucher.split();
    // }
  },
  data() {
    return {
      isCompanyUser: this.$store.state.userInfoState.userInfo.isCompanyUser,
      data: {},
      hasData: false,
      type: 0,
      custId: this.$route.params.custId,
      sale_status: "",
      dataMapper: {
        custTypeName: "客户类型",
        time_near: "最近跟进时间",
        sale_status: "客户状态",
        sale_jc: "销售进程",
        ownername: "所有者",
        address: "联系地址",
        label: "行动标签"
      }
    };
  },
  methods: {
    playAudio(src) {
      this.audio = new Audio(src);
      this.audio.play();
    },
    genMoment(time) {
      return moment(time);
    },
    handleAddContact() {
      this.$router.push({
        name: "contactEdit",
        params: { rciId: this.custId }
      });
    },
    handleAddFollow() {
      this.$router.push({ name: "ClientFollowForm" });
    },
    handleAddComment() {
      this.$router.push({ name: "ClientCommentForm" });
    },
    handleTabbarItemClick(type) {
      console.log(type);
      let eventMapper = {
        follow() {
          this.handleAddFollow();
        },
        sign() {
          this.$router.push({ path: "/sign/signform" });
        },
        abandon() {
          this.$vux.confirm.show({
            // title: "Title",
            content: "是否确认放弃该客户？",
            onConfirm: () => {
              api.giveUpCust({ custId: this.custId }).then(res => {
                this.$vux.toast.show({
                  text: "",
                  position: "middle",
                  type: "success"
                });
              });
            }
          });
        },
        signed() {
          this.$vux.confirm.show({
            // title: "Title",
            content: "是否确认签约该客户？",
            onConfirm: () => {
              api
                .signedCust({ custId: this.custId })
                .then(res => {
                  this.$vux.toast.show({
                    text: "",
                    position: "middle",
                    type: "success"
                  });
                  return api.getCust({ custId: this.custId });
                })
                .then(res => {
                  this.data = res.data.data;
                  this.$store.commit(
                    "clientState/setCurrentClient",
                    res.data.data
                  );
                  this.type = res.data.data.type;
                  this.sale_status = res.data.data.sale_status;
                  this.hasData = true;
                })
                .catch(() => {});
            }
          });
        }
      };
      eventMapper[type].call(this);
    }
  },
  mounted() {
    api
      .getCust({ custId: this.custId })
      .then(res => {
        this.data = res.data.data;
        this.$store.commit("clientState/setCurrentClient", res.data.data);
        this.type = res.data.data.type;
        this.sale_status = res.data.data.sale_status;
        this.hasData = true;
      })
      .catch(() => {});

    // api.getCustFollowList({customerid:this.custId,page:0})
  }
};
</script>
<style lang="less" scoped>
.contact-list-item {
  display: flex;
  &-tel {
    flex: 1;
  }
}
i {
  font-size: 12px;
  font-style: normal;
}
.weui-tabbar {
  position: fixed;
}
.height-block {
  height: 50px;
}
.soundlist-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
