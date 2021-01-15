import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status : '',
    token: localStorage.getItem('jwt') || '',
    user : JSON.parse(localStorage.getItem('user') || '{}' ) 
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, params){
      state.status = 'success'
      state.token = params.token
      state.user = params.user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = null
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userInfor : state => state.user
  },
  actions: {
    setUserLogin: ({commit},userObj)=>{
      commit('auth_success',userObj);
    },
    clearAuthUser :({commit})=>{
      commit('logout');
    }
  },
  modules: {
  }
})
