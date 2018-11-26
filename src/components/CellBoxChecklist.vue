<template  >

  <PopupChecklist :isPopupShow="isCheckListShow"
                  @on-change="handlePopupChecklistChange"
                  @close-popup="isCheckListShow = false"
                  :multiple="multiple"
                  :labelKey="labelKey"
                  :valueKey="valueKey"
                  v-model="tempVal"
                  :splitSymbol="splitSymbol"
                  isFromReport
                  :optionList="optionList">
    <cell-box is-link
              slot="content"
              @click.native="isCheckListShow = true">

      <div style="flex:1">
        {{label}}
      </div>
      <div style="padding-right:15px;">
        {{checkedLabels}}
      </div>
    </cell-box>
  </PopupChecklist>

</template>

<script>
import { CellBox, Group, XInput } from "vux";
import PopupChecklist from "@/components/PopupChecklist";
export default {
  name: "CellBoxChecklist",
  components: {
    PopupChecklist,
    CellBox,
    Group,
    XInput
  },
  props: {
    value: {},
    dataType: {},
    enable: {},
    fieldLength: {},
    label: {},
    isRequired: {},
    optionList: {},
    multiple: Boolean,
    labelKey: {},
    valueKey: {},
    splitSymbol: {
      type: String,
      default: ","
    }
  },
  filters: {},
  data() {
    return {
      isCheckListShow: false,

      checkedLabels: ""
    };
  },
  watch: {
    isCheckListShow(val) {}
  },
  computed: {
    tempVal(){
      return this.value
    }
  },
  methods: {
    handleInputChange(val) {
      console.log(val, "handleInputChange");
      this.$emit("input", val);
    },
    handlePopupChecklistChange(val) {
      // 多选要传一个props splitSymbol ,join(splitSymbol)拼接传出，defaul:','
      // val:{label:'',value:''}
      console.log(val.value.join(), "handlePopupChecklistChange  valuevalue");
      console.log(val.label.join(), "handlePopupChecklistChange  labellabel");
      this.checkedLabels = val.label.join();
      this.$emit("input", val.value.join(this.splitSymbol));
    }
  },
  mounted() {}
};
</script>

<style  lang="less">
.form-item {
  .weui-cell {
    font-size: 14px;
  }
}
</style>
