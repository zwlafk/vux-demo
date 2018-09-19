<template >
  <div class="">
    <Group>
      <XInput title="姓名"
              v-model="formData.name"
              text-align="right"
              placeholder="姓名" />
    </Group>
    <!-- <popup-radio >sdfsdf</popup-radio> -->
    <Group>
      <datetime title="出生日期"
                v-model="formData.birth"
                format="YYYY-MM-DD"
                placeholder="出生日期" />
    </Group>
    <Group>
      <XInput title="政治面貌"
              value=""
              v-model="formData.politic"
              text-align="right"
              placeholder="政治面貌" />
    </Group>
    <Group>
      <x-address title="籍贯"
                 v-model="formData.birthplace"
                 :list="addressData"
                 placeholder="请选择地址" />
    </Group>
    <Group>
      <XInput title="身份证号"
              value=""
              v-model="formData.identify"
              text-align="right"
              placeholder="请输入身份证号" />
    </Group>
    <!-- <x-address title="婚姻状况" v-model="value" placeholder="未婚" ></x-address> -->
    <!-- <cell-box is-link ink >婚姻状况</cell-box> -->
    <Group>
      <x-input title="户籍性质"
               v-model="formData.birthplaceProp"
               text-align="right"
               placeholder="户籍性质"></x-input>
    </Group>
    <Group>
      <x-address title="户籍所在地"
                 v-model="formData.bir"
                 :list="addressData"
                 placeholder="请选择地址"></x-address>
    </Group>
    <Group>
      <x-address title="现住地址"
                 v-model="formData.address"
                 :list="addressData"
                 placeholder="请选择地址"></x-address>
    </Group>
    <Group>
      <XButton @click.native="handleClick"
               type="primary">下一步</XButton>
    </Group>
  </div>
</template>
<script>
import axios from "axios";
import {
  Group,
  XInput,
  Datetime,
  XButton,
  PopupRadio,
  XAddress,
  CellBox,
  ChinaAddressData
} from "vux";
export default {
  name: "BaseInfo1",
  components: {
    Group,
    XInput,
    Datetime,
    XButton,
    PopupRadio,
    XAddress,
    CellBox,
    ChinaAddressData
  },
  data() {
    return {
      addressData: ChinaAddressData,
      formData: {}
      // msg: "fadsfsdfsfsdfsdf"
    };
  },
  methods: {
    handleClick() {
      // this.$router.push({path:'/form/baseinfo2'})
      axios
        .get("/user?ID=12345")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      os;
      console.log("val", this.formData);
    }
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
