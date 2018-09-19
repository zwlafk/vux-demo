<template >
  <div class="">
    <Group>
      <XInput title="称谓" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="姓名" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="年龄" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="所在单位" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="职务" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="联系方式" value="" text-align="right" placeholder="请填写"></XInput>
    </Group>
    <Group>
        <XButton type="primary">下一步</XButton>
    </Group>
  </div>
</template>

<script>
  import {
    Group,
    XButton,
    XInput
  } from "vux";
  export default {
    name: "WatchA",
    components: {
      Group,
      XButton,
      XInput
    },
    data() {
      return {
      };
    }
  };
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

</style>
