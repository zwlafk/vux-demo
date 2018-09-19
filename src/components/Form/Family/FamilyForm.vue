<template>
  <div class="">
    主要家庭成员及社会关系
    <x-button mini type="primary">添加</x-button>
    <Group>
      <XInput title="称谓" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="姓名" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="年龄" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="所在单位" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="职务" value="" text-align="right" placeholder="请填写"></XInput>
      <XInput title="联系方式" value="" text-align="right" placeholder="请填写"></XInput>
    </Group>
    <Group>
        <XButton type="primary" link="BACK">保存</XButton>
    </Group>
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
  h1,
  h2 {
    font-weight: normal;
  }

</style>
