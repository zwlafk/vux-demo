<template>
  <div class="">
    <template v-if="data.hasData">
      <group class="group-cell-without-border">
        <cell :title="data.cs_name"
              :link="{name:'ClientDetail'}">
          <div slot="inline-desc">
            <dl>
              <dt>最近跟进时间</dt>
              <dd>{{genMoment(data.time_near).format('YYYY-MM-DD HH:mm')}}</dd>
            </dl>
            <dl>
              <dt>客户状态</dt>
              <dd>123</dd>
            </dl>
            <dl>
              <dt>销售进程</dt>
              <dd>123</dd>
            </dl>
            <dl>
              <dt>所有者</dt>
              <dd>123</dd>
            </dl>
            <dl>
              <dt>联系地址</dt>
              <dd>{{data.address}}</dd>
            </dl>
            <dl>
              <dt>行动标签</dt>
              <dd>123</dd>
            </dl>
          </div>
        </cell>
      </group>
      <!-- 联系人 -->
      <group class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>联系人</span>
            <span class="cell-titlebtn-pullright"
                  @click="handleAddContact">+</span>
          </div>
          <!-- content -->
          <div slot="inline-desc">
            <p>xx 2011-01-01 00:00</p>
            <p>水分很大空间发挥空间的撒谎方可加萨</p>
          </div>
        </cell>
        <cell :link="{name:'contact'}">
          <div slot="title">
            <i>查看全部</i>
          </div>
        </cell>
      </group>
      <!-- 跟进记录 -->
      <group class="group-cell-without-border">
        <cell class="cell-btntitle">
          <!-- title -->
          <div slot="title">
            <span>跟进记录</span>
          </div>
          <!-- content -->
          <div slot="inline-desc">
            <p>xx 2011-01-01 00:00</p>
            <p>水分很大空间发挥空间的撒谎方可加萨</p>
          </div>
        </cell>
        <cell :link="{name:'ClientFollowList'}">
          <div slot="title">
            <i>查看全部</i>
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
          <div slot="inline-desc">
            <p>xx 2011-01-01 00:00</p>
            <p>水分很大空间发挥空间的撒谎方可加萨</p>
          </div>
        </cell>
        <cell :link="{name:'ClientFeedbackList'}">
          <div slot="title">
            <i>查看全部</i>
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
                  @click="handleAddContact">+</span>
          </div>
          <!-- content -->
          <div slot="inline-desc">
            <p>xx 2011-01-01 00:00</p>
            <p>水分很大空间发挥空间的撒谎方可加萨</p>
          </div>
        </cell>
        <cell :link="{name:'ClientCommentList'}">
          <div slot="title">
            <i>查看全部</i>
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
          <div slot="inline-desc">
            <p>xx 2011-01-01 00:00</p>
            <p>水分很大空间发挥空间的撒谎方可加萨</p>
          </div>
        </cell>
        <cell :link="{name:'ClientSoundList'}">
          <div slot="title">
            <i>查看全部</i>
          </div>
        </cell>
      </group>
    </template>
    <div class="height-block"></div>
    <tabbar class="tabbar-btn-group">
      <tabbar-item @on-item-click="handleTabbarItemClick('follow')">
        <span slot="label">跟进</span>
      </tabbar-item>
      <tabbar-item @on-item-click="handleTabbarItemClick('sign')">
        <span slot="label">签到</span>
      </tabbar-item>
      <tabbar-item @on-item-click="handleTabbarItemClick('abandon')">
        <span slot="label">放弃客户</span>
      </tabbar-item>
      <tabbar-item @on-item-click="handleTabbarItemClick('signed')">
        <span slot="label">签约</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import api from "@/api/client";
import moment from "moment";
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
    XButton,
    CellBox,
    Cell
  },
  data() {
    return {
      data: { hasData: false },
      custId: this.$route.params.custId
    };
  },
  methods: {
    genMoment(time){
      return moment(time)
    },
    handleAddContact() {
      this.$router.push({ name: "contactEdit" });
    },
    handleTabbarItemClick(type) {
      console.log(type);
      let eventMapper = {
        follow() {
          // this.$router.push({name:''})
        },
        sign() {
          // this.$router.push({name:''})
        },
        abandon() {
          this.$vux.confirm.show({
            // title: "Title",
            content: "是否确认放弃该客户？",
            onConfirm: () => {
              console.log("放弃");
            }
          });
        },
        signed() {
          this.$vux.confirm.show({
            // title: "Title",
            content: "是否确认签约该客户？",
            onConfirm: () => {
              console.log("签约");
            }
          });
        }
      };
      eventMapper[type].call(this);
    }
  },
  mounted() {
    api.getCust({ custId: this.custId }).then(res => {
      this.data = res.data.data;
      this.data.hasData = true;
    });
    api.getCustFormFieldList().then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang="less" scoped>
dt {
  width: 7em;
  float: left;
  // text-align-last: justify;
  // text-align: justify;
}
dd {
  color: #c1c1c1;
  padding-left: 7em;
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
</style>
