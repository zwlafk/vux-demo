<template  >
  <div>
    {{type}}
    <group>
      <template v-for="(item,index) in formFieldList">

        <FilterItem v-show="option.developCode==item.developCode"
                    :key="index"
                    :dataType="item.dataType"></FilterItem>
      </template>
      <!-- <x-input title="文本类型"></x-input>
      <datetime title="日期类型"
                start-date="1900-01-01"
                format="YYYY-MM-DD" />
      <checklist title="单选类型"
                 label-position="left"
                 :max="1"
                 :options="[ 'China', 'Japan', 'America' ]"
                 @on-change="change"></checklist>
      <checklist title="多选类型"
                 label-position="left"
                 :options="[ 'China', 'Japan', 'America' ]"
                 @on-change="change"></checklist> -->
      <!-- <checklist title="树"
                 label-position="left"
                 :options="[ 'China', 'Japan', 'America' ]"
                 @on-change="change"></checklist> -->
      <!-- <PopupChecklist />
      <x-input title="整数类型"></x-input>
      <checklist title="7资源分组"
                 label-position="left"
                 :options="[ 'China', 'Japan', 'America' ]"
                 @on-change="change"></checklist> -->
    </group>
  </div>
</template>

<script>
import PopupChecklist from "@/components/PopupChecklist";
import FilterItem from "@/components/FilterItem";
import moment from "moment";
import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  Datetime,
  Popup,
  Checklist,
  XInput
} from "vux";
export default {
  name: "FilterGenerator",
  components: {
    Group,
    PopupChecklist,
    XButton,
    Actionsheet,
    CellBox,
    Checklist,
    Cell,
    Datetime,
    Popup,
    FilterItem,

    XInput
  },
  props: ["option", "formFieldList"],
  watch: {
    option(val) {
      console.log(val.dataType, "sasasasa");
      this.type = val.dataType;
    },
    formFieldList(val) {}
  },
  computed: {
    formData() {
      if (!this.formFieldList.length) return {};
      console.log(this.formFieldList, "this.formFieldListthis.formFieldList");
      let data = {};
      this.formFieldList.map(e => {
        data[e.searchCode] = "";
      });
      return data;
    }
  },
  filters: {},
  mounted() {
    this.type = this.option.dataType;
  },
  methods: {
    change() {
      console.log(arguments);
    }
  },
  data() {
    return {
      type: 0,
      // formData:{},
      test: ""
    };
  }
};
</script>

<style scoped>
</style>
