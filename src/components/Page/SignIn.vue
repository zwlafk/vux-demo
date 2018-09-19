<template  >
  <div>
    <Group>
      <XInput title="手机号码"
              required
              placeholder="简历中填写的手机号码"
              v-model="account" />
    </Group>

    <Group>
      <XButton @click.native="handleSignin"
               type="primary">登录</XButton>
    </Group>
  </div>
</template>

<script>
import axios from "axios";
import { Group, XInput, XButton, Toast } from "vux";
export default {
  name: "Main",
  components: {
    Toast,
    Group,
    XButton,
    XInput
  },
  data() {
    return {
      account: "",
    };
  },
  methods: {

    handleSignin() {
      if (!this.account )
        return this.$vux.toast.text("请填写手机号码", "middle");
      // axios
      //   .post("/wx/saveBind", {
      //     account: this.account,
      //     validCode: this.validCode
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.$router.push({ name: "SignSuccess" });
      //   })
      //   .catch(e => {
      //     console.log(e.response.data);
      //     this.$vux.toast.text(e.response.data.msg, "middle");
      //   });
    }
  }
};
</script>

<style scoped>
</style>
