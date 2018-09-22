// initial state
const state = {
  resume: {},
  isToastShow:false,
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
  setIsToastShow(state, isToastShow) {
    state.isToastShow = isToastShow
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
