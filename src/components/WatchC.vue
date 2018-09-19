<template id="app">
  <div class="">
    <Group>
      <XInput title="起止时间" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="所在学校" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="学历及专业" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="担任职务及获奖情况" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="证明人" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="联系方式" value="" text-align="right" placeholder="请填写"></XInput>
      <x-textarea title="学习情况介绍" v-model="value"></x-textarea>
    </Group>
    <Group>
        <XButton type="primary" @click.native="getCode">下一步</XButton>
    </Group>
  </div>
</template>
<script>
  import {
    Group,
    XButton,
    XInput,
    XTextarea
  } from "vux";
  export default {
    name: "WatchC",
    components: {
      Group,
      XButton,
      XInput,
      XTextarea
    },
    data() {
      return {
        // msg: "fadsfsdfsfsdfsdf"

      };
    },
    methods: {
      getCode(){
        console.log("发送验证码")
      }
  }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

</style>
