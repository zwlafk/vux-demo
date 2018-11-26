<template>
  <div class="clientNearby">
    <div>
      <!-- <input v-model="keyword" placeholder="关键词"> -->
      <!-- <input v-model="location" placeholder="地区"> -->
      <search v-model="keyword" ref="search"  >
      </search>
    </div>
    <div>
      <baidu-map class="map" center="杭州">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :isOpen="true"></bm-navigation>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
      </baidu-map>
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
  import axios from 'axios';
  export default {
    name: "clientNearby",
    components: {
        Group,
        Search,
        GridItem,
        Grid
    },
    data() {
      return {
        location: '杭州',
        keyword: '杭州火车站'
      };
    },
    created() {
      let that = this
      axios.get('/message/selectAllMessage', {
        params: {
          // page:'1'
        }
      })
      .then(function (response) {
        let {data:{list}} = response
        console.log(list)
        that.items = list
        console.log(this.items)
      })
      .catch(function (error) {
        //console.log('error='+error); 
      });
    }
  };
</script>
<style>
.map {
  width: 100%;
  height: 400px;
}
</style>