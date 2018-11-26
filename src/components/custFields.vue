<template lang="html">
    <div class="fieldsItem" v-if="item">

      <x-input :title=" title " :placeholder=" title" v-if="dataType == 1" v-model="currentVal" ></x-input>

      <datetime :title="title" v-if="item.dataType == 2" v-model="currentVal"></datetime>

      <selector :options="list" :title="title" v-if="dataType == 3" v-model="currentVal"></selector>

      <selector :options="list" :title="title" v-if="dataType == 4 || dataType == 5" v-model="currentVal"></selector>

    </div>
</template>

<script>
//接收props: item  title取值 dataType取值  value取值  fieldsChange值改变时的回调
// import moment from 'moment'
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
export default {
  name:'custFieldsForm',
  components: {
    Group,
    XButton,
    CellBox,
    Cell,
    Search,
    XInput,
    Selector,
    Datetime
  },
  props:['item','title','dataType','value','name'],
  data(){
    return {
      list:[
        { value: '选择1' },
        { value: '选择2' }
      ],
      currentVal:this.value
    }
  },
  /*当值变化时触发时间传回父组件*/
  watch:{
    currentVal:function(val){
      this.$emit('fieldsChange',{[this.name]:val})
    }
  },
}
</script>

<style lang="css">
</style>
