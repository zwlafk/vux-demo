<template>
  <div class="vux-circle-demo">
    <div class="content" style="height:200px;position: relative;">
      <h2 style="text-align: left;">年度销售目标</h2>
      <div style='width:60px;height:60px;margin:25px 0 0 50px;'>
        <x-circle v-if="target.info.planRatio"
          :percent="demo"
          :stroke-width="6"
          :trail-width="6"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec">
          <span style="color:#36D1DC">{{ target.info.planRatio }}</span>
        </x-circle>
      </div>
    <card style="position:absolute;top:60px;right:20px;">
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">年度目标</p>
        <p>{{target.info.planMoneyAll}}万元</p>
        <p>按计划需完成/已完成</p>
        <p>{{target.info.planMoney}}万元/{{target.info.factMoney}}万元</p>
      </div>
    </card>
  </div>
</div>
</template>

<script>
import { XCircle,Card} from 'vux'

export default {
    name: "quarterTargetData",
    components: {
      XCircle,
      Card
    },
    data () {
      return {
        // percent: 20
      }
    },
    props:{
      target:{
        type:Object,
        default:function(){
          return {
            info:{
              planRatio:""
            }
          }
        }
      }
    },
    computed:{
      demo:function(){
        // let percent = this.target.info.planRatio
        let percent = parseFloat(this.target.info.planRatio)
        return Number(percent)>=100?100:Number(percent)
      }
    }
}
</script>

<style scoped>
.vux-circle-demo {
  padding-top: 20px;
  text-align: center;
}
.vux-circle-demo > div {
  margin-bottom: 20px;
}
</style>


    

 