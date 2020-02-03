const state = {
  code: null
}

const mutations = {
    // ステータスを引数に
  setCode (state, code) {
    state.code = code
  }
}

export default {
  namespaced: true,
  state,
  mutations
}