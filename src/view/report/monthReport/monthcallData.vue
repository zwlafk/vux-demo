<template>
  <div class="content" style="margin-bottom:20px;">
      <h2>通话数据</h2>
      <div style="padding:10px 20px;">呼出次数<span style="float:right">{{call.info.callOutNum}}个</span></div>
      <div style="padding:10px 20px;">呼入次数<span style="float:right">{{call.info.inCallAllNum}}个</span></div>
      <div style="padding:10px 20px;">呼出时长<span style="float:right">{{call.info.callTime}}分钟</span></div>
      <div style="padding:10px 20px;">呼入时长<span style="float:right">{{call.info.inCallTime}}分钟</span></div>
      <div style="padding:10px 20px;">平均呼出时长<span style="float:right">{{call.info.outCallTimeAvg}}分钟</span></div>
      <div style="padding:10px 20px;">平均呼入时长<span style="float:right">{{call.info.inCallTimeAvg}}分钟</span></div>   
  </div>
</template>

<script>
import { XTable, LoadMore } from 'vux'

export default {
    name: "monthcallData",

    components: {
        XTable,
        LoadMore
    },
    props:{
        call:{
            type:Object,
            default:function(){
                return {
                    info:{
                        callOutNum:"",
                        inCallAllNum:"",
                        callTime:"",
                        inCallTime:"",
                        outCallTimeAvg:"",
                        inCallTimeAvg:"",
                    }
                }
            }
        }
    },
}
</script>