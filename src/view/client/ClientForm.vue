<template>
  <div class="">
    <!-- <PopupChecklist /> -->
    <template v-for="item in requiredFields">
      <FormItem :key="item.id"
                v-bind="item"
                placeholder="必填"
                required
                v-model="formData[item.fieldCode]">
      </FormItem>
    </template>
    <div v-show="isUnrequiredFieldShow">
      <template v-for="item in restFields">
        <FormItem :key="item.id"
                  v-bind="item"
                  v-model="formData[item.fieldCode]">

        </FormItem>
      </template>
    </div>

    <div v-show="restFields.length"
         style="text-align:center;margin-top:20px;"
         @click="isUnrequiredFieldShow=!isUnrequiredFieldShow">{{isUnrequiredFieldShow? '收起':'展开'}}
    </div>

    <div class="height-block"></div>
    <x-button class="bottom-btn"
              type="primary"
              @click.native="handleClick">保存</x-button>

  </div>
</template>

<script>
import api from "@/api/client";
import { deepFlattenTree } from "@/util";
import PopupChecklist from "@/components/PopupChecklist";
import FormItem from "@/components/FormItem";
import { Group, XButton, Actionsheet, CellBox, Cell, Popup, XInput } from "vux";
export default {
  name: "ClientForm",
  components: {
    FormItem,
    PopupChecklist,
    Group,
    Popup,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    XInput
  },
  data() {
    return {
      custId: this.$route.params.custId,
      isUnrequiredFieldShow: false,
      // formData: {},
      // 全部字段
      fields: [],
      // 启用且必填字段
      requiredFields: [],
      // 切换显示/隐藏 字段 （启用非必填）
      restFields: [],
      groupList: [],
      groupOptionList: [],
      dataSource: {},
      requiredKeys: []
    };
  },
  watch: {
    fields(val) {
      if (!val.length) return;
      // 启用且必填字段
      this.requiredFields = val.filter(e => !!e.isRequired);
      this.requiredKeys = this.requiredFields.map(e => e.fieldCode);
      // 切换显示/隐藏 字段 （启用非必填）
      this.restFields = val.filter(e => !e.isRequired);
    }
  },
  computed: {
    formData() {
      if (!this.fields.length) return {};
      let data = {};
      let fieldsLength = this.fields.length;
      if (this.custId && this.dataSource.hasOwnProperty("custInfoBean")) {
        // 编辑
        for (let i = 0; i < fieldsLength; i++) {
          let currentKey = this.fields[i].fieldCode;
          data[currentKey] = this.dataSource.custInfoBean[currentKey] || "";
        }
      } else {
        // 新增
        for (let i = 0; i < fieldsLength; i++) {
          data[this.fields[i].fieldCode] = "";
        }
      }
      return data;
    }
  },
  methods: {
    handleClick() {
      // this.requiredKeys
      let isSubmitable = true;
      for (let index = 0; index < this.requiredKeys.length; index++) {
        let currentKey = this.requiredKeys[index];
        if (!this.formData[currentKey]) {
          isSubmitable = false;
          break;
        }
      }
      if (!isSubmitable) {
        return this.$vux.toast.show({
          text: "请检查必填项",
          position: "middle",
          type: "text"
        });
      }

      console.log(this.formData, "this.formData");
      if (this.custId) {
        this.formData.resCustId = this.custId;
      }
      api
        .saveCust(this.formData)
        .then(res => {
          if (!res.data.status) return;
          this.$router.back();
        })
        .catch(err => {});
    }
  },
  mounted() {
    api
      .getCustFormFieldList({id: this.custId})
      .then(res => {
        const { data } = res;
        this.groupList = data.data.groupList;
        this.groupOptionList = deepFlattenTree(this.groupList, "childrenList");
        this.fields = data.data.fieldSets.filter(e => e.enable);
      })
      .catch(() => {});
    if (this.custId) {
      api
        .getCustEditDetail({ custId: this.custId })
        .then(res => {
          this.dataSource = res.data.data;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
</style>
