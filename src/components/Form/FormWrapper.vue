<template>
  <div class="">
    应聘职位 | 面试时间
    <router-view/>
  </div>
</template>

<script>
  import {
    Flexbox,
    FlexboxItem,
    XButton,
    Cell,
    Group,
    XInput
  } from "vux";
  export default {
    name: "EntryForm",
    components: {
      Flexbox,
      XButton,
      FlexboxItem,
      Group,
      Cell,
      XInput
    },
    data() {
      return {

      };
    }
  };
</script>

<style scoped>

</style>
