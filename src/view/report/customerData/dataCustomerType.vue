<template>
  <div class="content">
      <h2>客户类型分布</h2>
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
  
<!-- {{demo_map}} -->
<!-- {{demo_data}} -->
    <!-- {{analysic}} -->
    <p v-show="!demo_data.length" class="no-data-tip" style="height:50px;margin-top:40px;"></p>
  </div>
</template>

<script>
import {
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VBar,
  VPie,
  VGuide,
  VScale
} from "vux";

// const data = [
//   { name: "股票类", percent: 83.59, a: "1" },
//   { name: "债券类", percent: 2.17, a: "1" },
//   { name: "现金类", percent: 14.24, a: "1" }
// ];

var map = {};
// data.map(obj => {
//   map[obj.name] = obj.percent + "%";
// });

export default {
  name: "dataCustomerType",
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
  props: {
    analysic: {
      type: Array,
      default: function() {
        return [];
      }
    },
    ctzong:{
      type:Object,
      default:function(){
            return {}
        }
    }
  },
  computed: {
    demo_data: function() {
      let temArr = [];
      let arr = this.analysic;
      // console.log(arr)
      arr.map((item, index) => {
        let temp = {};
        temp.name = item.optionName;
        temp.percent = item.custNums;
        temp.a = "1";
        temArr.push(temp);
      });
    //   console.log(temArr,'temArrtemArrtemArr')
      return temArr;
    },
    demo_map:function(){
        let obj = {}
        let arr = this.analysic
        arr.map((item,index)=>{
            let key = item.optionName
            let value = ((item.custNums/this.ctzong.totalNum) *100).toFixed(1)+"%"
          obj[key]=value
        })
        map = obj
        return obj
      }
  },
  data() {
    return {
        map,
        htmlOptions: {
          position: [ '39%', '35%' ],
          html: `
            <div style="width: 250px;height: 40px;text-align: center;">
              <div style="font-size: 16px">总数量</div>
              <div style="font-size: 24px">`+this.ctzong.totalNum+`</div>
            </div>`
        },
      legendOptions: {
        position: "right",
        itemFormatter(val) {
          return val + "  " + map[val];
        }
      },
      yOptions: {
        formatter(val) {
          return val * 100 + "%";
        }
      },
    //   data
    };
  },
   created(){
    this.map=this.demo_map
  }
};
</script>

