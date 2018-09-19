<template >
  <div class="">
    <Group>
      <XInput title="起止时间" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="单位及部门" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="职务" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="离职原因" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="证明人" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="联系方式" value="" text-align="right" placeholder="请填写"></XInput>
      <x-textarea title="工作经验及业绩说明" v-model="value"></x-textarea>
    </Group>
    <Group>
        <XButton type="primary">下一步</XButton>
    </Group>
  </div>
</template>
<script>
  import {
    Group,
    XInput,
    XButton,
    XTextarea
  } from "vux";
  export default {
    name: "WatchB",
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
    }
  };
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

</style>
