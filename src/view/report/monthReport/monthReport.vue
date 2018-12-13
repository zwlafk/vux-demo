<!--客户查重-->
<template>
  <div>
    <div class="content" style="background-color: #4a77b0;">


        <!-- <swiper :list="demo03_list" auto style="width:80%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper> -->
    

        <div class="son_color">
            <monthContractData :contract="list[0]"></monthContractData>
            <monthTargetData :target="list[0]"></monthTargetData>
            <monthExecution :execution="list[0]"></monthExecution>
        </div>
        <div>
            <monthcallData :call="list[0]"></monthcallData>
        </div>
        <div>
            <monthtrendData :trend="list[0]"></monthtrendData>
            <monthtrendDataOrder :trend="list[0]"></monthtrendDataOrder>
        </div>
        <div>
            <!-- <leaderboard></leaderboard> -->
              <monthwidth :wid="list[2]" :contract="list[0]"></monthwidth>
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
import monthContractData from "./monthContractData";
import monthTargetData from "./monthTargetData";
import monthExecution from "./monthExecution";
import monthcallData from "./monthcallData";
import monthtrendData from "./monthtrendData";
import monthtrendDataOrder from "./monthtrendDataOrder";
// import  leaderboard from './leaderboard';
import monthwidth from "./monthwidth";

export default {
  name: "monthReport",
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
    monthContractData,
    monthTargetData,
    monthExecution,
    monthcallData,
    monthtrendData,
    monthtrendDataOrder,
    monthwidth,
    Swiper,

    // leaderboard,
  },
  data() {
    // console.log(this.list)
    return {
      list:[]
    };
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
  created() {
    let that = this;
    function getrank() {
      return axios.get("/report/business/rankCount",{params:{
        fromDateStr:that.form_to_time[0],
        toDateStr:that.form_to_time[1],
        dateType:'month',
        groupIds:that.groupIds,
      }});
    }
    function getyx() {
      return axios.get("/report/business/yxCount",{params:{
        fromDateStr:that.form_to_time[0],
        toDateStr:that.form_to_time[1],
        dateType:'month',
        groupIds:that.groupIds,
      }});
    }
    function getinfo() {
      return axios.get("/report/business/count",{params:{
        fromDateStr:that.form_to_time[0],
        toDateStr:that.form_to_time[1],
        dateType:'month',
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
