<!--主页 -->
<template>
  <div class="homePage">
    <div class="homePage-body">
      <group title="" class="homePage-search">
          <search placeholder="慧营销工具"
            v-model="value"
          ></search>
           <input v-model="value" style="display:none">
      </group>
      <div class="homePage-main">
        <div class="homePage-content"
          v-for="(item, index) in itemsList"
          :key="item.name"
          :data-index="index"
          >
          <div class="homePage-content-bg" :class="item.class" @click="clickSkip(item.href)" >
              <h4>{{item.name}}</h4>
              <span>维护精准客户</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
        Group,
        Search,
        GridItem,
        Grid
  } from "vux";
  export default {
    name: "homePage",
    components: {
        Group,
        Search,
        GridItem,
        Grid
    },
    data() {
      return {
        value: '',
        items:[
            {name:"我的客户",href:'ClientList',class:'myCust',key:'1'},
            {name:"联系人",href:'contact',class:'contacts',key:'2'},
            {name:"撞单查询",href:'clientCheck',class:'checks',key:'3'},
            {name:"签到",href:'SignList',class:'signIn',key:'4'},
            {name:"附近客户",href:'clientNearby',class:'nearbyCust',key:'5'},
            {name:"消息中心",href:'messageCenter',class:'messageCenter',key:'6'},
            {name:"经营报告",href:'reportview',class:'report',key:'7'},
        ],
      };
    },
    methods:{
      clickSkip(va){
        this.$router.push({ name: va });
      }
    },
    computed: {
      itemsList: function () {
          let vm = this
          return this.items.filter(function (item) {
          return item.name.toLowerCase().indexOf(vm.value.toLowerCase()) !== -1
        })
      }
    },
  };
</script>
<style scoped>
.homePage-search{
    margin: 20px 0;
}
.homePage-main{
  padding: 10px;
  display: flex;
  justify-content:flex-start;
  /* justify-content:space-between; */
  /* justify-content: space-around; */
  flex-wrap:wrap;
}
.homePage-main .homePage-content{
    width: 50%;
    text-align: center;
    height: 5em;
}
.homePage-content-bg{
    width: 90%;
    height: 90%;
    position: relative;
}
.homePage-content-bg h4{
  font-size: 14;
  position: absolute;
  top: 15px;
  left: 12px;
}
.homePage-content-bg span{
  position: absolute;
  font-size: 11px;
  color:gray;
  bottom: 6px;
  left: 12px;
}
/*我的客户*/
.myCust{
  display: inline-block;
  background-image: url(./img/myCust.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
/*附近客户*/
.nearbyCust{
  display: inline-block;
  background-image: url(./img/nearbyCust.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
/*经营报告*/
.report{
  display: inline-block;
  background-image: url(./img/report.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
/*联系人*/
.contacts{
  display: inline-block;
  background-image: url(./img/contacts.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
/*签到*/
.signIn{
  display: inline-block;
  background-image: url(./img/signIn.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
/*消息中心*/
.messageCenter{
  display: inline-block;
  background-image: url(./img/messageCenter.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
/*撞单查询*/
.checks{
  display: inline-block;
  background-image: url(./img/checks.png);
  background-repeat:no-repeat;
  background-size: 100% 100%;
}
</style>
