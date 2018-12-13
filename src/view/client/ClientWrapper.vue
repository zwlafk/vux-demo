<template>
  <div class="wrapper">

    <router-view />
  </div>
</template>

<script>
import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  Search,
  CellFormPreview
} from "vux";
export default {
  name: "ClientWrapper",
  components: {
    Group,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    Search,
    CellFormPreview
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper{
  height: 100%;
}
</style>
