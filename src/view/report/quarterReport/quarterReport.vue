<template>
  <div>
    <div class="content" style="background-color: #4a77b0;">
        <div class="son_color">
            <quarterContractData :contract="list[0]"></quarterContractData>
            <quarterTargetData :target="list[0]"></quarterTargetData>
            <quarterExecution :execution="list[0]"></quarterExecution>
        </div>
        <div>
            <quartercallData :call="list[0]"></quartercallData>
        </div>
        <div>
            <quartertrendData :trend="list[0]"></quartertrendData>
        </div>
        
        <div>
            <quartertrendDataOrder :trend="list[0]"></quartertrendDataOrder>
        </div>
        <div>
            <!-- <leaderboard></leaderboard> -->
              <quarterwidth :wid="list[2]" :contract="list[0]"></quarterwidth>
        </div>
    </div>
    
   
  </div>
</template>

<script>
import {
  Group,
  XButton,
  Search,
  PopupRadio,
  FormPreview,
  CellFormPreview,
  Cell,
  ButtonTab,
  ButtonTabItem,
  Selector,
  Swiper

} from "vux";
import axios from "axios";
import quarterContractData from "./quarterContractData";
import quarterTargetData from "./quarterTargetData";
import quarterExecution from "./quarterExecution";
import quartercallData from "./quartercallData";
import quartertrendData from "./quartertrendData";
import quartertrendDataOrder from "./quartertrendDataOrder";
// import  leaderboard from './leaderboard';
import quarterwidth from "./quarterwidth";

export default {
  name: "quarterReport",
  components: {
    Group,
    XButton,
    Search,
    PopupRadio,
    FormPreview,
    CellFormPreview,
    Cell,
    ButtonTab,
    ButtonTabItem,
    Selector,
    quarterContractData,
    quarterTargetData,
    quarterExecution,
    quartercallData,
    quartertrendData,
    quartertrendDataOrder,
    Swiper,
    quarterwidth
  },
  data() {
    return {
      list: []
    };
  },
  props:{
    listsum:{
      type:Array,
      default:function(){
        return []
      }
    },
     groupIds:{
      type:String,
      default:""
    },
    form_to_time:{
      type:Array,
      default:function(){
        return []
      }
    }

  },
  watch:{
    list:function(val){
      this.list=val
      // console.log(this.list)
    },
    listsum:function(val){
      this.list=val
    }
  },
  created() {
    let that = this;
    function getrank() {
      return axios.get("/report/business/rankCount",{params:{
        fromDateStr:that.form_to_time[0],
        toDateStr:that.form_to_time[1],
        dateType:'quarter',
        groupIds:that.groupIds,
      }});
    }
    function getyx() {
      return axios.get("/report/business/yxCount",{params:{
        fromDateStr:that.form_to_time[0],
        toDateStr:that.form_to_time[1],
        dateType:'quarter',
        groupIds:that.groupIds,
      }});
    }
    function getinfo() {
      return axios.get("/report/business/count",{params:{
        fromDateStr:that.form_to_time[0],
        toDateStr:that.form_to_time[1],
        dateType:'quarter',
        groupIds:that.groupIds,
      }});
    }

    axios.all([getrank(), getyx(), getinfo()])

      .then(
        axios.spread(function(rabk, yx, info) {
          // console.log('User', rabk.data);
          // console.log('Repositories', yx.data);
          // console.log('Repositories', info.data);
          that.list = [info.data, yx.data, rabk.data];
          console.log(0)
          console.log(that.list)
        })
      );
  }
};
</script>

<style>
.nav {
  background-color: #4a77b0;
}
.btn,
.select {
  width: 30%;
  background-color: #4a77b0;
  color: #fff;
  border: none;
  height: 40px;
}
.btn-a{
  outline: none;
}
.select {
  width: 40%;
  text-align: center;
}
.content{
  background-color: #d7d7d7;
}
.body{
  background-color: #4a77b0;
}
.time{
  color: #fff;
  float: right;
  padding-right:20px;
  line-height: 40px;
}
</style>
