<template>
  <div class="">
    <group>
      <x-textarea :max="200" placeholder="请输入回复" v-model="formData.msg"></x-textarea>
    </group>
    <div class="height-block"></div>
    <x-button class="bottom-btn"
              type="primary"
              @click.native="handleClick">回复</x-button>

  </div>
</template>

<script>
import api from "@/api/sign";

import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  CellFormPreview,
  XInput,
  XTextarea
} from "vux";
export default {
  name: "SignReplyForm",
  components: {
    Group,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    CellFormPreview,
    XInput,
    XTextarea
  },
  data() {
    return {
      formData: {
        type: "1",
        targetid: "",
        page: "",
        comefrom: "",
        msg: "",
        plid: ""
      }
    };
  },
  methods: {
    getDevicesInfo(){
      let ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf('andriod') > -1) {
        this.formData.comefrom = 'andriod'
      }else if(/iphone|ipad/i.test(ua)){
        this.formData.comefrom = 'ios'
      }else{
        this.formData.comefrom = 'pc端'
      }
    },
    handleClick() {
      api.fetchAddReply(this.formData).then(()=>{
        // console.log(this)
        if (this.$route.query.goindex === 'true') {
          this.$router.push('/')
        } else {
          this.$router.back(-1)
        }
      })
    }
  },
  mounted() {
    console.log(this.$route)
    this.getDevicesInfo()
    Object.assign(this.formData,this.$route.params)
  }
};
</script>
<style lang="less" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
</style>
