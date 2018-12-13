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
          v-if="!item.isHide"
          >
            <div class="homePage-content-bg" :class="item.class" @click="clickSkip(item.href)" >
                <h4>{{item.name}}</h4>
                <span>{{item.describe}}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
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
        linkman:'',
        busirep:'',
      };
    },
    methods:{
      clickSkip(va){
        this.$router.push({ name: va });
      },
     
    },
    computed: {
      itemsList: function () {
          let vm = this
          return this.items.filter(function (item) {
          return item.name.toLowerCase().indexOf(vm.value.toLowerCase()) !== -1
        })
      },
      items(){
        return [
            {name:"我的客户",describe:'客户维护与查询',href:'ClientList',class:'myCust',key:'1'},
            {name:"联系人",describe:'联系人维护与查询',href:'contact',class:'contacts',key:'2',isHide:!this.linkman},
            {name:"撞单查询",describe:'避免客户撞单',href:'clientCheck',class:'checks',key:'3'},
            {name:"签到",describe:'销售上门拜访',href:'SignList',class:'signIn',key:'4'},
            {name:"附近客户",describe:'附近客户查询',href:'clientNearby',class:'nearbyCust',key:'5'},
            {name:"消息中心",describe:'消息提醒、避免遗漏',href:'messageCenter',class:'messageCenter',key:'6'},
            {name:"经营报告",describe:'汇总企业经营数据',href:'reportview',class:'report',key:'7',isHide:!this.busirep},
        ]
      }
    },
    created() {
      let _this = this;
      axios.get("/wx/getIndexOnOff", {
          // params: {
          // page: 0
          // }
        })
        .then(function(response) {
          // let {data: { list }} = response;
          if(response.data.status){
            _this.linkman = response.data.linkman;
            _this.busirep = response.data.busirep;
          }else{
            console.log('status为false')
          }
          
        })
        .catch(function(error) {
          //console.log('error='+error);
        });
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
