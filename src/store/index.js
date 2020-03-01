import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    // userData: '',
    // role: '',
    userName: '' || localStorage.getItem('name'),
    data: '',
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
      state.data = userData
    },
    // user_role(state, role, userName){
    //   state.role = role
    //   state.userName = userName
    // }
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
          const data ={
            token : resp.data.data.token,
            role : resp.data.data.role,
            userId : resp.data.data.id,
            userName : resp.data.data.name  
          }
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.userName);
          // console.log(data)
          axios.defaults.headers.common['Authorization'] =  data.token
          commit('user_data', data)
          // localStorage.setItem('userName', userName);
          // localStorage.setItem('userId', userId);
          // localStorage.setItem('token', token)
          commit('auth_success', data.token)
          // commit('user_role', role)
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
  async getUserProducts({commit}){
    await axios.get('https://trator.me/api/products', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp =>{
      const userProducts = resp.data.data
      console.log(userProducts);
      commit('user_data', userProducts)
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
    username: state => state.userName
  }
})