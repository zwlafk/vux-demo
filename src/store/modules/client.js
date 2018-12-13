// initial state
const state = {
  params: {},
  currentClient: {}
}

// getters
const getters = {}

// actions
const actions = {
  getCurrentClient({ commit }) {
    commit('setCurrentClient', currentClient)
  },
  getParams({ commit }) {
    commit('setParams', parpms)
  }
}

// mutations
const mutations = {
  setCurrentClient(state, currentClient) {
    state.currentClient = currentClient
  },
  setParams(state, Params) {
    state.params = { ...state.params, ...params }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
