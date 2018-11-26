<template  >
  <div>
    <group :title="fieldName">

      <x-input v-if="dataType==1"></x-input>

      <DateRangePicker v-model="date"
                       :dateItemList="childrenList"
                       @on-date-change="handleDateChange"
                       v-if="dataType==2"></DateRangePicker>

      <!-- key:真实值 id或1，2，3，value：展示值 -->
      <checklist v-if="dataType==3"
                 label-position="left"
                 :max="1"
                 :options="options"
                 v-model="checklistModel"
                 @on-change="handleChecklistChange"></checklist>

      <checklist v-if="dataType==4"
                 label-position="left"
                 :options="options"
                 @on-change="handleChecklistChange"></checklist>

      <PopupChecklist v-if="dataType==5"
                      v-model="checklistModel"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      :optionList="pendingArr"
                      labelKey="text"
                      valueKey="id"
                      multiple
                      optionListChildName="children"
                      :fieldName="fieldName">
        <cell-box is-link
                  slot="content"
                  @click.native="isCheckListShow = true">
          <div style="padding-right:15px;word-break: break-all;">
            {{checkedLabels?checkedLabels:`请选择${searchName}`}}
          </div>
        </cell-box>
      </PopupChecklist>

      <x-input v-if="dataType==6"></x-input>

      <PopupChecklist v-if="dataType==7"
                      v-model="checklistModel"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      :optionList="pendingArr"
                      labelKey="groupName"
                      valueKey="resGroupId"
                      optionListChildName="childrenList"
                      :fieldName="fieldName">
        <cell-box is-link
                  slot="content"
                  @click.native="isCheckListShow = true">
          <div style="padding-right:15px; ">
            {{checkedLabels?checkedLabels:`请选择${searchName}`}}
          </div>
        </cell-box>
      </PopupChecklist>

    </group>
  </div>

</template>

<script>
import clientApi from "@/api/client";
import api from "@/util/apiUtil";
import { deepFlattenTree } from "@/util";
import DateRangePicker from "@/components/DateRangePicker";
import PopupChecklist from "@/components/PopupChecklist";
import { Checklist, CellBox, Datetime, Group, XInput } from "vux";
export default {
  name: "FilterItem",
  components: {
    Checklist,
    CellBox,
    Datetime,
    Group,
    XInput,
    PopupChecklist,
    DateRangePicker
  },
  props: {
    value: {},
    dataType: {},
    childrenList: {},
    enable: {},
    fieldLength: {},
    fieldName: {},
    searchName: {},
    isRequired: {},
    paramValue: {},
    shouldClear: {}
  },
  filters: {},
  data() {
    return {
      isCheckListShow: false,
      // typeMapper: {
      //   1: "文本",
      //   2: "日期类型",
      //   3: "单选类型",
      //   4: "多选类型",
      //   5: "树",
      //   6: "整数类型",
      //   7: "资源分组"
      // },
      checkedLabels: "",
      date: {},
      pendingArr: [],
      checklistModel: [this.value]
    };
  },
  watch: {
    shouldClear(val) {
      console.warn("shouldClear", val);
      if (this.dataType == 2) this.date = {};
      this.checklistModel = [''];
    },
    value(val) {
      console.log(val, "watch valval");
      if (this.dataType == 3) this.checklistModel = [val];
    }
  },
  computed: {
    options() {
      if (!this.childrenList || !this.childrenList.length) return [];
      let arr = deepFlattenTree(this.childrenList);
      console.log(arr, "clclclclclclclclclc");
      return arr.map(e => ({ key: e.value, value: e.name }));
    }
    // pendingOptions() {
    //   if (!this.pendingArr || !this.pendingArr.length) return [];
    //   let arr = deepFlattenTree(this.pendingArr);
    //   console.log(arr, "clclclclclclclclclc");
    //   return arr.map(e => ({ key: e.id, value: e. }));
    // }
  },
  methods: {
    handleDateChange(val) {
      console.log("handleDateChange", val);
      this.$emit("input", val);
    },
    handleChecklistChange(key, label) {
      console.log(key, label, "aaa,bbb");
      this.$emit("input", ...key);
    },
    handlePopupChecklistChange(val) {
      // 多选要传一个props splitSymbol ,join(splitSymbol)拼接传出，defaul:','
      // val:{label:'',value:''}
      console.log(
        val.value.join(),
        val,
        "handlePopupChecklistChangehandlePopupChecklistChange  valuevalue"
      );
      console.log(
        val.label.join(),
        val,
        "handlePopupChecklistChangehandlePopupChecklistChange  labellabel"
      );
      this.checkedLabels = val.label.join();
      this.$emit("input", val.value.join());
    }
  },
  mounted() {
    if (this.dataType == 7) {
      console.log("资源分组");
      clientApi
        .getCustFormFieldList()
        .then(res => {
          console.log(res, "getCustFormFieldList res");
          console.log(res.data.data.groupList, "pendingArr res");
          this.pendingArr = res.data.data.groupList;
        })
        .catch(e => {
          console.log(e, "pendingArr e");
        });
    }
    if (this.dataType == 5) {
      console.log(this.paramValue, "..");
      api.custGetApi(this.paramValue).then(res => {
        console.log(res, "pendingArr custGetApi res");
        this.pendingArr = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>
