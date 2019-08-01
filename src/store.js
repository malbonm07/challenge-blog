import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { stat } from 'fs';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    posts: [],
    edit: false,
    modal: {
      show: false,
      msg: ''
    }
  },
  getters: {

  },
  mutations: {
    async GET_POSTS(state) {
      let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
      for(let x=0; x<20; x++) {
        state.posts.push(posts.data[x]);
      }
    },
    DELETE_POST: (state, i) => state.posts.splice(i, 1),
    RETURN_POST: (state, obj) => {
      state.posts.splice(obj.index, 1);
      state.posts.splice(obj.index, 0, obj.post)
    },
    NEW_POST: (state, obj) => state.posts.push(obj),
    MODAL: (state, modalObject) => state.modal = modalObject
  },
  actions: {
    DELETE_POST: ({commit}, index) => commit('DELETE_POST', index),
    RETURN_POST: ({commit}, obj) => {
      commit('RETURN_POST', obj)
      console.log(obj)
    },
    NEW_POST: ({commit}, obj) => commit('NEW_POST', obj),
    MODAL: ({commit}, modalObject) => commit('MODAL', modalObject),
  }
})
