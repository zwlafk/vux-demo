// initial state
const state = {
  resume: {}
}

// getters
const getters = {}

// actions
const actions = {
  getResume({ commit }) {
    commit('setResume', resume)
  }
}

// mutations
const mutations = {
  setResume(state, resume) {
    state.resume = resume
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
