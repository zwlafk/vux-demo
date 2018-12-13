import axios from 'axios'
import API from '@/util/apiUtil'

export default {

  fetchList(params) {
    return API.GET('/resource/custList/page', params)
  },

  fetchFieldList(params) {
    return API.GET('/resource/custList/search', params)
  },

  getCust(params) {
    return API.GET('/res/cust/custInfoData', params)
  },

  getCustFormFieldList(params) {
    return API.GET('/res/cust/toAddRes', params)
  },

  getCustFollowList(params) {
    return API.GET('/resource/mycust/linkRecord', params)
  },
  getCustCommentList(params) {
    return API.GET('/resource/mycust/reviewsRecord', params)
  },
  saveCust(params) {
    return axios.post('/res/cust/addRes', params)
  },

  giveUpCust(params) {
    return API.GET('/res/cust/removeCust', params)
  },

  signedCust(params) {
    return API.GET('/res/cust/sign', params)
  },

  initFollow(params) {
    return API.GET('/cust/custFollow/initFollowData', params)
  },

  saveComment(params) {
    return API.GET('/resource/mycust/addReviews', params)
  },

  saveFollowRecord(params) {
    return axios.post('/cust/custFollow/saveCustFollow', params)
  },

  getSoundList(params) {
    return API.GET('/resource/mycust/callRecord', params)
  },

  getFeedbackList(params) {
    return API.GET('/resource/mycust/serviceRecord', params)
  },
  getCustDetail(params) {
    return API.GET('/res/cust/custInfoZl', params)
  },
  getCustEditDetail(params) {
    return API.GET('/res/cust/toEditRes', params)
  },
  getFollowDetail(params) {
    return API.GET('/resource/mycust/linkRecordDetails', params)
  },

}
