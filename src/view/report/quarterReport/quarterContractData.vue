<!--客户查重-->
<template>
  <div class="content">
    <h2>签约数据</h2>


    <div style="padding:10px 20px;">新增签约数<span style="display:inline-block;position: relative;"><span style="position:absolute;left:36px;width:45px;top:-17px;">{{contract.info.signNum}}个</span><span style="position:absolute;left:87px;top:-17px;width:110px;">环比：<span v-if='contract.info.signNumRatio!="-"' :style="{color:contract.info.signNumRatio>0?'red':'green'}">{{contract.info.signNumRatio}}</span><span v-if='contract.info.signNumRatio=="-"'>-</span></span></span></div>
    <div style="padding:10px 20px;">新增订单数<span style="display:inline-block;position: relative;"><span style="position:absolute;left:36px;width:45px;top:-17px;">{{contract.info.orderNum}}个</span><span style="position:absolute;left:87px;top:-17px;width:110px;">环比：<span v-if='contract.info.signNumRatio!="-"' :style="{color:contract.info.signNumRatio>0?'red':'green'}">{{contract.info.orderNumRatio}}</span><span v-if='contract.info.orderNumRatio=="-"'>-</span></span></span></div>
    <div style="padding:10px 20px;">签单金额<span style="display:inline-block;position: relative;"><span style="position:absolute;left:52px;width:45px;top:-17px;">{{contract.info.saleMoney}}万</span><span style="position:absolute;left:102px;top:-17px;width:110px;">环比：<span v-if='contract.info.saleMoneyRatio!="-"' :style="{color:contract.info.signNumRatio>0?'red':'green'}">{{contract.info.saleMoneyRatio}}</span><span v-if='contract.info.signNumRatio=="-"'>-</span></span></span></div>
    <div style="padding:10px 20px;">回款金额<span style="display:inline-block;position: relative;"><span style="position:absolute;left:52px;width:45px;top:-17px;">{{contract.info.signMoney}}万</span><span style="position:absolute;left:102px;top:-17px;width:110px;">环比：<span v-if='contract.info.signMoneyRatio!="-"' :style="{color:contract.info.signMoneyRatio>0?'red':'green'}">{{contract.info.signNumRatio}}</span><span v-if='contract.info.signNumRatio=="-"'>-</span></span></span></div>


     <!-- <div style="padding:10px 20px;">新增签约数<span style="float:right"><span style="margin-right:50px;">{{contract.info.signNum}}个</span>环比：{{contract.info.signNumRatio}}</span></div>
    <div style="padding:10px 20px;">新增订单数<span style="float:right"><span style="margin-right:50px;">{{contract.info.orderNum}}个</span>环比：{{contract.info.orderNumRatio}}</span></div>
    <div style="padding:10px 20px;">签单金额<span style="float:right"><span style="margin-right:50px;">{{contract.info.saleMoney}}万</span>环比：{{contract.info.saleMoneyRatio}}</span></div>
    <div style="padding:10px 20px;">回款金额<span style="float:right"><span style="margin-right:50px;">{{contract.info.signMoney}}万</span>环比：{{contract.info.signMoneyRatio}}</span></div> -->
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
    name: "quarterContractData",
    components: {
      Group,
      XButton,
      Search,
      PopupRadio,
      FormPreview,
      CellFormPreview,
      Cell
    },
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
    margin-bottom: 20px;
    padding: 20px;
  }
  h2{
    font-weight: 400;
    color: #4a77b2;
  }
  .vux-circle-demo[data-v-fd022b72] {
    padding-top: 0 !important;
  }
</style>
