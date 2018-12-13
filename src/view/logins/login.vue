<template>
  <div class="login">
    <div class="login_logo">
      <img src="./img/logo.png" alt="">
    </div>
    <div class="login_main">
      <!-- 用户名 -->
      <group title="">
        <x-input placeholder="用户名" name="user" v-model="user"></x-input>
      </group>
      <!-- 密码 -->
      <group>
        <x-input placeholder="密码" type="password" name="password" v-model="password"></x-input>
      </group>
    </div>
    <div class="login_btn">
      <group>
        <!-- <x-button v-if="user == user_data && password == password_data" type="primary" @click.native="homePage" :disabled="user==''||password==''">登录</x-button> -->
        <!-- <x-button v-if="user != user_data || password != password_data" type="primary" :disabled="user==''||password==''">登录</x-button> -->
        <x-button class="btn" type="button" @click.native="homePage" :disabled="user==''||password==''">登录</x-button>
      </group>
    </div>
  </div>
</template>
<script>
import api from "@/api/logins";
import {
    Group,
    XButton,
    XInput
} from "vux";
import axios from 'axios';
export default {
  name: "login",
  components: {
    Group,
    XButton,
    XInput
  },
  data() {
    return {
      user:'hyx53y001',
      password:'123456',
    };
  },
  methods: {
    homePage(){
      var that = this
      console.log(this.user)
      console.log(this.password)
      //this.$router.push({ name: "homePage" });
      // let that = this
      // '/wx/relation'
      axios.post('wx/weblogin', {
        // params: {
          // "userId":"YuXiaoHao",
          // "corpId":"ww3782a0763bfa65df"
        // }
        "account":this.user,
        "password":this.password
      })
      .then(function (response) {
        // let {data:{list}} = response
        // console.log('response='+response)
        // console.log('成功')
        console.log(response.data)
        document.cookie="JSESSIONID="+response.data.id;
        that.$router.push({name:'homePage'})
      })
      .catch(function (error) {
         console.log('error='+error); 
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style>
  .pointOut{
    color:red;
  }
  .login_logo{
    text-align: center;
    margin: 86px 0 40px 0;
  }
  .login_logo img{
    width: 80px;
    height: 80px;
  }
  .login_main{
    margin:0 auto;
    width: 75%;
  }
  .login_btn{
    margin: 75px 0;
  }
  .login_main .weui-cells:before,
  .login_btn .weui-cells:before{
    border-top:none;
  }
  .login_btn .weui-cells:after{
    border-bottom:none;
  }
  .login_btn .btn{
    width: 75%;
    background-color: #459bfe;
    border-radius: 5px;
  }
</style>
