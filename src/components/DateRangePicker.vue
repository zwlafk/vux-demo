<template  >
  <Group class="group-nomargintop">
    <!--  year-row="{value}年"
                month-row="{value}月"
                day-row="{value}日" -->
    <!-- todo  -->
    <datetime title="开始时间"
              @on-change="onChange"
              v-model="duringStart"
              format="YYYY-MM-DD" />
    <datetime title="结束时间"
              @on-change="onChange"
              v-model="duringEnd"
              format="YYYY-MM-DD" />
  </Group>
</template>

<script>
import moment from "moment";
import { Group, Datetime } from "vux";
export default {
  name: "DateRangePicker",
  components: {
    Group,
    Datetime
  },
  props: ["value", "dateItemList"],
  filters: {},
  data() {
    return {
      duringStart: this.value[this.dateItemList[0].name],
      duringEnd: this.value[this.dateItemList[1].name]
    };
  },
  watch: {
    value(val) {
      console.log(val, "vavavavavav");
      // val[dateItemList[0].name]
      // val[dateItemList[1].name]
      this.duringStart = val[this.dateItemList[0].name]
        ? moment(val[this.dateItemList[0].name]).format("YYYY-MM-DD")
        : "";
      this.duringEnd = val[this.dateItemList[1].name]
        ? moment(val[this.dateItemList[1].name]).format("YYYY-MM-DD")
        : "";
    }
  },
  computed: {},
  methods: {
    onChange(val) {
      // if (!this.duringStart && !this.duringEnd) return this.$emit("input", []);
      let duringStart = this.duringStart
        ? moment(this.duringStart).format("YYYY-MM-DD")
        : "";
      let duringEnd = this.duringEnd
        ? moment(this.duringEnd).format("YYYY-MM-DD")
        : "";
      let valObj = {
        [this.dateItemList[0].name]: duringStart,
        [this.dateItemList[1].name]: duringEnd
      };
      // this.$emit("input", [duringStart, duringEnd]);

      this.$emit("on-date-change", valObj);
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
