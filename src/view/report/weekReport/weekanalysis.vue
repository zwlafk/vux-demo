<template>
  <div class="content">
    <h2>客户意向分布</h2>
    <div v-if="demo.length">
        <v-chart :data="demo">
          <v-scale y :options="yOptions"/>
          <v-pie :radius="0.85" series-field="name" />
          <v-legend :options="legendOptions" />
          <v-tooltip :show-value-in-legend="false"/>
      </v-chart>
    </div>
    
    <!-- {{analysic.yxlist}} -->
    <p v-show="!demo.length" class="no-data-tip" style="height:50px;margin-top:40px;"></p>

  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VScale } from 'vux'

// const map = {
//   '进程1': '40%',
//   '进程2': '20%',
//   '进程3': '18%',
//   '进程4': '15%',
// }

export default {
    name:"weekanalysis",
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
                //   console.log(val)
                // return val + '  ' + map[val]
                // }
            },
            yOptions: {
                formatter (val) {
                  return val * 100 + '%'
                }
            },
            // map,
            // data:temArr
            // data: [
            //   { name: '进程1', percent: 40, a: '1' },
            //   { name: '进程2', percent: 50, a: '1' },
            // ]
            data:[]
          }
    },
    props: {
    analysic: {
      type: Object,
      default: function() {
        return {
          yxlist:[]
        };
      }
    }
  },
    computed:{
      demo:function(){
        let temArr = []
        let arr = this.analysic.yxlist
        // console.log(arr)
        arr.map((item,index)=>{
          let temp={}
          temp.name=item.optionName
          temp.percent=item.num
          temArr.push(temp)
        })
        return temArr
      }
    },


}
</script>