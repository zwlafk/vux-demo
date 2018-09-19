<template  >
  <div class="">

    <Group>
      <XInput title="手机号码" value="" text-align="right" placeholder="请填写投递简历中的手机号码"/>
    </Group>
    <Group>
      <XButton link="/signsuccess"
               type="primary">签到</XButton>
    </Group>
  </div>
</template>

<script>
import { Group, XInput, XButton } from "vux";
export default {
  name: "Main",
  components: {
    Group,
    XButton,
    XInput
  },
  data() {
    return {
      // msg: "fadsfsdfsfsdfsdf"
    };
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
