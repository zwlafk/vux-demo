import Vue from 'vue'
import Vuex from 'vuex'
import resumeState from './modules/resume'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    resumeState
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
