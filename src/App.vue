<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  mounted() {
    axios
      .get("/wx/getIndexOnOff")
      .then(res => {
        if (res.data.status) {
          const {
            data: { linkman: isCompanyUser }
          } = res;
          this.$store.commit("userInfoState/setUserInfo", {
            isCompanyUser
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="less">
@import "./assets/style/index.less";
@import "~vux/src/styles/1px.less";
#app {
  overflow: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow: auto;
}
</style>
