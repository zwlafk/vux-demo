<template>
  <div class="wrapper">

    <card>
      <div slot="header">星期一</div>
      <div slot="content"
           class="card-padding">张xx</div>

    </card>
    <div class="link-btn"
         @click="link2Resume"></div>
    <router-view/>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XButton, Cell, Group, XInput, Card } from "vux";
export default {
  name: "Interview",
  components: {
    Flexbox,
    XButton,
    FlexboxItem,
    Group,
    Cell,
    XInput,
    Card
  },
  data() {
    return {};
  },
  methods: {
    link2Resume() {
      console.log("dasdasdsad");
      this.$router.push({ name: "resume" });
    }
  }
};
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  height: 100%;
  .link-btn {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    background-color: #32a0ed;
  }
}
.card-padding {
  padding: 15px;
}
</style>
