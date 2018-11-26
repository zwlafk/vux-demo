<template  >
  <div class="form-item">
    <group :title="fieldName">
      <x-input v-if="dataType==1"
               v-model="tempVal"
               @on-change="handleInputChange"
               :placeholder="'请输入'+fieldName"></x-input>

      <DateRangePicker v-model="date"
                       v-if="dataType==2"></DateRangePicker>

      <PopupChecklist v-if="dataType==3"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      :optionList="optionList"
                      :fieldName="fieldName">
        <cell-box is-link
                  slot="content"
                  @click.native="isCheckListShow = true">
          <div style="padding-right:15px;">
            {{checkedLabels?checkedLabels:`请选择${fieldName}`}}
          </div>
        </cell-box>
      </PopupChecklist>

      <PopupChecklist v-if="dataType==4"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      :optionList="optionList"
                      :fieldName="fieldName"
                      multiple>
        <cell-box is-link
                  slot="content"
                  @click.native="isCheckListShow = true">
          <div style="padding-right:15px;">
            {{checkedLabels?checkedLabels:`请选择${fieldName}`}}
          </div>
        </cell-box>
      </PopupChecklist>

      <PopupChecklist v-if="dataType==5"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      :optionList="optionList"
                      :fieldName="fieldName">
        <cell-box is-link
                  slot="content"
                  @click.native="isCheckListShow = true">
          <div style="padding-right:15px;">
            {{checkedLabels?checkedLabels:`请选择${fieldName}`}}
          </div>
        </cell-box>
      </PopupChecklist>

      <x-input v-if="dataType==6"></x-input>

      <PopupChecklist v-if="dataType==7"
                      :isPopupShow="isCheckListShow"
                      @on-change="handlePopupChecklistChange"
                      @close-popup="isCheckListShow = false"
                      :optionList="optionList"
                      :fieldName="fieldName">
        <cell-box is-link
                  slot="content"
                  @click.native="isCheckListShow = true">
          <div style="padding-right:15px;">
            {{checkedLabels?checkedLabels:`请选择${fieldName}`}}
          </div>
        </cell-box>
      </PopupChecklist>
    </group>
  </div>

</template>

<script>
import { CellBox, Group, XInput } from "vux";
import DateRangePicker from "@/components/DateRangePicker";
import PopupChecklist from "@/components/PopupChecklist";
export default {
  name: "FormItem",
  components: {
    DateRangePicker,
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
    fieldName: {},
    isRequired: {},
    optionList: {}
  },
  filters: {},
  watch: {
    value(val) {
      console.log(val, "formitem watch val");
      this.tempVal = val;
    }
  },
  data() {
    return {
      isCheckListShow: false,
      typeMapper: {
        1: "文本",
        2: "日期类型",
        3: "单选类型",
        4: "多选类型",
        5: "树",
        6: "整数类型",
        7: "资源分组"
      },
      checkedLabels: ""
    };
  },
  watch: {
    isCheckListShow(val) {}
  },
  computed: {
    tempVal: {
      get() {
        return this.value;
      },
      set(newVal) {
        return this.value;
      }
    }
  },
  methods: {
    handleInputChange(val) {
      this.$emit("input", val);
    },
    handlePopupChecklistChange(val) {
      // 多选要传一个props splitSymbol ,join(splitSymbol)拼接传出，defaul:','
      // val:{label:'',value:''}
      this.checkedLabels = val.label.join();
      this.$emit("input", val.value.join());
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
