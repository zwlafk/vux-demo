// initial state
const state = {
  userInfo: {}
}

// getters
const getters = {}

// actions
const actions = {
  getUserInfo({ commit }) {
    commit('setUserInfo', userInfo)
  }
}

// mutations
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = { ...state.userInfo, ...userInfo }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
