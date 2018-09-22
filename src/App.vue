<template>
  <div id="app">
    <router-view/>
    <toast v-model="$store.state.resumeState.isToastShow" type="text" :time="800" is-show-mask text="Hello World" :position="position"></toast>
  </div>
</template>

<script>
  import {
    Toast
  } from "vux";
  export default {
    name: 'App',
    components: {
      Toast,
    },
    data() {
      return {
        account: "",
        validCode: "",
        showPositionValue:false,
        position:'middle'
      };
    },
    mounted(){
      console.log(this.$store.state.resumeState.isToastShow)
      this.showPositionValue = this.$store.state.resumeState.isToastShow
    }
  }
</script>


<style lang="less">
  @import '~vux/src/styles/1px.less';
  html,
  body {
    height: 100%;
    margin: 0;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
</style>
