import axios from 'axios'

export default {
  customFields(params){
    return axios.get("/res/cust/linkman/customFields",params )
  }
}
