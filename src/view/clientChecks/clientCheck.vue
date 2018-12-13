<!--客户查重-->
<template>
  <div class="clientCheck">
      <search
          @on-change="getResult"
          v-model="value"
          @on-submit="onSubmit"
          @on-cancel="cancel"
          ref="search">
      </search>
      <div class="clientCheck-main">
        <div v-if="data" class="clientCheck-content" v-for="item in items" @click="homePage(item.customerid)" :key="item.customerid">
            <p class="clientCheck-content_cs_name">
              <span>{{item.cs_name}} </span>
              <span class="clientCheck-content_status" style="border: 1px solid #fb8734;color: #fb8734;" v-if="item.status == 0">待分配资源</span>
              <span class="clientCheck-content_status" style="border: 1px solid #65b5fe;color: #65b5fe;" v-if="item.status == 1">资源</span>
              <span class="clientCheck-content_status" style="border: 1px solid #f8ae23;color: #f8ae23;" v-if="item.status == 2">意向</span>
              <span class="clientCheck-content_status" style="border: 1px solid #50c8c2;color: #50c8c2;" v-if="item.status == 3">签约</span>
              <span class="clientCheck-content_status" style="border: 1px solid #3281fd;color: #3281fd;" v-if="item.status == 4">沉默客户</span>
              <span class="clientCheck-content_status" style="border: 1px solid #74a1ef;color: #74a1ef;" v-if="item.status == 5">流失</span>
              <span class="clientCheck-content_status" style="border: 1px solid #6c74d9;color: #6c74d9;" v-if="item.status == 6">公海</span>
            </p> 
            <p>所有者 : {{item.ownername}}</p>
            <p>创建时间 :{{item.creattime | dateFormat}}</p>
            <p>销售进程 :{{item.level_sale}}</p>
        </div>
        <div class="no-search-tip" v-if="!data">输入查询值查询客户是否已存在</div>
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
      value: '',
      items:[],
      data:false,
    }
  },
  methods: {
    getResult (val) {},
    cancel(){
      console.log('cancel')
    },
    onSubmit () {
        this.$refs.search.setBlur()
        let that = this
        if(this.value){
            axios.get('/resource/mycust/custCheck',{
              params:{
                  keyword:this.value
                }
              })
              .then(function(response){
                let{data:{list}} = response
                console.log('list=',list)
                if(list){
                  that.data = true
                  console.log('data=true')
                  that.items = list
                }else{
                  that.data = false
                  console.log('data=false')
                }
              })
              .catch(function(error){
                //console.log('error='+error); 
              })
        }else{
          this.data = false
        }
    },
    homePage(custId){
      this.$router.push({ name: "ClientPreview",params:{custId:custId} });
    }
  },
  mounted(){
   
  }
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
    padding: 1px 4px;
    border-radius: 5px;
    font-size: 14px;
}
</style>
