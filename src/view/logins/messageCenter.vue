<!--消息中心-->
<template>
  <div class="messageCenter">
      <div class="messageCenter-content" v-for="item in items" :key="item">
          <h4>{{ item.title }}</h4>
          <p style="margin:10px 0;color:#999999;">{{ item.time_action }}</p>
          <p>{{ item.info }}</p>
      </div>
        <!-- <x-button type="primary"  @click.native="click">ss</x-button> -->
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
      items: []
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
        _this.items = list;
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
