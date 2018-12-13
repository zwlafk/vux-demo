<template  >
  <div>
    <slot name="content"></slot>
    <div v-transfer-dom>
      <popup v-model="isCheckListShow"
             position="bottom"
             height="100%"
             should-scroll-top-on-show>
        <div style="text-align:right">
          <i @click="$emit('close-popup')"
             style="font-size:1.5em"
             class="iconfont">&#xe601;</i></div>
        <group>
          <checklist :title="title"
                     v-model="tempVal"
                     :max="multiple?0:1"
                     @on-change="handleChecklistChange"
                     :options="options"></checklist>
        </group>
        <div class="height-block"></div>
        <x-button class="bottom-btn"
                  @click.native="handleClick"
                  type="primary">确定</x-button>
      </popup>
    </div>
  </div>

</template>

<script>
// todo,redo
import { deepFlattenTree } from "@/util";
import { Popup, XButton, CellBox, Group, Checklist } from "vux";
export default {
  name: "PopupChecklist",
  components: {
    Popup,
    XButton,
    CellBox,
    Group,
    Checklist
  },
  props: {
    labelKey: {
      type: String,
      default: "optionName"
    },
    valueKey: {
      type: String,
      default: "optionlistId"
    },
    fieldName: {},
    value: {},
    optionList: {},
    title: {},
    multiple: Boolean,
    isChildrenOnly: Boolean,
    isPopupShow: {},
    optionListChildName: {
      type: String,
      default: "childList"
    },
    isFromReport: Boolean,
    splitSymbol: {
      type: String,
      default: ","
    }
  },
  filters: {},
  watch: {
    isPopupShow(val) {
      this.isCheckListShow = val;
    },
    value(val) {
      if (this.isFromReport) this.tempVal = val.split(this.splitSymbol);
      console.log("this.tempVal = val;this.tempVal = val;this.tempVal = val;");
    },
    tempVal(val) {},
    options(val) {
      if (val.length && this.tempVal && this.tempVal.length) {
        let labelKey = [];
        if (this.multiple)
          this.tempVal = this.tempVal[0].split(this.splitSymbol);
        for (let index = 0; index < this.tempVal.length; index++) {
          let target = val.find(e => e.key == this.tempVal[index]);
          if (target && target.value) labelKey.push(target.value);
        }
        this.$emit("on-change", { value: this.tempVal, label: labelKey });
      }
    }
  },
  computed: {},
  data() {
    return {
      isCheckListShow: this.isPopupShow
    };
  },
  computed: {
    tempVal: {
      get() {
        return this.isFromReport
          ? this.value.split(this.splitSymbol)
          : this.value;
      },
      set() {
        return this.isFromReport
          ? this.value.split(this.splitSymbol)
          : this.value;
      }
    },
    options() {
      if (!this.optionList || !this.optionList.length) return [];
      let arr = deepFlattenTree(
        this.optionList,
        this.optionListChildName,
        this.isChildrenOnly
      );
      const { labelKey, valueKey } = this;
      // key:真实值，value：展示值
      return arr.map(e => ({ key: e[valueKey], value: e[labelKey] }));
    }
  },
  methods: {
    handleClick() {
      this.$emit("close-popup");
    },
    handleChecklistChange(value, key) {
      // console.log(value, "value");
      // console.log(key, "key");
      value = value.filter(e => !!e);
      key = key.filter(e => !!e);
      this.$emit("on-change", { value, label: key });
    }
  },
  mounted() {
    console.log(this.isCheckListShow, "isCheckListShow", this.isPopupShow);
  }
};
</script>

<style scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
</style>
