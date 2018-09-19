<!--面试反馈-->
<template >
  <div class="">
    <Group>
        <cell title="星期一 09月11日" value="已反馈"></cell>
        <cell-form-preview :list="list"></cell-form-preview>
    </Group>
    <Group>
        <cell title="星期一 09月11日" value="已反馈"></cell>
        <cell-form-preview :list="list1"></cell-form-preview>
    </Group>
    <Group>
        <cell title="星期一 09月11日" value="已反馈"></cell>
        <cell-form-preview :list="list2"></cell-form-preview>
    </Group>
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
    name: "interviewFeedback",
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
