<!--客户查重-->
<template>
  <div class="content">
    <h2>签约数据</h2>
    <div style="padding:10px 20px;">新增签约数<span style="float:right">{{contract.info.signNum}}个</span></div>
    <div style="padding:10px 20px;">新增订单数<span style="float:right">{{contract.info.orderNum}}个</span></div>
    <div style="padding:10px 20px;">签单金额<span style="float:right">{{contract.info.signMoney}}万</span></div>
    <div style="padding:10px 20px;">回款金额<span style="float:right">{{contract.info.saleMoney}}万</span></div>
  </div>
</template>

<script>
  import {
    Group,
    XButton,
    Search,
    PopupRadio,
    FormPreview,
    CellFormPreview,
    Cell
  } from "vux";
  export default {
    name: "dayContractData",
    components: {
      Group,
      XButton,
      Search,
      PopupRadio,
      FormPreview,
      CellFormPreview,
      Cell
    },
    // props:['contract'],
    props:{
        contract:{
            type:Object,
            default:function(){
                return {
                  info:{
                    signNum:"",
                    orderNum:"",
                    signMoney:"",
                    saleMoney:"",
                  }
                }
            }
        }
    },
   
};
</script>

<style>
  .content{
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    
  }
  h2{
    font-weight: 400;
    color: #4a77b2;
  }
</style>
