<template>
  <div>
    <Group>
      <XInput title="手机号码" required placeholder="必填" v-model="account" />
    </Group>
    <Group>
      <XInput required v-model="validCode" placeholder="必填" title="验证码">
        <x-button slot="right" type="primary" @click.native="handleSendCode" mini>发送验证码</x-button>
      </XInput>
    </Group>
    <Group>
      <XButton @click.native="handleLogin" type="primary">登录</XButton>
    </Group>
    <!-- <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" :position="position"></toast> -->
    <!-- <button @click="aaaaa">aaaaa</button> -->
  </div>
</template>

<script>
  import axios from "axios";
  import {
    Group,
    XInput,
    XButton,
    Toast
  } from "vux";
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
        validCode: "",
        showPositionValue:true,
        position:'middle'
      };
    },
    mounted(){
            // this.$vux.toast.text("验证码已发送", "middle");
    },
    methods: {
      aaaaa(){
        console.log('aaa')
        this.showPositionValue = true
      },
      handleSendCode() {
        if (!this.account)
          return this.$vux.toast.text("请输入手机号码", "middle");


        
        axios
          .post("/wx/sendBindCode", {
            account: this.account
          }, {
            timeout: 200
          })
          .then(res => {
            console.log(res);
            this.$vux.toast.text("验证码已发送", "middle");
          })
        .catch(e => {
          console.log(e,'timeouterr');
          // this.$vux.toast.text(e.response.data.msg, "middle");
        });
      },
      handleLogin() {
        if (!this.account || !this.validCode)
          return this.$vux.toast.text("请检查必填项是否填写", "middle");
        axios
          .post("/wx/saveBind", {
            account: this.account,
            validCode: this.validCode
          })
          .then(res => {
            console.log(res);
            this.$router.push({
              name: "SignSuccess"
            });
          })
          .catch(e => {
            console.log(e.response.data);
            this.$vux.toast.text(e.response.data.msg, "middle");
          });
      }
    }
  };
</script>

<style scoped>
  
</style>
