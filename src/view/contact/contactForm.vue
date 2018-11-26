<!--联系人-编辑-->
<template>
  <div class="">
        <group>
             <!-- <x-input placeholder="所属客户"></x-input>
             <x-input placeholder="请输入文本字段1"></x-input>
             <x-input placeholder="请输入文本字段2"></x-input>
             <x-input placeholder="常用电话" v-model="infoDetail.telphone"></x-input>
             <x-input placeholder="备用电话" v-model="infoDetail.telphonebak"></x-input>
             <selector :options="list" title="单选字段"></selector>
             <selector :options="list" title="多选字段"></selector>
             <datetime title="日期字段"></datetime> -->
             <!-- <div v-for="item in fields" :key="item.fieldId" v-if="item.enable == 1"> -->
                 <!-- <span slot="title">{{item.fieldName}}</span>
                 <span>{{infoDetail[ item.fieldCode ]}}</span> -->

                <!-- 传入props item title显示的label name读取键名 dataType 数据类型 v-on事件绑定 事件名为fieldsChange -->
                 <!-- <custFieldsForm :item="item" :title="item.fieldName" :name="item.fieldCode" :dataType="item.dataType" v-model="infoDetail[ item.fieldCode ]" v-on:fieldsChange="fieldsChange"/> -->
                 <!-- <x-input :title="item.fieldName" :placeholder="item.fieldName" v-if="item.dataType == 1" v-model="infoDetail[ item.fieldCode ]"></x-input>

                 <datetime :title="item.fieldName" v-if="item.dataType == 2" v-model="infoDetail[ item.fieldCode ]"></datetime>

                 <selector :options="list" :title="item.fieldName" v-if="item.dataType == 3" v-model="infoDetail[ item.fieldCode ]"></selector>

                 <selector :options="list" :title="item.fieldName" v-if="item.dataType == 4 || item.dataType == 5" v-model="infoDetail[ item.fieldCode ]"></selector> -->

             <!-- </div> -->
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
        <group>
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
  import api from "@/api/contact"
  import commonAPI from '@/api/common'
  // import custFieldsForm from '@/components/custFields'
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
      FormItem
    },
    data() {
      return {
        list:[
          { value: '选择1' },
          { value: '选择2' }
        ],
        infoDetail:{},
        fields:[]
      };
    },
    methods:{
      saveDetail(){
        api.saveItem(this.infoDetail).then(res =>{
          let {data:{resultCode,resultDesc}} = res
          if(resultCode == 1){
            // this.$router.push({ name: 'contact'})
             this.$router.go(-1)
          }else{
            console.log(resultDesc)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      fieldsChange(val){
        this.infoDetail = Object.assign({},this.infoDetail,val)
      }
    },
    created(){
      let {params:{tscidId}} = this.$route
      /*获取字段*/
      commonAPI.customFields().then( res =>{
        console.log(res)
        let {data : {result:{concatFieldSets}}} = res
        this.fields = concatFieldSets
      })
      /*获取数据*/
      if(tscidId){
        api.fetchItem({detailId:tscidId}).then((res)=>{
          console.log(res)
          let {data:{result}} = res
          this.infoDetail = result
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.infoDetail.rciId = this.$route.params.rciId
      }
    }

  };
</script>
