import axios from 'axios'
import API from '@/util/apiUtil'

export default {

  // fetchList(params){
  //   return axios.get('/report/business/count',params)
  // },
  getrank(params) {
    return API.GET("/report/business/rankCount",params)
  },
  getyx(params) {
    return API.GET("/report/business/yxCount",params)
  },
  getinfo(params) {
    return API.GET("/report/business/count",params)
  }
}