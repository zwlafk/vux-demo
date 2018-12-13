<template>
  <div class="content">
            <!-- <h2 style="position:absolute;top:11px;left:22px;">产品销售分布</h2> -->
     <h2>产品销售分布</h2>
     <!-- <v-chart  :data="demo_data">
     <v-scale y :options="yOptions" />
     <v-tooltip disabled />
     <v-pie :radius="0.85" series-field="name" />
     <v-legend :options="legendOptions" />
    </v-chart> -->
    <!-- {{pszong}} -->
    <div v-if="demo_data.length" style="margin-top:50px;">
      <v-chart
        :data="demo_data"
        :padding="[20, 'auto']">
        <v-tooltip disabled />
        <v-scale y :options="yOptions" />
        <v-pie :radius="0.85" :inner-radius="0.7" series-field="name" :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
        <v-legend :options="legendOptions" />
        <v-guide type="html" :options="htmlOptions" />
      </v-chart>
    </div>
    
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VGuide, VScale } from 'vux'

var map={}
export default {
    name:'dataProductSalesD',
  components: {
      VChart,
      VLine,
      VArea,
      VTooltip,
      VLegend,
      VBar,
      VPie,
      VGuide,
      VScale
  },
  data () {
    return {
      htmlOptions: {
        position: [ '39%', '35%'],
        html: `
          <div style="width: 250px;height: 40px;text-align: center;">
            <div style="font-size: 16px">总数量</div>
            <div style="font-size: 24px">`+this.pszong.totalNum+`</div>
          </div>`
      },
      legendOptions: {
        position: 'right',
        itemFormatter (val) {
          return val + '  ' + map[val]
        }
      },
      yOptions: {
        formatter (val) {
          return val * 100 + '%'
        }
      },
      map,
    }
  },
  props:{
      analysic:{
          type:Array,
          default:function(){
              return []
          }
      },
      pszong:{
        type:Object,
        default:function(){
              return {}
          }
      }

  },
  computed:{
      demo_data:function(){
        let temArr = []
        let arr = this.analysic
        // console.log(arr)
        arr.map((item,index)=>{
          let temp={}
          temp.name=item.productName
          temp.percent=item.custNums
          temp.a="1"
          temArr.push(temp)
        })
       
        return temArr
      },
      demo_map:function(){
            let obj = {}
            let arr = this.analysic
            let sum = 0 
            arr.map((item,index)=>{
               let key = item.productName
               let value = ((item.custNums/this.pszong.totalNum)*100).toFixed(1)+"%"
              obj[key]=value
            })
            map = obj
            return obj
      }
  }, 
  created(){
    this.map=this.demo_map
  }
}
</script>

