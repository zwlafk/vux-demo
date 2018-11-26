<template  >
  <popup-picker :title='title'
                show-name
                @on-change="onChange"
                :data="list"
                v-model="tempVal"></popup-picker>
  <!-- demo -->
  <!-- <Picker title="户籍性质"
              //传入值
              v-model="formData.residenceStatus"
              //码表选项[{keyName:'xxx',keyValue:1},{keyName:'xxxx',keyValue:2}...]
              :optionList="pickerList.residenceStatus"
              /> -->
</template>

<script>
import { PopupPicker } from "vux";
export default {
  name: "Picker",
  components: {
    PopupPicker
  },
  props: ["value", "optionList", "title"],
  filters: {},
  data() {
    return {
      tempVal: this.value ? [this.value.toString()] : []
    };
  },
  watch: {
    value(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempVal = [val.toString()];
      }
    }
  },
  computed: {
    list() {
      let list = this.optionList.map(e => {
        return { name: e.keyName, value: e.keyValue };
      });
      return [list];
    },
    selectedItem() {
      let val = this.value.toString();
      return [val];
    }
  },
  methods: {
    onChange(val) {
      this.$emit("input", Number(...val));
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
