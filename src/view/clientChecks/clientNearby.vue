<template>
  <div class="clientNearby">
    <div>
      <!-- <input v-model="keyword" placeholder="关键词"> -->
      <!-- <input v-model="location" placeholder="地区"> --> 
      <search v-model="keyword" ref="search"
        @on-submit="onSubmit"
        @on-cancel="cancel"
        >
      </search>
    </div>
    <div>
      <baidu-map class="map" center="杭州">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :isOpen="true"></bm-navigation>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <!-- <bm-local-search :keyword="keyword" :position="{lng: 234, lat: 234}" :auto-viewport="true"></bm-local-search> -->

        <bm-marker 
          v-for="(drop,index) in items" 
          :position="{lng: drop.lon, lat: drop.lat}" 
          :key="index" 
          animation="BMAP_ANIMATION_BOUNCE"
          @click="clickToggle(index,drop)"
          >
          <!-- <bm-label :content="drop.cs_name" :labelStyle="{color: 'red', fontSize : '16px'}" :offset="{width: -35, height: 30}"/> -->
          <bm-info-window :show="drop.isShow">{{drop.cs_name}}</bm-info-window>
        </bm-marker>
      </baidu-map>
      <div class="clientNearby_main" style="margin-top:-20px;">
        <group>
          <cell class="list_left" is-link value-align="left" v-for="item in items" :key='item.cs_name'>
            <div @click="details(item.customerid)" class="list_left_div">
               <p style="color:black;">{{item.cs_name}} </p>
               <p>{{item.address}} </p>
            </div>
            <div class="list_right">
              <img src="../logins/img/people.png" alt="">
              <p>到这里</p>
              <!-- <a href="https://map.baidu.com/">到这里</a> -->
            </div>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>
<script>
  import {
        Group,
        Search,
        GridItem,
        Grid,
        Cell
  } from "vux";
  import axios from 'axios';
  export default {
    name: "clientNearby",
    components: {
        Group,
        Search,
        GridItem,
        Grid,
        Cell
    },
    data() {
      return {
        location: '杭州',
        keyword: '',
        items:'',
      };
    },

    created() {
          let that = this
          axios.get('/near/customer/list',{
            params:{
                // "userid":"hyx53y001",
                // "compid":"hyx53y",
                "lat":"30.2910480267",
                "lon":"120.1261552476",
                "raidus":2000,
                "name":""
              }
          })
          .then(function(response){
            let{data:{result:{nearCustomers}}} = response
            console.log('created',nearCustomers)
            that.items = nearCustomers.map(e=>({...e,isShow:false}));
      
          })
          .catch(function(error){
            //console.log('error='+error); 
          })
      
    },
    methods:{
        onSubmit () {
          if(this.keyword){
            let thatt = this
            axios.get('/work/sign/search/customer',{
              params:{
                  // "userid":"hyx53y001",
                  // "compid":"hyx53y",
                  "lat":"30.2910480267",
                  "lon":"120.1261552476",
                  "raidus":2000,
                  "name":thatt.keyword
                }
            })
            .then(function(response){
              let{data:{result:{nearCustomers}}} = response
              let nearCustomerss = nearCustomers.map((e)=>({...e,isShow:false}));
              thatt.items = nearCustomerss.filter((item)=>{return item.lon!=0})
        
            })
            .catch(function(error){
              //console.log('error='+error); 
            })
          }

        },
        cancel(){
          let that = this
          axios.get('/near/customer/list',{
            params:{
                "lat":"30.2910480267",
                "lon":"120.1261552476",
                "raidus":2000,
                "name":""
              }
          })
          .then(function(response){
            let{data:{result:{nearCustomers}}} = response
            console.log('cancel',nearCustomers)
            that.items = nearCustomers.map(e=>({...e,isShow:false}));
      
          })
          .catch(function(error){
            //console.log('error='+error); 
          })
        },
        details(custId){
          this.$router.push({ name:'ClientPreview',params:{custId:custId} })
        },
        clickToggle(index,drop){
          this.items[index].isShow=!this.items[index].isShow
        },
       /*
        getLocationpoint() {
          let self = this
          if (navigator.geolocation){
              navigator.geolocation.getCurrentPosition(
                function (position) {
                  let latitude = position.coords.latitude;//获取纬度
                  let longitude = position.coords.longitude;//获取经度
                  console.log('latitude',latitude)
                  self.formData.lat = latitude
                  self.formData.lon = longitude
                  // self.getFetchNearCustList()
                }
              );
          }else{
              alert("不支持定位功能");
          }
        }, 
        getFetchNearCustList() {
          api.fetchNearCustList(
            {"lat":this.formData.lat,"lon":this.formData.lon}
          ).then((res)=>{
            this.radioCustList = res.data.result.nearCustomers
          })
        },
        */
    },
    mounted() {
        // this.getDevicesInfo()
        // this.getLocationpoint()
    },
  };
</script>
<style>
.map {
  width: 100%;
  height: 400px;
}
.weui-cell.list_left{
  padding-right:20%;
  position:relative;
  font-size: 14px;
  height: 35px;
}
.weui-cell.list_left p{
  min-height:19px ;
}
.list_left_div{
  width: 100%;
  position: absolute;
  top: -27px;
  height: 34px;
  left: -15px;
  padding: 10px 15px;
}
.list_right{
  position: absolute;
  right: -27%;
  top: -27px;
  background: #d7d7d7;
  height: 54px;
  width: 70px;
  text-align:center;
}
.list_right img{
  margin-top:6px;
}
.list_right a{
  display: block;
  /* line-height:55px; */
}
</style>