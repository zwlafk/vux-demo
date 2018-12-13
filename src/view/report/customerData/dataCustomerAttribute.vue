<template>
  <div class="content">
    <div v-if="demo_data.length" style="margin-top:50px;">
      <v-chart :data="demo_data" :padding="[20, 'auto']">
        <v-tooltip disabled/>
        <v-scale y :options="yOptions"/>
        <v-pie
          :radius="0.85"
          :inner-radius="0.7"
          series-field="name"
          :colors="['#FE5D4D','#3BA4FF','#737DDE']"
        />
        <v-legend :options="legendOptions"/>
        <v-guide type="html" :options="htmlOptions"/>
      </v-chart>
      <!-- {{demo_data}} -->
    </div>
    <p v-show='false'>{{demo_map}}</p>
    <p v-show="!demo_data.length" class="no-data-tip" style="height:50px;margin-top:40px;"></p>
    <!-- {{demo_data}} -->
    <!-- {{analysic.fieldData.totalNum}} -->
    <!-- {{demo_map}} -->
    <!-- {{ADCzong}} -->
    <!-- {{analysic.fieldData.data}} -->
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

var map = {};

export default {
  name: "dataCustomerAttribute",
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
  data() {
    return {
      map:{},
      demo: false,
      htmlOptions: {
        position: ["39%", "35%"],
        html:
          `
        <div style="width: 250px;height: 40px;text-align: center;">
          <div style="font-size: 16px">总数量</div>
          <div style="font-size: 24px">` +
          this.analysic.fieldData.totalNum +
          `</div>
        </div>`
      },

      yOptions: {
        formatter(val) {
          console.log(val, "ssss");
          return val * 100 + "%";
        }
      }
    };
  },
  props: {
    analysic: {
      type: Object,
      default: function() {
        return {
          fieldData: {
            data: []
          }
        };
      }
    }
  },
  computed: {
    legendOptions() {
      return {
        position: "right",
        itemFormatter:(val) => {
          console.log(map, 111111,this);
          return val + "  " + this.map[val];
        }
      };
    },
    demo_data: function() {
      let temArr = [];
      let arr = this.analysic.fieldData.data;
      // console.log(arr)
      arr.map((item, index) => {
        let temp = {};
        temp.name = item.optionName;
        temp.percent = item.custNums;
        temp.a = "1";
        temArr.push(temp);
      });

      // console.log(temArr,'temArrtemArrtemArr')
      return temArr;
    },
    demo_map: function() {
      let obj = {};
      let arr = this.analysic.fieldData.data;
      arr.map((item, index) => {
        let key = item.optionName;
        let value =
          ((item.custNums / this.analysic.fieldData.totalNum) * 100).toFixed(
            1
          ) + "%";
        obj[key] = value;
      });
      this.map = obj;
      return obj;
    }
  },
  created() {
    // this.map = this.demo_map;
    let that = this;

    setTimeout(function() {});
  }
};
</script>

