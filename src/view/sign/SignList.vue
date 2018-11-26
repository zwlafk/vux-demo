<template>
  <div class="sign-list-content">
    <divider>head</divider>
    <card v-for="item in dataList" :key="item.id">
      <div slot="header">
      <img :src="item.avatar" style="width:40px;">
      <span style="color:#999;font-size:12px;">{{item.nickname}} {{item.comefrom}}</span>
      </div>
      <div slot="content" class="card-padding">
        <p style="font-size:14px;line-height:1.2;" @click="handleSignDetail(item.id)">{{item.info}}</p>
        <div>
          <img v-for="(imageSrc,index) in item.pic.split('<$imgurl$>')" :key="index" :src="imageSrc" style="width:40px;" />
        </div>
        {{item.recordpath}}录音（总长{{item.recordtime}}秒）
        <div>{{item.address_qd}}</div>
        <div>{{item.customer}}</div>
        <flexbox>
          <flexbox-item><x-button @click.native="handleAddReply()">回复</x-button></flexbox-item>
          <flexbox-item><x-button @click.native="handlePraise(item.id)">赞</x-button></flexbox-item>
          <flexbox-item v-if="deleteButtonShow" @click.native="handleDeleteSign(item.id)"><x-button>删除</x-button></flexbox-item>
        </flexbox>
      </div>
    </card>

    <group>
      <x-button type="primary" class="btn-submit" @click.native="handleSignForm">签到</x-button>
    </group>
  </div>
</template>


<script>
import api from '@/api/sign'
import {
  Group,
  XButton,
  Actionsheet,
  CellBox,
  Cell,
  Search,
  CellFormPreview,
  Card,
  Divider,
  Flexbox, 
  FlexboxItem
} from "vux";
export default {
  name: "SignWrapper",
  components: {
    Group,
    Actionsheet,
    XButton,
    CellBox,
    Cell,
    Search,
    CellFormPreview,
    Card,
    Divider,
    Flexbox, 
    FlexboxItem
  },
  data() {
    return {
      dataList: [],
      deleteButtonShow: true
    };
  },
  methods: {
    handleAddReply(){
      this.$router.push({name:'SignReplyForm'})
    },
    handlePraise(targetid){
      var params = {targetid:targetid,type:1}
      api.fetchHandlePraise(params)
    },
    handleSignDetail(wsiId){
      this.$router.push({name:"SignDetail",params:{wsiId:wsiId}})
    },
    handleDeleteSign(wsiId){
      api.fetchDeleteSign({wsiId:wsiId}).then((res)=>{
        if(res.data.status){
          this.dataList = this.dataList.filter((item)=>{
            return item.id != wsiId
          })
        }else{
          console.log(res.data.msg);
        }
      })
    },
    handleSignForm() {
      this.$router.push({name:"SignForm"})
    }
  },
  mounted() {
    api.fetchList().then(res => {
      if(res.data.status){
        console.log(res.data.list)
        this.dataList = res.data.list
      }else{
        console.log(res.data.msg)
      }
    })
  }
};
</script>
<style scoped lang="less">
  .sign-list-content {
    padding-bottom: 60px;

    .btn-submit {
      position:fixed; 
      bottom:0;
    }
  }
</style>