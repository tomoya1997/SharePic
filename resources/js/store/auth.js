// vuexの基本定義

import { OK, UNPROCESSABLE_ENTITY } from '../util'

const state = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null
}

const getters = {
  check: state => !! state.user, // ログインチェックに使用
  username: state => state.user ? state.user.name : '' // state.userがあれば名前を
}

const mutations = {
  // 第一引数は固定でstate
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  }
}

const actions = {
  // 第一引数は固定でcontext
  async register (context, data) { // asyncは非同期関数を指定
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data) // setUser ミューテーション　コミットして初めて値の永続化、クッキーへの保持ができる
  },
  async login (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)
  
    if (response.status === OK) { // okだったらクッキーに
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context) {
    const response = await axios.get('/api/user') // ログイン時以外はnull nullで統一したいから
    const user = response.data || null // response.dataがtrueならそのまま、違うならnull
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true, // trueにするとモジュール名を頭につけて呼び出し
  state,
  getters,
  mutations,
  actions
}