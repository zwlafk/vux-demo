<template>
  <div class="">
    <Group v-if="this.status==1">
      <XButton type="primary">面试反馈</XButton>
    </Group>
    <Group v-if="this.status==2">
      <XButton type="primary">淘汰</XButton>
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
  XInput,
  CellFormPreview
} from "vux";
export default {
  name: "HandleResume",
  components: {
    Flexbox,
    XButton,
    FlexboxItem,
    Group,
    Cell,
    XInput,
    CellFormPreview
  },
  data() {
    return {
      status:'',
      isBaseInfoShow: false,
      isIntentionShow: false,
      isWorkExpShow: false,
      list: [
        { label: "性别", value: "女" },
        { label: "年龄", value: "100" },
        { label: "学历", value: "小学" },
        { label: "户籍", value: "户籍户籍" },
        { label: "工作年限", value: "工作年限工作年限" },
        { label: "政治面貌", value: "政治面貌政治面貌" },
        {
          label: "求职状态",
          value:
            "求职状态求职状态求职状态求职状态求职状态求职状态求职状态求职状态求职状态求职状态求职状态求职状态"
        },
        { label: "居住地", value: "居住地居住地" }
      ]
    };
  },
  mounted() {
    console.log(this.$store.state.resumeState, "this.$store.state.resumeState");
    this.status = this.$store.state.resumeState.resume.status
  }
};
</script>

<style scoped>
</style>
