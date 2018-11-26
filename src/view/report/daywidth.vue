<template>
  <div class="content">
      <h2>签约人员</h2>
      <div v-if="demo1.length">
        <v-chart
            ref="demo"
            :data="demo1">
            <v-bar colors="#0033ff"/>
            <v-tooltip :show-item-marker="false" />
        </v-chart>
      </div>
    
    <!-- {{demo1}} -->
    <!-- {{demo1}} -->
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
      }
  },
  computed:{
      demo1:function(){
          let arr = []
          let that = this.wid.ranking
          that.map((item,index)=>{
              let temp={}
              temp.year = item.userName
              temp.sales = item.saleMoney
              arr.push(temp)
          })
          console.log(arr,"arr")
          return arr
      }
  },
}
</script>
<style>
    /* .noselect{
        position: absolute;
        left: 5px;
  } */
</style>

