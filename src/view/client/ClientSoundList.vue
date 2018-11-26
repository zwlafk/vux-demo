<template>
  <div class="followlist-wrapper">
    <group>
      <template v-for="(item,index) in dataList">

        <cell-box class="followlist-item"
                  :key="index">
          <div class="followlist-item-info">

            <div class="followlist-item-title">{{item.toucher_name}} {{item.time|dateFormat}}</div>
            <div class="followlist-item-content">{{item.call_num}}{{item.type|transCallType}}</div>
          </div>
          <div class="playaudio"
               @click="playAudio(item.record_path)">播放</div>
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
  name: "ClientSoundList",
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
  methods: {
    playAudio(src) {
      this.audio = new Audio(src);
      this.audio.play();
    }
  },
  mounted() {
    // api.getCustFollowList({});
    api
      .getSoundList({ customerid: this.custId, page: 1 })
      .then(res => {
        this.dataList = res.data.list;
        this.dataList = [
          {
            id: "31b318e2f35045d6a03626d3a59e42cd",
            toucher_name: "531531531",
            call_num: 13333333333,
            type: 1
          },
          {
            id: "31b328e2f35045d6a03626d3a59e42cd",
            toucher_name: "531531531",
            call_num: 13333333333,
            type: 2
          },
          {
            id: "31b318e2q35045d6a03626d3a59e42cd",
            toucher_name: "531531531",
            call_num: 13333333333,
            type: 4
          }
        ];
      })
      .catch(e => {});
  }
};
</script>
<style lang="less" scoped>
.followlist-wrapper {
  min-height: 100%;
  .followlist-item {
    // flex-direction: column;
    justify-content: space-between;
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
