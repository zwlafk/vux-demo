<template>
  <div>
    <group title="点评内容">
      <x-textarea :max="150"
                  required
                  v-model="info"></x-textarea>

    </group>
    <div>
      <span style="margin-right: 1em">关联客户</span>
      <span>
        {{currentClientName}}
      </span>
    </div>
    <x-button class="btn"
              type="primary"
              @click.native="handleClick">保存</x-button>
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
  XInput,
  Sticky,
  Tab,
  TabItem,
  XTextarea
} from "vux";
export default {
  name: "ClientCommentForm",
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
    XInput,
    Tab,
    TabItem,
    XTextarea
  },
  data() {
    return {
      info: "",
      currentClientName: this.$store.state.clientState.currentClient.cs_name,
      customerid: this.$route.params.custId
    };
  },

  methods: {
    handleClick() {
      console.log(this.$data);
      if (!this.info) {
        return this.$vux.toast.show({
          text: "请输入点评内容",
          position: "middle",
          type: "text"
        });
      }
      api.saveComment({ ...this.$data }).then(res => {
        if (!res.status) return;
        this.$router.back();
      });
    }
  },
  mounted() {
    // api.initFollow();
  }
};
</script>
<style lang="less" scoped>
</style>
