<template>
  <div>
      <div class="content" style="padding-top:13px;">
            <h2 >客户分布</h2>
            <div style="width:300px;height:223px;" v-if="analysic.result.allNum!=0">
                <div style="height:42px;"></div>
                <div><span style="width:70px;display:inLine-block;">客户总数</span><span>{{analysic.result.allNum}}</span></div>
                <div v-for="item in demo_data" :key="item.id" style="width:100%">
                    <div style="width:100%"><span style="width:70px;display:inLine-block;text-align:right;">{{item.name}}</span><div class="item" :style='{width:item.percent}'></div><span>{{item.num}}</span></div>
                </div>
            </div>
            <div style="width:300px;height:223px;" v-if="analysic.result.allNum==0">
                <div style="height:42px;"></div>
                <div><span style="width:70px;display:inLine-block;">客户总数</span><span>0</span></div>
                <div v-for="item in demo_data" :key="item.id" style="width:100%">
                    <div style="width:100%"><span style="width:70px;display:inLine-block;text-align:right;">{{item.name}}</span><div class="item" :style='{width:0}'></div><span>{{item.num}}</span></div>
                </div>
            </div>
            <!-- {{analysic.result.allNum}} -->
            <!-- {{demo_data}} -->
      </div>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton } from 'vux'


export default {
    name:"dataGuestDepartment",
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
      analysic:{
          type:Object,
          default:function(){
              return {
                  result:{
                      allNum:"0"
                  }
              }
          }
      }
  },
  computed:{
      demo_data:function(){
          let arr = this.analysic.result
          console.log(arr,"sbmao")
          let arr1 = {}
          let arr2 = {}
          let arr3 = {}
          let arr4 = {}
          let arr5 = {}
          let arrO=[]
          arr1.name = "资源"
          arr1.num = arr.resNum
          arr1.percent = ((arr.resNum*0.6)/arr.allNum)*100+"%"
          arr2.name = "意向客户"
          arr2.num = arr.custNum
          arr2.percent = ((arr.custNum*0.6)/arr.allNum)*100+"%"
          arr3.name = "签约客户"
          arr3.num = arr.signNum
          arr3.percent = ((arr.signNum*0.6)/arr.allNum)*100+"%"
          arr4.name = "沉默客户"
          arr4.num = arr.silentNum
          arr4.percent = ((arr.silentNum*0.6)/arr.allNum)*100+"%"
          arr5.name = "流失客户"
          arr5.num = arr.losingNum
          arr5.percent = ((arr.losingNum*0.6)/arr.allNum)*100+"%"

          arrO.push(arr1)
          arrO.push(arr2)
          arrO.push(arr3)
          arrO.push(arr4)
          arrO.push(arr5)
            var compare = function (property) {
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }   
            } 
          console.log(arrO,"sbmao1")

          return (arrO.sort(compare('num')))
     
        

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


