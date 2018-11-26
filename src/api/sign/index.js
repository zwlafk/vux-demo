import axios from 'axios'
import API from '@/util/apiUtil'

export default {

  fetchList(params){
    return API.GET('/work/sign/getAll',params)
  },
  fetchSignDetail(params){
    return API.GET('/work/sign/signDetail',params)
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
  }
}