import axios from 'axios'
import API from '@/util/apiUtil'

export default {

  fetchList(params){
    return API.GET('/work/sign/getAll',params)
  },
  fetchSignDetail(params){
    return API.GET('/work/sign/signDetail',params)
  },
  fetchAddSign(params) {
    return axios.post('/work/sign/addSign',params)
  },
  fetchDeleteSign(params){
    return API.GET('/work/Reply/deleteSignIn',params)
  },
  fetchHandlePraise(params){
    return API.GET('/work/Like/addLike',params)
  },
  fetchPraiseList(params){
    return API.GET('/work/Like/LikeList',params)
  },
  fetchReplyList(params){
    return API.GET('/work/Reply/replyList',params)
  },
  fetchAddReply(params){
    return API.GET('/work/Reply/addReply',params)
  },
  fetchDeleteReply(params){
    return API.GET('/work/Reply/deleteReply',params)
  },
  fetchLinkManList(params){
    return axios.get('/res/cust/linkman/search/company',{params:params})
  },
  fetchNearCustList(params) {
    return API.GET('/near/customer/list',params)
  },
  fetchAllCustList(params) {
    return API.GET('/work/sign/search/customer',params)
  },
  fetchMediaList(params){
    return axios.post('/wx/media/store',params)
  }
}