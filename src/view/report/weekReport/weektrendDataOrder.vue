<template>
  <div class="content" style="margin-bottom:20px;">
    <h2>订单金额趋势(万元)</h2>
    <div v-if="demo.length">
        <v-chart :data="demo">
            <v-scale x :tick-count="3"  />
            <v-line series-field="type" />
        </v-chart>
    </div>
    
  <!-- {{trend.info.charList}} -->
<!-- {{demo}} -->
  </div>
</template>

<script>
import { VChart, VLine, VAxis, VTooltip,VScale } from 'vux'
import { constants } from 'zlib';




// import data from './line_color.json'

export default {
    name:"weektrendDataOrder",
    components: {
        VChart,
        VLine,
        VAxis,
        VTooltip,VScale
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
                temp.type = "回款金额"
                temp.value = item.signMoney
                temArr.push(temp)
            })
            charL.map((item,index)=>{
                let temp = {}
                temp.data = item.dateFmt
                temp.type = "签单金额"
                temp.value = item.saleMoney
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
