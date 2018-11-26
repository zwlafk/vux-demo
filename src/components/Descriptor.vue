<template  >
  <div>
    <dl v-for="(item,index) in dataList"
        :key="index">
      <dt>{{item.key|transKey(dataMapper)}}</dt>
      <dd v-if="item.key=='label'" style="display: flex;flex-wrap: wrap;padding-left: 0;">
        <span style="flex:0 0 33.33%"
              v-for="(item,index) in item.value.split('#')"
              v-if="index<9"
              :key="index">{{item}}</span>
        <span style="color:#000"
              @click.stop="handleShowAll(item.value)"
              v-if="item.value.split('#').length>9">查看全部</span>
        <!-- {{item.value.split('#').join()}} -->
      </dd>
      <dd v-else>{{item|transValue}}</dd>
    </dl>
    <div v-transfer-dom>
      <x-dialog v-model="isLabelDialogShow"
                hide-on-blur>
        <div class="label-dialog">
          <!-- <p style="flex:0 0 100%">行动标签</p> -->
          <span v-for="(item,index) in labelArr"
                :key="index"
                class="label-dialog-item">{{item}}</span>
          <!-- {{labelArr}} -->
        </div>
        <!-- <div @click="isLabelDialogShow=false">
         close
        </div> -->
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XDialog } from "vux";

import moment from "moment";
import { dataListGenerator } from "@/util";
export default {
  name: "Descriptor",
  components: { XDialog },
  props: ["dataSource", "dataMapper"],
  data() {
    return {
      isLabelDialogShow: false,
      label: ""
    };
  },
  methods: {
    handleShowAll(val) {
      console.log("dsa", val);
      this.label = val;
      this.isLabelDialogShow = true;
    }
  },
  filters: {
    transKey(key, dataMapper) {
      return dataMapper[key];
    },
    transValue(item) {
      let todoKey = {
        time_near(value) {
          if (!value) return "";
          return moment(value).format("YYYY-MM-DD HH:mm");
        },
        sale_status(value) {
          let mapper = {
            1: "意向客户",
            2: "签约客户"
          };
          return mapper[value];
        },
        type(value) {
          // 0.企业客户；1.个人客户）
          let mapper = {
            0: "企业客户",
            1: "个人客户"
          };
          return mapper[value];
        }
      };
      if (todoKey[item.key]) return todoKey[item.key](item.value);
      return item.value;
    }
  },
  computed: {
    dataList() {
      return dataListGenerator(this.dataSource, this.dataMapper);
    },
    labelArr() {
      return this.label.split("#");
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
dt {
  width: 7em;
  float: left;
  // text-align-last: justify;
  // text-align: justify;
}
dd {
  color: #c1c1c1;
  padding-left: 7em;
}
.label-dialog {
  display: flex;
  flex-wrap: wrap;
  &-item {
    flex: 0 0 50%;
    text-indent: 1em;
    text-align: left;
  }
}
</style>
