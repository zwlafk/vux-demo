<template >
  <div class="">
    <group>
      <cell title="基本信息"
            is-link
            :border-intent="false"
            :arrow-direction="showContent ? 'up' : 'down'"
            @click.native="showContent = !showContent"></cell>

      <template v-if="showContent">
        <cell-form-preview  :list="list"></cell-form-preview>
      </template>
    </group>
    <Group>
      <cell title="基本信息"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </Group>
    <Group>
      <cell title="目前收入"></cell>
      <cell-form-preview :list="list1"></cell-form-preview>
    </Group>
    <Group>
      <cell title="求职意向"></cell>
      <cell-form-preview :list="list2"></cell-form-preview>
    </Group>
    <Group>
      <cell title="工作经验"></cell>
      <cell-form-preview :list="list3"></cell-form-preview>
    </Group>
    <Group>
      <cell title="教育经历"></cell>
      <cell-form-preview :list="list4"></cell-form-preview>
    </Group>
    <Group>
      <cell title="技能/语言"></cell>
      <cell-form-preview :list="list5"></cell-form-preview>
    </Group>
    <Group>
      <cell title="证书"></cell>
      <cell-form-preview :list="list6"></cell-form-preview>
    </Group>
    <Group>
      <cell title="培训经历"></cell>
      <cell-form-preview :list="list7"></cell-form-preview>
    </Group>
  </div>
</template>
<script>
import {
  Group,
  XInput,
  Datetime,
  PopupRadio,
  XAddress,
  CellBox,
  XTextarea,
  XButton,
  Selector,
  CellFormPreview,
  Cell
} from "vux";

export default {
  name: "resumeDetails",
  components: {
    Group,
    XInput,
    Datetime,
    PopupRadio,
    XAddress,
    CellBox,
    XTextarea,
    XButton,
    Selector,
    CellFormPreview,
    Cell
  },
  data() {
    return {
      showContent:false,
      list: [
        { label: "性别:", value: "女" },
        { label: "年龄:", value: "100" },
        { label: "学历:", value: "小学" },
        { label: "户籍:", value: "er" },
        { label: "工作年限:", value: "aa" },
        { label: "政治面貌:", value: "a" },
        { label: "求职状态:", value: "a" },
        { label: "居住地:", value: "a" }
      ],
      list1: [
        { label: "40" },
        { label: "基本工资:", value: "10" },
        { label: "补贴:", value: "10" },
        { label: "奖金:", value: "10" },
        { label: "股权收益:", value: "10" }
      ],
      list2: [
        { label: "职业:", value: "10" },
        { label: "行业:", value: "10" },
        { label: "期望薪资:", value: "10" },
        { label: "期望地点:", value: "10" },
        { label: "到岗时间:", value: "10" },
        { label: "工资类型:", value: "10" },
        { label: "自我评价:", value: "10" }
      ],
      list3: [
        { label: "40" },
        { label: "基本工资:", value: "10" },
        { label: "补贴:", value: "10" },
        { label: "奖金:", value: "10" },
        { label: "股权收益:", value: "10" }
      ],
      list4: [
        { label: "职业:", value: "10" },
        { label: "行业:", value: "10" },
        { label: "期望薪资:", value: "10" },
        { label: "期望地点:", value: "10" },
        { label: "到岗时间:", value: "10" },
        { label: "工资类型:", value: "10" },
        { label: "自我评价:", value: "10" }
      ],
      list5: [{ label: "aa:", value: "" }, { label: "aa", value: "" }],
      list6: [
        { label: "asdf", value: "" },
        { label: "aaa", value: "" },
        { label: "aaa", value: "" }
      ],
      list7: [
        { label: "2018.07:", value: "" },
        { label: "aaaa", value: " " },
        { label: "aa:", value: "" }
      ]
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
