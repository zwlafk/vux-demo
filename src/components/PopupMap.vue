<template  >
  <div>
    <slot name="content"></slot>
    <div v-transfer-dom>
      <popup v-model="isMapShow"
             position="bottom"
             height="100%"
             should-scroll-top-on-show>
        <div>
          <search v-model="keyword" ref="search"></search>
        </div>
        <div style="height:100%;">
          <baidu-map class="map" center="杭州电子商务产业园" :zoom="zoom" @ready="handler" @click="getCurrentLocation">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" :isOpen="true"></bm-navigation>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>
            <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" @markersset="markersSet" @infohtmlset="infohtmlSet"></bm-local-search>
          </baidu-map>
        </div>
        
        <x-button class="bottom-btn"
                  @click.native="handleClick"
                  type="primary">确定</x-button>
      </popup>
    </div>
  </div>

</template>

<script>

import { Popup, XButton, CellBox, Group, Checklist, Search } from "vux";
export default {
  name: "PopupMap",
  components: {
    Popup,
    XButton,
    CellBox,
    Group,
    Checklist,
    Search
  },
  props: {
    labelKey: {
      type: String,
      default: "optionName"
    },
    valueKey: {
      type: String,
      default: "optionlistId"
    },
    fieldName: {},
    value: {},
    title: {},
    isPopupShow: {},
  },
  filters: {},
  watch: {
    isPopupShow(val) {
      this.isMapShow = val;
    },
    value(val) {

    },
    tempVal(val) {},
    options(val) {
      console.log("options",val)
    }
  },
  computed: {},
  data() {
    return {
      isMapShow: this.isPopupShow,
      center: {lng:'',lat:''},
      zoom: 15,
      location: '杭州',
      keyword: ''
    };
  },
  computed: {
    tempVal: {
      get() {
        
      },
      set() {
        
      }
    },
    options() {
      
    }
  },
  methods: {
    handleClick() {
      this.$emit("close-popup");
    },
    handler ({BMap, map}) {
    console.log(BMap, map)
      // this.center.lng = map.mc.lng
      // this.center.lat = map.mc.lat
      this.zoom = 15
    },
    getCurrentLocation(e) {
      console.log(e.currentTarget,e.currentTarget.getCenter())
    },
    markersSet(pois) {
      console.log(pois)
    },
    infohtmlSet(poi) {
      console.log(poi)
      this.$emit("on-submit", poi);
    },
    locationSuccess(point, AddressComponent, marker) {
      console.log(point, AddressComponent, marker)
    }
  },
  mounted() {
    console.log(this.isMapShow, "isMapShow", this.isPopupShow);
  }
};
</script>

<style scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
}
.map {
  width: 100%;
  height: 400px;
}
</style>
