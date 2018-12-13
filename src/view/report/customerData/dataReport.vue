<!--客户查重-->
<template>
  <div>
    <div class="content" style="background-color: #4a77b0;">
        <div>
            <dataGuestDepartment :analysic="gd"></dataGuestDepartment>
        </div>
        <!-- z-index: 999999; -->
        <div v-if="ps.length" style="position: relative;">
            <dataProductSalesD :analysic="ps" :pszong="pszong"></dataProductSalesD>
        </div>
        <div v-show="!ps.length"  style="background-color:#fff;margin-bottom:20px;padding-top:10px;">
            <h2 style="margin-left:22px;">产品销售分布</h2>
            <p class="no-data-tip" style="height:50px;margin-bottom:20px;height:123px;"></p>
        </div>
        <div v-if="ct.length" style="position: relative;">
            <dataCustomerType :analysic="ct" :ctzong="ctzong"></dataCustomerType>
        </div>
        <div v-show="!ct.length"  style="background-color:#fff;margin-bottom:20px;padding-top:10px;">
            <h2 style="margin-left:22px;">客户类型分布</h2>
            <p class="no-data-tip" style="height:50px;margin-bottom:20px;height:123px;"></p>
        </div>
         <div v-for="(item,index) in ADC" :key="index" style="position: relative;">
            <h2 style="position:absolute;top:11px;left:22px;">客户属性分布-<span style="font-size:18px;">{{item.field.fieldName}}</span></h2>
            <dataCustomerAttribute :analysic="item"></dataCustomerAttribute>
        </div>
    </div>
  </div>
</template>

<script>
import {
  ButtonTab,
} from "vux";
import axios from "axios";
// import dataAnalysis from "./dataAnalysis";
import dataGuestDepartment from "./dataGuestDepartment";
import dataProductSalesD from "./dataProductSalesD";
import dataCustomerAttribute from "./dataCustomerAttribute";
import dataCustomerType from "./dataCustomerType";
export default {
  name: "dataReport",
  components: {
    ButtonTab,
    // dataAnalysis,
    dataGuestDepartment,
    dataProductSalesD,
    dataCustomerAttribute,
    dataCustomerType,
  },
  props:{
     groupIds:{
      type:String,
      default:""
    },
    gdSum:{
      type:Object,
     default:function(){
        return {}
      }
    },
    psSum:{
      type:Array,
      default:function(){
        return []
      }
    },
    ctSum:{
      type:Array,
      default:function(){
        return []
      }
    },
    ADCSum:{
      type:Array,
      default:function(){
        return []
      }
    },
  },
  data() {
    return {

      list: {
        
      },
      gd:{
        result:{
          allNum:0,
          resNum:0,
          custNum:0,
          signNum:0,
          silentNum:0,
          losingNum:0,
          }
      },
      ps:[],
      ct:[],
      ADC:[],
      pszong:{},
      ctzong:{},
      
    };
  },
  methods: {
    
  },
  created() {
    let that = this;
    function guestDepartment() {
      return axios.get("/layout/user/custStateChart",{params:{
        type:"1",
        groupIds:that.groupIds,
      }});
    }
    function customerArea() {
      return axios.get("/layout/user/provinceChart");
    }
    function productSales() {
      return axios.get("/layout/user/productChart",{params:{
        type:"1",
        groupIds:that.groupIds,
      }});
    }
    function customerType() {
      return axios.get("/layout/user/custTypeChart",{params:{
        type:"1",
        groupIds:that.groupIds,
      }});
    }
    function customerADC() {
      return axios.get("/layout/user/allCustomcolumnChart",{params:{
        groupIds:that.groupIds,
      }});
    }

    axios.all([guestDepartment(),customerArea(),productSales(),customerType(),customerADC()])

      .then(axios.spread(function(guestD,customerA,productS,customerT,custADc) {
          that.gd=guestD.data
          that.ps=productS.data.result.list
          that.pszong = productS.data.result
          that.ctzong = customerT.data.result
          console.log(that.pszong,"sb陈")
          that.ct=customerT.data.result.list
          that.ADC=custADc.data.result.list
        })
      );
  },
  watch:{
    gdSum:function(val){
      this.gd=val
      console.log("客户分布到底更美观",this.gd)
    },
    psSum:function(val){
      this.ps=val
    },
    ctSum:function(val){
      this.ct=val
    },
    ADCSum:function(val){
      this.ADC=val
    },
  }
};
</script>

<style>
.nav {
  background-color: #4a77b0;
}
.btn,
.select {
  width: 30%;
  background-color: #4a77b0;
  color: #fff;
  border: none;
  height: 40px;
}
.btn-a{
  outline: none;
}
.select {
  width: 40%;
  text-align: center;
}
.body{
  background-color: #4a77b0;
}
.content{
  background-color: #fff;
}
</style>
