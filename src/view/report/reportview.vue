<!--客户查重-->
<template>
  <div>
    <div style="background-color: #4a77b0;">
        <div>
          <button-tab class="nav">
            <button class="btn btn-a" :style="{'color':btn?'#fff':'#4a77b0'}" @click="oldtime" ref="old">上一日</button>
            <popup-picker class="select" :title="title1" :data="list1" @on-change="changeType"></popup-picker>
            <!-- <select class="select" @change="changeType">
              <option selected value="日报">日报</option>
              <option value="周报">周报</option>
              <option value="月报">月报</option>
              <option value="季度报">季度报</option>
              <option value="客户数据">客户数据</option>
            </select> -->
            <button class="btn btn-a" :style="{'color':btn?'#fff':'#4a77b0'}" :disabled="isnew" @click="nexttime" ref="next">下一日</button>
          </button-tab>

          <PopupChecklist :isPopupShow="isCheckListShow"
                          @on-change="handlePopupChecklistChange"
                          @close-popup="close"
                          :optionList="childrenList"
                          labelKey="text"
                          valueKey="id"
                          v-model="groupIds"
                          isFromReport
                          multiple
                          optionListChildName="children"
                          >
            <button slot="content" class="btn-a" @click='isCheckListShow=true'>
              {{checkedLabels?checkedLabels:`请选择`}}
            </button>
            <!-- <cell-box is-link

                      @click.native="isCheckListShow = true">
              <div style="padding-right:15px;">
                {{checkedLabels?checkedLabels:`请选择${searchName}`}}
              </div>
            </cell-box> -->
          </PopupChecklist>
          <span class="time" ref="time">{{timeJ}}</span>
        </div>
    </div>
    <div>
      <dayReport v-if="type =='day'" :listsum="listsum" :groupIds="groupIds"></dayReport>
    </div>
    <div>
      <weekReport v-if="type =='week'" :listsum="listsum" :groupIds="groupIds"></weekReport>
    </div>
    <div>
      <monthReport v-if="type =='month'" :listsum="listsum" :groupIds="groupIds"></monthReport>
    </div>
    <div>
      <quarterReport v-if="type =='quarter'" :listsum="listsum" :groupIds="groupIds"></quarterReport>
    </div>
    <div>
      <dataReport v-if="type =='datareport'" :groupIds="groupIds"></dataReport>
    </div>


  </div>
</template>

