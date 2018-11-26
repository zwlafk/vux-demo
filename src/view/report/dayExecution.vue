<template>
  <div>
    <div class="content">
        <h2>销售执行力</h2>
        <div style="width:49%;padding-left:40px;margin-bottom:20px;display:inline-block;box-sizing:border-box;">
            <span>新增意向数</span>
            <br/>
            {{execution.info.willNum}}个
        </div>
        <div style="width:49%;padding-left:40px;margin-bottom:20px;display:inline-block;box-sizing:border-box;">
            <span>上门数量</span>
            <br/>
            {{execution.info.doorCount}}个 
        </div>
        <div style="width:49%;padding-left:40px;margin-bottom:20px;display:inline-block;box-sizing:border-box;">
            <span>总跟进数</span>
            <br/>
            {{execution.info.gjCount}}个
        </div>
            <div style="width:49%;padding-left:40px;margin-bottom:20px;display:inline-block;box-sizing:border-box;">
            <span>意向变更</span>
            <br/>
            {{execution.info.willCustNum}}个
        </div>
    </div>
  </div>
</template>

<script>
import { CellBox, Group } from "vux";

export default {
  name: "dayExecution",

  components: {
    CellBox,
    Group
  },
  // props: ["execution"]
  props:{
        execution:{
            type:Object,
            default:function(){
                return {
                  info:{
                    willNum:"",
                    doorCount:"",
                    gjCount:"",
                    willCustNum:"",
                  }
                }
            }
        }
    },
};
</script>
<style>
dd {
  box-sizing: border-box;
}
h2 {
  font-weight: 400;
  color: #4a77b2;
}
</style>
