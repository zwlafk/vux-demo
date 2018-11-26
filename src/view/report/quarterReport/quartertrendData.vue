<template>
  <div class="content" style="margin-bottom:20px;">
    <h2>销售签约数据趋势</h2>
    <div v-if="demo.length">
        <v-chart :data="demo">
            <v-line series-field="type" />
        </v-chart>
    </div>
  <!-- {{trend.info.charList}} -->
<!-- {{demo}} -->
  </div>
</template>

<script>
import { VChart, VLine, VAxis, VTooltip } from 'vux'
import { constants } from 'zlib';




// import data from './line_color.json'

export default {
    name:"quartertrendData",
    components: {
        VChart,
        VLine,
        VAxis,
        VTooltip
    },
    props:{
        trend:{
            type:Object,
            default:function(){
                return {
                    info:{
                        charList:[]
                    }
                }
            }
        },
        
    },

    computed:{
        demo:function(){
            let temArr = []
            let charL = this.trend.info.charList
            // c
            charL.map((item,index)=>{
                let temp = {}
                temp.data = item.dateFmt
                temp.type = "签约客户数"
                temp.value = item.signNum
                temArr.push(temp)
            })
            charL.map((item,index)=>{
                let temp = {}
                temp.data = item.dateFmt
                temp.type = "新增订单数"
                temp.value = item.orderNum
                temArr.push(temp)
            })
            return temArr
        }
    },
    // data () {
    //     return {
    //     data:[
    //             {"date":"2018-09-01","type":"签约客户数","value":131},
    //             {"date":"2018-09-04","type":"签约客户数","value":322},
    //             {"date":"2018-09-01","type":"新增订单数","value":45},
    //             {"date":"2018-09-04","type":"新增订单数","value":22},
             
    //         ]
    //     }
    // }
}
</script>
