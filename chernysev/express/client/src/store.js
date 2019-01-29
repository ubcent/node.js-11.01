import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8888',
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  getters: {
    getPosts: state => state.posts,
  },
  mutations: {
    // eslint-disable-next-line
    setPosts: (state, posts) => state.posts = posts,
  },
  actions: {
    getPosts: async ({ commit }) => {
      const postsResponse = await axios.get('/posts');
      const { data } = postsResponse;
      commit('setPosts', data);
    },
    sendPost: async ({ dispatch }, post) => {
      await axios.post('/posts', post);
      dispatch('getPosts');
    },
    deletePost: async ({ dispatch }, postId) => {
      await axios.delete(`/posts/${postId}`);
      dispatch('getPosts');
    },
  },
});
