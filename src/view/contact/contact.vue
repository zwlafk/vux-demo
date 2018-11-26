<template>
  <div class="contact-list">
    <group>
      <search v-model="searchs"
              @on-change="changeSearch"
              @on-submit="submitSearch('name',searchs)"
              @on-cancel="cancelSearch">
        <div v-show="this.searchBox">
          <CellBox @click.native="submitSearch('name',searchs)">查找客户姓名{{searchs}}</CellBox>
          <CellBox @click.native="submitSearch('telphone',searchs)">查找联系电话{{searchs}}</CellBox>
          <CellBox @click.native="submitSearch('telphonebak',searchs)">查找备用电话{{searchs}}</CellBox>
        </div>
      </search>
    </group>

    <group>
      <cell v-for='item in dataList' @click.native="detailClick(item.tscidId)" :key="item.tscidId" value-align="left">
        <p class="name">{{item.name}}</p>
        <p>{{item.orgId}}</p>
        <div class="icon-box">
          <Icon v-if="item.wxUserId" type="info-circle" @click.native.stop="infoClick(item.wxUserId)"/>
          <Icon v-if="item.telphone || item.telphonebak" type="success-circle" @click.native.stop="successClick(item.telphone,item.telphonebak)"/>
        </div>
      </cell>
    </group>
    <group>
      <x-button type="primary"
                @click.native="handleBtnClick">新增联系人</x-button>
    </group>
    <actionsheet v-model="isActionsheetShow"
                 :menus="menus"
                 @on-click-menu="click"
                 show-cancel></actionsheet>
  </div>
</template>

<script>
import api from "@/api/contact";

import {
  Group,
  XButton,
  Actionsheet,
  Selector,
  CellBox,
  Cell,
  Search,
  Icon,
  CellFormPreview
} from "vux";
export default {
  name: "contacts",
  components: {
    Group,
    Actionsheet,
    XButton,
    Selector,
    CellBox,
    Icon,
    Cell,
    Search,
    CellFormPreview
  },
  data() {
    return {
      searchs:"",
      searchBox:false,
      dataList: [],
      isActionsheetShow: false,
      menus: {
        import: "导入外部联系人",
        manualImport: "手动新增"
      }
    };
  },
  methods: {
    detailClick(tscidId){
      this.$router.push({ name: 'contactDetail' ,params: { tscidId: tscidId }});
    },
    handleBtnClick() {
      // this.$router.push({ name: "contactEdit" });
      this.isActionsheetShow = true;
    },
    import() {
      this.$router.push({ name: "contactExtra" });
    },
    manualImport() {
      // console.log(this.$route.params)
      this.$router.push({ name: "contactEdit" , params:this.$route.params});
    },
    click(key) {
      if(key !== "cancel"){
        console.log(key);
        this[key].apply(this);
      }
    },
    infoClick(wxUserId){
      console.log(wxUserId)
    },
    successClick(tel,telbak){
      console.log(tel,telbak)
    },
    submitSearch(type,val){
      let params = Object.assign({},this.$route.params.rciId?this.$route.params:{},{[type]:val})
      console.log(params)
      api.fetchList(params).then(res => {
        let {data:{result:{list}}} = res
        this.dataList = list;
        this.searchBox = false
      });
    },
    changeSearch(){
      this.searchBox = true
    },
    cancelSearch(){
      this.searchBox = false
    },
  },
  mounted() {
    api.fetchList(this.$route.params).then(res => {
      let {data:{result:{list}}} = res
      this.dataList = list;
    });
  }
};
</script>
<style lang="less">

  .contact-list{
    .weui-cells.vux-search_show .weui-cell:last-child{
      margin-bottom: 0;
    }

    .weui-cell{
      // padding-right: 100px;
      font-size: 14px;
      p{
        line-height: 24px;
        &.name{
          font-size: 16px;
          color: #333;
        }
      }

      .icon-box{
        position: absolute;
        right: 0;
        top: 10px;
        width: 100px;
      }
    }
  }
</style>
