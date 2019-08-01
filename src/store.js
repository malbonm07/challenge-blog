import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    posts: [],
    edit: false
  },
  getters: {

  },
  mutations: {
    async GET_POSTS(state) {
      let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
      state.posts = posts.data;
    },
    DELETE_POST: (state, i) => state.posts.splice(i, 1),
    RETURN_POST: (state, obj) => {
      state.posts.splice(obj.index, 1);
      state.posts.splice(obj.index, 0, obj.post)
    },
    NEW_POST: (state, obj) => state.posts.unshift(obj)
  },
  actions: {
    DELETE_POST: ({commit}, index) => commit('DELETE_POST', index),
    RETURN_POST: ({commit}, obj) => {
      commit('RETURN_POST', obj)
      console.log(obj)
    },
    NEW_POST: ({commit}, obj) => commit('NEW_POST', obj),
  }
})
