<template>
  <div class="">
    <group>
        <cell title="基本信息" is-link></cell>
    </group> 
    <group>
        <cell title="求职意向" is-link></cell>
    </group>
    <group>
        <cell title="工作经验" is-link></cell>
    </group> 
    <group>
        <cell title="项目经验" is-link></cell>
    </group>
    <group>
        <cell title="教育经历" is-link></cell>
    </group> 
    <group>
        <cell title="技能/语言" is-link></cell>
    </group>
    <group>
        <cell title="证书" is-link></cell>
    </group> 
    <group>
        <cell title="培训经历" is-link></cell>
    </group>
  </div>
</template>
<script>
  import {
    Group,
    XInput,
    Datetime,
    PopupRadio,
    XAddress,
    CellBox,
    XTextarea,
    XButton,
    Selector,
    CellFormPreview,
    Cell
  } from "vux";

  export default {
    name: "lookResumeNext",
    components: {
      Group,
      XInput,
      Datetime,
      PopupRadio,
      XAddress,
      CellBox,
      XTextarea,
      XButton,
      Selector,
      CellFormPreview,
      Cell
    },
    data() {
      return {
        list: [
            { label: '面试信息', value: 's' }, 
            { label: '张宝宝',value: '优秀' }, 
            { label: '张宝宝',value: '未反馈' }, 
            { label: '星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一',value: '' }
          ],
        list1: [
            { label: '面试信息', value: 's' }, 
            { label: '张宝宝',value: '优秀' }, 
            { label: '张宝宝',value: '未反馈' }, 
            { label: '星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一',value: '' }
          ],
        list2: [
            { label: '面试信息', value: 's' }, 
            { label: '张宝宝',value: '优秀' }, 
            { label: '张宝宝',value: '未反馈' }, 
            { label: '星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一星期一',value: '' }
          ]
      };
    }
  };
</script>

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

</style>
