<template>
  <div class="content">
     <h2>产品销售分布</h2>
     <v-chart  :data="demo_data">
     <v-scale y :options="yOptions" />
     <v-tooltip disabled />
     <v-pie :radius="0.85" series-field="name" />
     <v-legend :options="legendOptions" />
    </v-chart>
    <!-- {{demo_map}} -->
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'

// const map = {
//   '芳华': '40%',
//   '妖猫传': '20%',
//   '机器之血': '18%',
//   '心理罪': '15%',
//   '寻梦环游记': '5%',
//   '其他': '2%'
// }

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
    VScale
  },
  data () {
    return {
      legendOptions: {
        position: 'right',
        // itemFormatter (val) {
        //   return val + '  ' + map[val]
        // }
      },
      yOptions: {
        formatter (val) {
          return val * 100 + '%'
        }
      },
    //   map,
    //   data: [
    //     { name: '芳华', percent: 0.4, a: '1' },
    //     { name: '妖猫传', percent: 0.2, a: '1' },
    //     { name: '机器之血', percent: 0.18, a: '1' },
    //     { name: '心理罪', percent: 0.15, a: '1' },
    //     { name: '寻梦环游记', percent: 0.05, a: '1' },
    //     { name: '其他', percent: 0.02, a: '1' }
    //   ]
    }
  },
  props:{
      analysic:{
          type:Array,
          default:function(){
              return []
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
       
        // console.log(temArr,'temArrtemArrtemArr')
        return temArr
      },
      demo_map:function(){
            let obj = {}
            let arr = this.analysic
            arr.map((item,index)=>{
               let key = item.productName
               let value = item.custNums *100+"%"
                obj[key]=value
            })
        // console.log(obj,'objobjobjobj')
            return obj
      }
  }
}
</script>

