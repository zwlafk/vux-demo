// initial state
const state = {
  params: {},
  currentClient: {}
}

// getters
const getters = {}

// actions
const actions = {
  setCurrentClient({ commit },currentClient) {
    commit('setCurrentClient', currentClient)
  },
  setParams({ commit },params) {
    commit('setParams', params)
  }
}

// mutations
const mutations = {
  setCurrentClient(state, currentClient) {
    state.currentClient = currentClient
  },
  setParams(state, params) {
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
