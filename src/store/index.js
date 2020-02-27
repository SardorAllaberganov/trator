import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    userData: '',
    role: '',
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success'
      state.token = token
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    user_data(state, userData){
      state.userData = userData
    },
    user_role(state, role){
      state.role = role
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'https://trator.me/api/login', data: user, method: 'POST', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } })
        .then(resp => {
          const token = resp.data.data.token
          const role = resp.data.data.role
          const userId = resp.data.data.id  
          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] =  token
          commit('auth_success', token)
          commit('user_role', role)
          // console.log(role)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
  },
  async getUserDetail({commit}){
    await axios.get('https://trator.me/api/users/' + localStorage.getItem("userId"), {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp =>{
      const userData = resp.data.data
      commit('user_data', userData)
    }).catch(err => {
      console.log('2222',err)
    })
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
      reject()
    })
  }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})