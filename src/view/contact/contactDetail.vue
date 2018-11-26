<!--联系人-编辑-->
<template>
  <div class="">
        <Group>
            <!-- <Cell title="姓名" :value="infoDetail.name" />
            <Cell title="所在部门" :value="infoDetail.groupname" />
            <Cell title="职务" :value="infoDetail.work" />
            <Cell title="出生日期" :value="infoDetail.birthday" />
            <Cell title="性别" :value="compSex" />
            <Cell title="主要联系人" :value="isDefault" />
            <Cell title="常用电话" :value="infoDetail.telphone" />
            <Cell title="备用电话" :value="infoDetail.telphonebak" />
            <Cell title="QQ" :value="infoDetail.qq" />
            <Cell title="邮箱" :value="infoDetail.email" />
            <Cell title="旺旺" :value="infoDetail.wangwang" />
            <Cell title="微信联系人" :value="infoDetail.telphonebak" /> -->
            <Cell v-for="item in fields" :key="item.fieldId" v-if="item.enable == 1">
                <span slot="title">{{item.fieldName}}</span>
                <span>{{infoDetail[ item.fieldCode ]}}</span>
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
      }
    },
    computed:{
      compSex(){
        return utils.sexDic(this.infoDetail.sex)
      },
      isDefault(){
        return utils.defaultDic(this.infoDetail.isDefault)
      }
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
