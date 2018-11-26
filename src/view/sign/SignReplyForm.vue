<template>
  <div class="">
    <group>
      <x-textarea :max="20" placeholder="test" v-model="formData.msg"></x-textarea>
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
        type: 1,
        targetid: "",
        page: "",
        comefrom: "",
        msg: "",
        plid: "accac85b55b84049b1c6d2554533e788"
      }
    };
  },
  methods: {
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
  }
};
</script>
<style lang="less" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
</style>
