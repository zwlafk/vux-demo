<template>
  <div class="">
    简历详情
    <group>
      <cell title="基本信息"
            is-link
            :border-intent="false"
            :arrow-direction="isBaseInfoShow ? 'up' : 'down'"
            @click.native="isBaseInfoShow = !isBaseInfoShow" />

      <template v-if="isBaseInfoShow">
        <cell-form-preview :list="list"></cell-form-preview>
      </template>
    </group>
    <group>
      <cell title="求职意向"
            is-link
            :border-intent="false"
            :arrow-direction="isIntentionShow ? 'up' : 'down'"
            @click.native="isIntentionShow = !isIntentionShow" />

      <template v-if="isIntentionShow">
        <p>dsadasdasdasdasdas</p>
      </template>
    </group>
    <group>
      <cell title="工作经验"
            is-link
            :border-intent="false"
            :arrow-direction="isWorkExpShow ? 'up' : 'down'"
            @click.native="isWorkExpShow = !isWorkExpShow" />

      <template v-if="isWorkExpShow">
        <p>dsadasdasdasdasdas</p>
      </template>
    </group>
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
  XInput,
  CellFormPreview
} from "vux";
import { mapState, mapActions } from "vuex";
export default {
  name: "Resume",
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
  // methods: mapActions("resumeState", ["setResume"]),
  created() {
    console.log(this.$store.state, "ssssss");
    this.$store.commit("resumeState/setResume", {status:2,list:this.list});
  }
};
</script>

<style scoped>
</style>
