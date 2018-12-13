<template>
  <div>
    <div class="content" style="background-color: #4a77b0;">
        <div class="son_color">
            <dayContractData  :contract="list[0]"></dayContractData>

            <dayExecution :execution="list[0]"></dayExecution>                                                                                                                                  
        </div>
        <div>
            <daycallData :call="list[0]"></daycallData>
        </div>
        <div>
            <dayanalysis :analysic="list[1]"></dayanalysis>
        </div>
        <div>
            <daywidth :wid="list[2]" :contract="list[0]"></daywidth>
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
import dayContractData from "./dayContractData";
import dayExecution from "./dayExecution";
import daycallData from "./daycallData";
import dayanalysis from "./dayanalysis";
import daywidth from "./daywidth";
import moment from "moment";
export default {
  name: "dayReport",
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
    dayContractData,
    dayExecution,
    daycallData,
    dayanalysis,
    daywidth,
    Swiper,
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
    }
  },
  data() {
  
    return {
      list:[]
      
    };
  },
  created() {
    let that = this;
    function getrank() {
      return axios.get("/report/business/rankCount",{params:{
        fromDateStr:moment().format("YYYY-MM-DD"),
        toDateStr:moment().format("YYYY-MM-DD"),
        dateType:'now',
        groupIds:that.groupIds
      }});
    }
    function getyx() {
      return axios.get("/report/business/yxCount",{params:{
        fromDateStr:moment().format("YYYY-MM-DD"),
        toDateStr:moment().format("YYYY-MM-DD"),
        dateType:'now',
        groupIds:that.groupIds
      }});
    }
    function getinfo() {
      return axios.get("/report/business/count",{params:{
        fromDateStr:moment().format("YYYY-MM-DD"),
        toDateStr:moment().format("YYYY-MM-DD"),
        dateType:'now',
        groupIds:that.groupIds
      }});
    }
    axios
      .all([getrank(), getyx(), getinfo()])

      .then(
        axios.spread(function(rabk, yx, info) {
          // console.log('User', rabk.data);
          // console.log('Repositories', yx.data);
          // console.log('Repositories', info.data);
          that.list = [info.data, yx.data, rabk.data];
          console.log("原始的 ",that.list)
        })
      );
  },
  watch:{
    list:function(val){
      this.list=val
      console.log("list在改变",this.list)
      // console.log(this.list)
    },
    listsum:function(val){
      console.log("listsum",this.listsum)
      this.list=val
    }
  },
  
};
</script>

<style>

.select {
  width: 50px;
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
