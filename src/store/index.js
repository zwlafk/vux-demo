import Vue from 'vue'
import Vuex from 'vuex'
import userInfoState from './modules/userInfo'
import clientState from './modules/client'
// import interviewerState from './modules/interviewer'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userInfoState,
    clientState
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
