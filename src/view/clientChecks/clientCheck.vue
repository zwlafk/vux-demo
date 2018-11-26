<!--客户查重-->
<template>
  <div class="clientCheck">
      <search
          @on-change="getResult"
          :results="results"
          v-model="value"
          @on-submit="onSubmit"
          ref="search">
      </search>
      <div class="clientCheck-main">
        <div class="clientCheck-content" v-for="item in items" @click="homePage(item.customerid)" :key="item">
            <p class="clientCheck-content_cs_name">
              <span>{{item.cs_name}} </span>
              <span class="clientCheck-content_status" v-if="item.status == 1">资源</span>
              <span class="clientCheck-content_status" v-if="item.status == 2">意向</span>
              <span class="clientCheck-content_status" v-if="item.status == 3">签约</span>
              <span class="clientCheck-content_status" v-if="item.status == 4">沉默客户</span>
              <span class="clientCheck-content_status" v-if="item.status == 5">流失</span>
              <span class="clientCheck-content_status" v-if="item.status == 6">公海</span>
            </p> 
            <p>所有者 : {{item.ownername}}</p>
            <p>创建时间 :{{item.creattime}}</p>
            <p>销售进程 :{{item.level_sale}}</p>
        </div>
      </div>
      
  </div>
</template>
<script>
  import {
      Search,
      Group,
      Cell,
      XButton
  } from "vux";
  import axios from 'axios';
  export default {
    name: "clientCheck",
    components: {
      Search,
      Group,
      Cell,
      XButton
    },
data() {
    return {
      results: [],
      value: '',
      items:[]
    }
  },
  methods: {
    getResult (val) {},
    onSubmit () {
        let that = this
        // console.log(that)
        // console.log("this.value",this.value)
        axios.get('/resource/mycust/custCheck',{
        params:{
          keyword:this.value
          }
        })
        .then(function(response){
          let{data:{list}} = response
          // console.log('response='+response)
          // console.log('list='+list)
          that.items = list
        })
        .catch(function(error){
          //console.log('error='+error); 
        })
    },
    homePage(custId){
      this.$router.push({ name: "ClientPreview",params:{custId:custId} });
    }
  },
  mounted(){}
}
</script>
<style>
.clientCheck{
  position:relative;
}
.clientCheck-main{
  position:absolute;
  top:45px;
  width:100%;
}
.clientCheck-content{
  border-bottom:1px solid #e6e6e6;
}
.clientCheck-content p{
    margin:10px;
    color:#7e7e7e;
}
.clientCheck-content p:first-child{
    color:black;
}
.clientCheck-content_cs_name{
  position:relative;
}
.clientCheck-content_status{
    position: absolute;
    right: 0;
    border: 1px solid #54c4c6;
    padding: 1px 4px;
    color: #54c4c6;
    border-radius: 5px;
    font-size: 14px;
}


</style>
