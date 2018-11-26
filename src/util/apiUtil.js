import axios from 'axios'

export default {
  GET(url, data) {
    return axios.get(url, {
      params: data,

    })
  },
  custPostApi(url, data){
    return axios.post(url,data)
  },
  custGetApi(url, data){
    return this.GET(url,data)
  }
}
