<!--客户查重-->
<template>
  <div>
    <div class="content" style="background-color: #4a77b0;">
        <div>
            <dataGuestDepartment :analysic="gd"></dataGuestDepartment>
        </div>
        <div v-if="ps.length">
            <dataProductSalesD :analysic="ps"></dataProductSalesD>
        </div>
        <div v-if="ct.length">
            <dataCustomerType :analysic="ct"></dataCustomerType>
        </div>
         <div v-for="(item,index) in ADC" :key="index">
            <dataCustomerAttribute v-if="item.fieldData.data.length" :analysic="item"></dataCustomerAttribute>
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
    }
  },
  data() {
    return {

      list: {
        
      },
      gd:{},
      ps:[],
      ct:[],
      ADC:[],
      
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
          that.ct=customerT.data.result.list
          that.ADC=custADc.data.result.list

          console.log(guestD)
          console.log(customerA)
          console.log(111)
          console.log( 'that.gd',that.gd)
          console.log(222)
          console.log( 'that.ps',that.ps)
          console.log(333)
          console.log( 'that.ct',that.ct)
          console.log(444)
          // console.log( 'that.ca',that.ca)
          console.log(555)
         

          console.log( 'that.ADC',that.ADC)
          // console.log(productS)
          // console.log(customerT)
          // console.log(customerAt)
        })
      );
  },
  // watch:{
  //   ADC:function(val){
  //     let that = this
  //     let arr =[]
  //     val.map((item,index)=>{
  //       axios.get('/layout/user/customcolumnChart', {
  //         params: {
  //           customColumn:item.fieldCode
  //         }
  //       })
  //       .then(function (response) {
  //         console.log(response,"zhaohohoh");
  //         // console.log(that,"dasdasdasdasd")
  //         that.ca=response.data.result.data

  //         console.log(that.ca,"张飞")
  //         // arr.push(that.ca)
  //         // console.log(arr,"ssssssssssssssssssssss")
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //     })
  //   },
  //   ca:function(newval,oldval){
  //     this.ABC.push(newval)
  //       console.log(this.ABC.push(oldval),"xinzhi")
  //       console.log(oldval,"旧制")
  //       console.log(this.ca,"咯")
  //   }
  // }
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
