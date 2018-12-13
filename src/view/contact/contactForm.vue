<!--联系人-编辑-->
<template>
  <div class="">
        <group class="edit-box">
             <PopupChecklist v-model="infoDetail.rciId"
                              :isPopupShow="isCheckListShow"
                             @on-change="handlePopupChecklistChange"
                             @close-popup="isCheckListShow = false"
                             :optionList="custList"
                             isFromReport
                             labelKey="custName"
                             valueKey="custId">
               <cell-box is-link
                          slot="content"
                          @click.native="isCheckListShow = true">
                          {{ label? label:"请选择客户"}}
               </cell-box>
             </PopupChecklist>
             <template v-for="item in fields" v-if="item.enable == 1">
               <FormItem :key="item.fieldId"
                          v-if="item.dataType != 2"
                         v-bind="item"
                         v-model="infoDetail[item.fieldCode]">
               </FormItem>
               <group :title="item.fieldName"
                      v-if="item.dataType == 2">
                 <datetime v-model="infoDetail[item.fieldCode]"
                          style="font-size:14px;"
                          :title="item.fieldName"
                         format="YYYY-MM-DD" />
               </group>
             </template>
        </group>
        <group class="saveBtn">
              <x-button type="primary" @click.native="saveDetail">保存</x-button>
        </group>
  </div>
</template>

<script>
  import {
    Group,
    XButton,
    CellBox,
    Cell,
    Search,
    XInput,
    Selector,
    Datetime
  } from "vux";
  import PopupChecklist from "@/components/PopupChecklist";
  import api from "@/api/contact"
  import commonAPI from '@/api/common'
  import custAPI from '@/api/client'
  import FormItem from "@/components/FormItem";
  export default {
    name: "contactsEdit",
    components: {
      Group,
      XButton,
      CellBox,
      Cell,
      Search,
      XInput,
      Selector,
      Datetime,
      FormItem,
      PopupChecklist
    },
    data() {
      return {
        custList:[],
        infoDetail:{
          rciId:""
        },
        fields:[],
        isCheckListShow:false,
        label:""
      };
    },
    methods:{
      saveDetail(){
        api.saveItem(this.infoDetail).then(res =>{
          let {data:{resultCode,resultDesc}} = res
          if(resultCode == 1){
            this.$vux.alert.show({
              title: '新增结果',
              content: "操作成功"
            })
             this.$router.go(-1)
          }else{
            this.$vux.alert.show({
              title: '新增结果',
              content: resultDesc
            })
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      handlePopupChecklistChange(val){
        this.label = val.label.pop()
        this.infoDetail.rciId = val.value.pop()
        console.log(val)
      }
    },
    mounted(){
      let {params:{tscidId}} = this.$route
      /*获取字段*/
      commonAPI.customFields().then( res =>{
        let {data : {result:{concatFieldSets}}} = res
        this.fields = concatFieldSets
      })
      /*获取客户列表*/
      custAPI.fetchList().then(res =>{
        this.custList = res.data.list;
      })
      /*获取数据*/
      if(tscidId){
        api.fetchItem({detailId:tscidId}).then((res)=>{
          let {data:{result}} = res
          this.infoDetail = result
        }).catch(err=>{
          console.log(err)
        })
      }
    },
  };
</script>
<style lang="less">
.edit-box{
    margin-bottom: 50px;

    .weui-cells:before{
      border-top: none;
    }
}
.saveBtn{
  width:100%;
  position: fixed;
  bottom: 0;
}
</style>
