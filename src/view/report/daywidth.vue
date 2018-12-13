<template>
  <div>
      <div class="content">
            <h2>签约成员</h2>
            <div style="width:300px;" v-if="contract.info.saleMoney!=0">
                <div v-for="item in demo_data" :key="item.id" style="width:100%">
                    <span>{{item.name}}</span>
                    <div style="width:70%;position: relative;"><div class="item" :style='{width:item.percent}'></div><span style="position:absolute;top:-4px;right:-77px;">{{item.num}}万</span></div>
                </div>
            </div>
             <div style="width:300px;" v-if="contract.info.saleMoney==0">
                <div v-for="item in demo_data" :key="item.id" style="width:100%">
                    <span>{{item.name}}</span>
                    <div style="width:70%;position: relative;"><div class="item" :style='{width:0}'></div><span style="position:absolute;top:-4px;right:-77px;">{{item.num}}万</span></div>
                </div>
            </div>
            <!-- {{wid}} -->
      </div>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton } from 'vux'

export default {
    name:"daywidth",
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton
  },
  props:{
      wid:{
          type:Object,
          default:function(){
              return {
                  ranking:[]              
                }
          }
      },
      contract:{
            type:Object,
            default:function(){
                return {
                  info:{
                    saleMoney:"",
                  }
                }
            }
        }
  },
  computed:{
      demo_data:function(){
          let arr = this.contract.info.saleMoney
            let arrArray = []
            this.wid.ranking.map((item,id)=>{
                let arrX={}
                arrX.name = item.userName
                arrX.num = item.saleMoney
                arrX.percent = arrX.num/arr*100+"%"
                arrArray.push(arrX)
            })
        //   return arrArray

          let compare = function (property) {
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }   
            } 
          return (arrArray.sort(compare('num')))
      }
},
}
</script>
<style>
    .item{
        background-color:#0033ff;
        height:10px;
        display:inline-block;
        margin-left:20px;
        margin-right:10px;
    }
    h2 {
        font-weight: 400;
        color: #4a77b2;
    }
</style>


