<!--联系人-编辑-->
<template>
  <div class="">
        <Group>
            <Cell v-for="item in fields" :key="item.fieldId" v-if="item.enable == 1">
                <span slot="title">{{item.fieldName}}</span>
                <span>{{currentField(item)}}</span>
            </Cell>
        </Group>
        <group>
          <x-button type="primary"
                    @click.native="handleBtnClick">编辑</x-button>
        </group>
  </div>
</template>

<script>
  import {
    Panel,
    Group,
    CellBox,
    Cell,
    XButton,
  } from "vux";
  import api from '@/api/contact'
  import moment from 'moment'
  import commonAPI from '@/api/common'
  import utils from '@/util/translateUtils'

  export default {
    name: "contactsDetail",
    components: {
      Panel,
      Group,
      CellBox,
      Cell,
      XButton,
    },
    data() {
      return {
        infoDetail:{},
        fields:[]
      };
    },
    methods:{
      handleBtnClick(){
        this.$router.push({name:"contactEdit", params:this.$route.params})
      },
      currentField(it){
        let code = it.fieldCode
        let info = this.infoDetail[code]
        if(it.dataType == 2){/*日期类型*/
          return info ? moment(info).format("YYYY-MM-DD") : ""
        }

        if(it.optionList){
          let resultArr = []
            it.optionList.map(item=>{
              if(info.indexOf(item.optionlistId) >= 0){
                resultArr.push(item.optionName)
              }
            })
          return resultArr.join(",")
        }
        return info
      }
    },
    computed:{
      compSex(){
        return utils.sexDic(this.infoDetail.sex)
      },
      isDefault(){
        return utils.defaultDic(this.infoDetail.isDefault)
      },
    },
    created() {
      let {params:{tscidId}} = this.$route
      /*获取展现字段*/
      commonAPI.customFields().then( res =>{
        console.log(res)
        let {data : {result:{concatFieldSets}}} = res
        this.fields = concatFieldSets
      })
      /*获取详情数据*/
      api.fetchItem({detailId:tscidId,timeStamp:new Date().getTime()}).then((res)=>{
        let {data:{result}} = res
        this.infoDetail = result
      }).catch(err=>{
        console.log(err)
      })
    }
  };
</script>