<script>
import PopupChecklist from "@/components/PopupChecklist";
import { deepFlattenTree } from "@/util";
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
  Swiper,
  PopupPicker
} from "vux";
import axios from "axios";
import dayReport from "./dayReport";
import weekReport from "./weekReport/weekReport";
import monthReport from "./monthReport/monthReport";
import quarterReport from "./quarterReport/quarterReport";
import dataReport from "./customerData/dataReport";
import moment from "moment";
export default {
  name: "reportview",
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
    PopupChecklist,
    Selector,
    Swiper,
    PopupPicker,
    dayReport,
    weekReport,
    monthReport,
    quarterReport,
    dataReport
  },
  data() {
    return {
      timeJ: moment().format("YYYY-MM-DD")+"~"+moment().format("YYYY-MM-DD"),
      groupIds: "",
      childrenList: [],
      checkedLabels: "",
      isCheckListShow: false,
      listsum: [],
      day: 0,
      month: 0,
      week: 0,
      quarter: 0,
      btn: true,
      type:'day',
      isnew:true,
      title1:'日报',
      list1:[["日报","周报","月报","季度报","客户数据",]],
      
      // listSelect:""
    };
  },
  // created(){
  //   this.$refs.time.innerHTML = moment().format("YYYY-MM-DD")+"~"+moment().format("YYYY-MM-DD");

  // },
  
  methods: {
    changeType: function(s) {
      console.log("改变了",s)
      if (s == "日报") {
        this.$refs.time.innerHTML = moment().format("YYYY-MM-DD")+"~"+moment().format("YYYY-MM-DD");
        this.$refs.old.disabled = false;
        this.$refs.next.disabled = true;
        this.btn = true;
        this.$refs.old.innerHTML = "上一日";
        this.$refs.next.innerHTML = "下一日";
        this.type='day'
        this.title1='日报'
      } else if (s== "月报") {
        this.$refs.time.innerHTML = moment().month(moment().month() - 0).startOf("month").format("YYYY-MM-DD")+"~"+moment().format("YYYY-MM-DD");
        this.$refs.old.disabled = false;
        this.$refs.next.disabled = true;
        this.btn = true;
        this.$refs.old.innerHTML = "上一月";
        this.$refs.next.innerHTML = "下一月";
        this.type='month'
        this.title1='月报'

      } else if (s == "周报") {
        this.$refs.time.innerHTML = moment().week(moment().week() - 0).startOf("week").format("YYYY-MM-DD")+"~"+moment().format("YYYY-MM-DD");
        this.$refs.old.disabled = false;
        this.$refs.next.disabled = true;
        this.btn = true;
        this.$refs.old.innerHTML = "上周";
        this.$refs.next.innerHTML = "下周";
        this.type='week'
        this.title1='周报'
      } else if (s == "季度报") {
        this.$refs.time.innerHTML = moment().quarter(moment().quarter() - 0).startOf("quarter").format("YYYY-MM-DD")+"~"+moment().format("YYYY-MM-DD");
        this.$refs.old.disabled = false;
        this.$refs.next.disabled = true;
        this.btn = true;
        this.$refs.old.innerHTML = "上季度";
        this.$refs.next.innerHTML = "下季度";
        this.type='quarter'
        this.title1='季度报'
      } else {
        this.$refs.time.innerHTML = "";
        this.$refs.old.disabled = true;
        this.$refs.next.disabled = true;
        this.btn = false;
        this.type='datareport'
        this.title1='客户数据'
      }
    },
    oldtime: function(s) {
      if (this.$refs.old.innerHTML == "上一日") {
        ++this.day;
        this.$refs.next.disabled = false;
        console.log(this.day, "上一日");
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .subtract(that.day, "days")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .subtract(that.day, "days")
            .format("YYYY-MM-DD");
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              dateType: "now",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              dateType: "now",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              dateType: "now",
              groupIds: that.groupIds,
            }
          });
        }
        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
            console.log("试试",that.listsum)
          })
        );
      } else if (this.$refs.old.innerHTML == "上一月") {
        ++this.month;
        this.$refs.next.disabled = false;
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .month(moment().month() - that.month)
            .startOf("month")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .month(moment().month() - that.month)
            .endOf("month")
            .format("YYYY-MM-DD");
            console.log( this.$refs.time.innerHTML.substring(0,10),"fenkai")
            console.log( this.$refs.time.innerHTML.substring(11,21),"fenkai")
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .month(moment().month() - that.month)
                .startOf("month")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .month(moment().month() - that.month)
                .endOf("month")
                .format("YYYY-MM-DD"),
              dateType: "month",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .month(moment().month() - that.month)
                .startOf("month")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .month(moment().month() - that.month)
                .endOf("month")
                .format("YYYY-MM-DD"),
              dateType: "month",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .month(moment().month() - that.month)
                .startOf("month")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .month(moment().month() - that.month)
                .endOf("month")
                .format("YYYY-MM-DD"),
              dateType: "month",
              groupIds: that.groupIds
            }
          });
        }

        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );

        // console.log('上一月')
      } else if (this.$refs.old.innerHTML == "上周") {
        ++this.week;
        this.$refs.next.disabled = false;

        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .week(moment().week() - that.week)
            .startOf("week")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .week(moment().week() - that.week)
            .endOf("week")
            .format("YYYY-MM-DD");
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .week(moment().week() - that.week)
                .startOf("week")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .week(moment().week() - that.week)
                .endOf("week")
                .format("YYYY-MM-DD"),
              dateType: "week",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .week(moment().week() - that.week)
                .startOf("week")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .week(moment().week() - that.week)
                .endOf("week")
                .format("YYYY-MM-DD"),
              dateType: "week",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .week(moment().week() - that.week)
                .startOf("week")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .week(moment().week() - that.week)
                .endOf("week")
                .format("YYYY-MM-DD"),
              dateType: "week",
              groupIds: that.groupIds
            }
          });
        }

        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );
      } else {
        ++this.quarter;
        this.$refs.next.disabled = false;
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .quarter(moment().quarter() - that.quarter)
            .startOf("quarter")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .quarter(moment().quarter() - that.quarter)
            .endOf("quarter")
            .format("YYYY-MM-DD");
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .startOf("quarter")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .endOf("quarter")
                .format("YYYY-MM-DD"),
              dateType: "quarter",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .startOf("quarter")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .endOf("quarter")
                .format("YYYY-MM-DD"),
              dateType: "quarter",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .startOf("quarter")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .endOf("quarter")
                .format("YYYY-MM-DD"),
              dateType: "quarter",
              groupIds: that.groupIds
            }
          });
        }

        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );
      }
    },
    nexttime: function(s) {
      if (this.$refs.next.innerHTML == "下一日") {
        --this.day;
        if (this.day <= 0) {
          console.log(this.day, "x一日");
          this.$refs.next.disabled = true;
        }
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .subtract(that.day, "days")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .subtract(that.day, "days")
            .format("YYYY-MM-DD");
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              dateType: "now",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              dateType: "now",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              toDateStr: moment()
                .subtract(that.day, "days")
                .format("YYYY-MM-DD"),
              dateType: "now",
              groupIds: that.groupIds
            }
          });
        }
        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );
      } else if (this.$refs.next.innerHTML == "下一月") {
        --this.month;
        if (this.month <= 0) {
          console.log(this.day, "x一日");
          this.$refs.next.disabled = true;
        }
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .month(moment().month() - that.month)
            .startOf("month")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .month(moment().month() - that.month)
            .endOf("month")
            .format("YYYY-MM-DD");
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .month(moment().month() - that.month)
                .startOf("month")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().month(moment().month() - that.month).endOf("month").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().month(moment().month() - that.month).endOf("month").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "month",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .month(moment().month() - that.month)
                .startOf("month")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().month(moment().month() - that.month).endOf("month").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().month(moment().month() - that.month).endOf("month").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "month",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .month(moment().month() - that.month)
                .startOf("month")
                .format("YYYY-MM-DD"),
                toDateStr: moment(moment().month(moment().month() - that.month).endOf("month").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().month(moment().month() - that.month).endOf("month").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "month",
              groupIds: that.groupIds
            }
          });
        }

        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );

        // console.log('上一月')
      } else if (this.$refs.next.innerHTML == "下周") {

        --this.week;
        if (this.week <= 0) {
          this.$refs.next.disabled = true;
        }
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .week(moment().week() - that.week)
            .startOf("week")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .week(moment().week() - that.week)
            .endOf("week")
            .format("YYYY-MM-DD");
        
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .week(moment().week() - that.week)
                .startOf("week")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().week(moment().week() - that.week).endOf("week").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().week(moment().week() - that.week).endOf("week").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),
              dateType: "week",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .week(moment().week() - that.week)
                .startOf("week")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().week(moment().week() - that.week).endOf("week").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().week(moment().week() - that.week).endOf("week").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "week",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .week(moment().week() - that.week)
                .startOf("week")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().week(moment().week() - that.week).endOf("week").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().week(moment().week() - that.week).endOf("week").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "week",
              groupIds: that.groupIds
            }
          });
        }

        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );
      } else {
        --this.quarter;
        if (this.quarter <= 0) {
          console.log(this.day, "x一日");
          this.$refs.next.disabled = true;
        }
        let that = this;
        this.$refs.time.innerHTML =
          moment()
            .quarter(moment().quarter() - that.quarter)
            .startOf("quarter")
            .format("YYYY-MM-DD") +
          "~" +
          moment()
            .quarter(moment().quarter() - that.quarter)
            .endOf("quarter")
            .format("YYYY-MM-DD");
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .startOf("quarter")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().quarter(moment().quarter() - that.quarter).endOf("quarter").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().quarter(moment().quarter() - that.quarter).endOf("quarter").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "quarter",
              groupIds: that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .startOf("quarter")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().quarter(moment().quarter() - that.quarter).endOf("quarter").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().quarter(moment().quarter() - that.quarter).endOf("quarter").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "quarter",
              groupIds: that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: moment()
                .quarter(moment().quarter() - that.quarter)
                .startOf("quarter")
                .format("YYYY-MM-DD"),
              toDateStr: moment(moment().quarter(moment().quarter() - that.quarter).endOf("quarter").format("YYYY-MM-DD")).isBefore(moment().format("YYYY-MM-DD"))?moment().quarter(moment().quarter() - that.quarter).endOf("quarter").format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),                
              dateType: "quarter",
              groupIds: that.groupIds
            }
          });
        }

        axios.all([getrank(), getyx(), getinfo()]).then(
          axios.spread(function(rabk, yx, info) {
            that.listsum = [info.data, yx.data, rabk.data];
          })
        );
      }
    },
    handlePopupChecklistChange(val) {
      // 多选要传一个props splitSymbol ,join(splitSymbol)拼接传出，defaul:','
      // val:{label:'',value:''}
      console.log(val.value.join(), "handlePopupChecklistChange  valuevalue");
      console.log(val.label.join(), "handlePopupChecklistChange  labellabel");
      this.checkedLabels = val.label.join();
      this.groupIds = val.value.join();
      // this.$emit("input", val.value.join());
    },
    close() {
      this.isCheckListShow = false;
      console.log('guanbi',arguments)
      console.log(this.$refs.old.innerHTML ,arguments)
      if(this.$refs.old.innerHTML == "上一日"){
        let that = this;
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "now",
              groupIds:that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "now",
              groupIds:that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "now",
              groupIds:that.groupIds
            }
          });
        }
        axios
          .all([getrank(), getyx(), getinfo()])

          .then(
            axios.spread(function(rabk, yx, info) {
              that.listsum = [info.data, yx.data, rabk.data];
            })
          );
      }
      if(this.$refs.old.innerHTML == "上周"){
        let that = this;
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "week",
              groupIds:that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "week",
              groupIds:that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "week",
              groupIds:that.groupIds
            }
          });
        }
        axios
          .all([getrank(), getyx(), getinfo()])

          .then(
            axios.spread(function(rabk, yx, info) {
              that.listsum = [info.data, yx.data, rabk.data];
            })
          );
      }
      if(this.$refs.old.innerHTML == "上一月"){
        let that = this;
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "month",
              groupIds:that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "month",
              groupIds:that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "month",
              groupIds:that.groupIds
            }
          });
        }
        axios
          .all([getrank(), getyx(), getinfo()])

          .then(
            axios.spread(function(rabk, yx, info) {
              that.listsum = [info.data, yx.data, rabk.data];
            })
          );
      }
      if(this.$refs.old.innerHTML == "上季度"){
        let that = this;
        function getrank() {
          return axios.get("/report/business/rankCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "quarter",
              groupIds:that.groupIds
            }
          });
        }
        function getyx() {
          return axios.get("/report/business/yxCount", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "quarter",
              groupIds:that.groupIds
            }
          });
        }
        function getinfo() {
          return axios.get("/report/business/count", {
            params: {
              fromDateStr: that.$refs.time.innerHTML.substring(0,10),
              toDateStr: that.$refs.time.innerHTML.substring(11,21),
              dateType: "quarter",
              groupIds:that.groupIds
            }
          });
        }
        axios
          .all([getrank(), getyx(), getinfo()])

          .then(
            axios.spread(function(rabk, yx, info) {
              that.listsum = [info.data, yx.data, rabk.data];
            })
          );
      }
    }
  },
  mounted() {
    axios
      .get("/orgGroup/get_group_json")
      .then(response => {
        console.log(response);
        this.childrenList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

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
  outline: none;
}
.btn-a {
  background-color: #4a77b0;
  color: #fff;
  border: none;
  height: 40px;
  outline: none;
}
.select {
  width: 40%;
  text-align: center;
}
.content {
  background-color: #d7d7d7;
}
.body {
  background-color: #4a77b0;
}
.weui-label{
  color: #fff;
  font-size: 14px;
}
.weui-cell_access:active{
   background-color: #4a77b0 !important;
}
.time {
  color: #fff;
  float: right;
  padding-right: 20px;
  line-height: 40px;
  margin-top: -14px;
}
</style>

