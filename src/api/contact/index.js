import axios from 'axios'


export default {

  fetchList(params){
    return axios.get('/res/cust/linkman/search/company',{params:params})
  },

  fetchExtraRadio(params){
    return axios.post('/res/cust/linkman/search',{params:params})
  },

  fetchImport(params){
    return axios.post('/res/cust/linkman/importExternalUserInfos',{bindInfoList:params})
  },

  addItem(params){
    return axios.post('/res/cust/linkman/addDetail',{params:params})
  },

  deleteItem(params){
    return axios.post('/res/cust/linkman/delDetail',{params:params})
  },

  saveItem(params){
    return axios.post('/res/cust/linkman/saveDetail',params)
  },

  fetchItem(params){
    return axios.get('/res/cust/linkman/detail',{params:params})
  },

  fetchExtraList(params){
    return axios.get('/res/cust/linkman/externalUserInfosInWx',{params:params})
  },

}
