<template >
  <div class="">
    <Group>
        <cell title="简历推送通知"></cell>
        <cell-form-preview :list="list"></cell-form-preview>
        <cell title="详情" is-link></cell>
    </Group>
    <Group>
        <cell title="面试安排通知"></cell>
        <cell-form-preview :list="list1"></cell-form-preview>
        <cell title="详情" is-link></cell>
    </Group>
    <Group>
        <cell title="面试安排提醒"></cell>
        <cell-form-preview :list="list2"></cell-form-preview>
        <cell title="详情" is-link></cell>
    </Group>
    <Group>
        <cell title="候选人签到提醒"></cell>
        <cell-form-preview :list="list3"></cell-form-preview>
        <cell title="详情" is-link></cell>
    </Group>
    <Group>
        <cell title="添加面试反馈通知"></cell>
        <cell-form-preview :list="list4"></cell-form-preview>
        <cell title="详情" is-link></cell>
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
    name: "pointOut",
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
            { label: '政治面貌:', value: 'a'},
            { label: '求职状态:', value: 'a'},
            { label: '居住地:', value: 'a'}
          ],
        list1: [
            { label: '政治面貌:', value: 'a'},
            { label: '求职状态:', value: 'a'},
            { label: '居住地:', value: 'a'}
        ],
        list2: [
            { label: '政治面貌:', value: 'a'},
            { label: '求职状态:', value: 'a'},
            { label: '居住地:', value: 'a'}
        ],
        list3: [
            { label: '政治面貌:', value: 'a'},
            { label: '求职状态:', value: 'a'},
            { label: '居住地:', value: 'a'}
        ],
        list4: [
            { label: '政治面貌:', value: 'a'},
            { label: '求职状态:', value: 'a'},
            { label: '居住地:', value: 'a'}
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
