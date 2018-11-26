<template>
  <div class="content" style="margin-bottom:20px;">
    <h2>月度签约排行榜</h2>
    <div v-if="demo.length">
        <v-chart
            ref="demo"
            :data="demo">
            <v-bar colors="#0033ff"/>
            <v-tooltip :show-item-marker="false" />
        </v-chart>
    </div>
    <!-- {{wid}} -->
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton } from 'vux'

export default {
    name:"monthwidth",
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
      demo:function(){
          let arr = []
          let that = this.wid.ranking
          that.map((item,index)=>{
              let temp={}
              temp.year = item.userName
              temp.sales = item.saleMoney
              arr.push(temp)
          })
          return arr
      }
  },
}
</script>

