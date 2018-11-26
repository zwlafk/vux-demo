<template>
  <div>
    <div class="content" style="background-color: #4a77b0;">
        <div class="son_color">
            <weekContractData :contract="list[0]"></weekContractData>

            <weekExecution :execution="list[0]"></weekExecution>                                                                                                                                  
        </div>
        <div>
            <weekcallData :call="list[0]"></weekcallData>
        </div>
        <div>
            <weekanalysis :analysic="list[1]"></weekanalysis>
        </div>
        <div>
            <weektrendData :trend="list[0]"></weektrendData>
        </div>
        <div>
            <weektrendDataOrder :trend="list[0]"></weektrendDataOrder>
        </div>
        <div>
            <!-- <leaderboard></leaderboard> -->
              <weekwidth :wid="list[2]"></weekwidth>
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
import weekContractData from "./weekContractData";
import weekExecution from "./weekExecution";
import weekcallData from "./weekcallData";
import weektrendData from "./weektrendData";
import weektrendDataOrder from "./weektrendDataOrder";
import weekanalysis from "./weekanalysis";
// import  leaderboard from './leaderboard';
import weekwidth from "./weekwidth";
export default {
  name: "weekReport",
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
    weekContractData,
    weekExecution,
    weekcallData,
    weektrendData,
    weektrendDataOrder,
    weekanalysis,
    Swiper,
    weekwidth
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
    }
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
  created() {
    let that = this;
    function getrank() {
      return axios.get("/report/business/rankCount",{params:{
        fromDateStr:'2018-01-01',
        toDateStr:'2018-09-13',
        dateType:'week',
        groupIds:that.groupIds,
      }});
    }
    function getyx() {
      return axios.get("/report/business/yxCount",{params:{
        fromDateStr:'2018-01-01',
        toDateStr:'2018-09-13',
        dateType:'week',
        groupIds:that.groupIds
      }});
    }
    function getinfo() {
      return axios.get("/report/business/count",{params:{
        fromDateStr:'2018-01-01',
        toDateStr:'2018-09-13',
        dateType:'week',
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
          // console.log(0)
          // console.log(that.list)
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
