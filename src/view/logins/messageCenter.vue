<!--消息中心-->
<template>
  <div class="messageCenter">
      <div class="messageCenter-content" v-for="item in items" :key="item.title" v-if="data">
          <h4>{{ item.title }}</h4>
          <p style="margin:10px 0;color:#999999;">{{ item.time_action | dateFormat}}</p>
          <p v-html="item.info">{{item.info}}</p>
      </div>
      <div class="no-data-tip" v-if="!data">什么都没有！</div>
  </div>
  
</template>
<script>
import { Group, Search, GridItem, Grid,XButton  } from "vux";
import axios from "axios";
export default {
  name: "messageCenter",
  components: {
    Group,
    Search,
    GridItem,
    Grid,
    XButton
  },
  data() {
    return {
      infoMessageCenter: {},
      items: '',
      data:''
      
    };
  },
  created() {
    let _this = this;
    axios.post("/message/selectAllMessage", {
        // params: {
        page: 0
        // }
      })
      .then(function(response) {
        let {data: { list }} = response;
        console.log('list',list)
        if(list){
           _this.data = true
            console.log('data=true')
            _this.items = list;
        }else{
         _this.data = false
          console.log('data=false')
        }
        
      })
      .catch(function(error) {
        //console.log('error='+error);
      });
  },
  methods: {
    click(){
      
    }
  },
};
</script>

<style>
  .messageCenter-content{
    padding:20px;
    border-bottom:1px solid #e6e6e6;
  }
</style>
