<template>
  <div>
    <group>
      <x-input title="点评内容"
               v-model="info"></x-input>

    </group>

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
  TabItem
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
    TabItem
  },
  data() {
    return {
      info: "",
      customerid: this.$route.params.custId
    };
  },

  methods: {
    handleClick() {
      console.log(this.$data);
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
