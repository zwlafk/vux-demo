<template >
  <div class="">
    <!-- <Group>
      <cell-box is-link>杭州住房情况</cell-box>
      <XInput title="身体状况"
              value=""
              text-align="right"
              placeholder="神经病"></XInput>
      <cell-box is-link>学历</cell-box>
      <selector title="学位"
                v-model="value"
                :options='[{key:"dadsa",value:"dsadassssss"}]'></selector>
      <XInput title="所学专业"
              value=""
              text-align="right"
              placeholder="视觉传达"></XInput>
      <XInput title="辅修专业"
              value=""
              text-align="right"
              placeholder="辅修专业"></XInput>
      <XInput title="毕业院校"
              value=""
              text-align="right"
              placeholder="毕业院校"></XInput>
      <XInput title="资格技能证书"
              value=""
              text-align="right"
              placeholder="资格技能证书"></XInput>
      <XInput title="英语水平"
              value=""
              text-align="right"
              placeholder="良好"></XInput>
      <datetime title="预计到岗时间"
                v-model="value"
                format="YYYY-MM-DD"
                placeholder="预计到岗时间"></datetime>
      <datetime title="实际到岗时间"
                v-model="value"
                format="YYYY-MM-DD"
                placeholder="实际到岗时间"></datetime>
      <cell-box is-link>目前薪酬</cell-box>
      <x-textarea title="爱好特长"
                  v-model="value"
                  placeholder="请填写"></x-textarea>
      <x-textarea title="其他要求"
                  v-model="value"
                  placeholder="请填写"></x-textarea>
      <x-textarea title="个人职业规划"
                  v-model="value"
                  placeholder="请填写"></x-textarea>
    </Group> -->
    <Group>
      <XButton link="/form/family" type="primary">下一步</XButton>
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
  Selector
} from "vux";
export default {
  name: "BaseInfo2",
  components: {
    Group,
    XInput,
    Datetime,
    PopupRadio,
    XAddress,
    CellBox,
    XTextarea,
    XButton,
    Selector
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
