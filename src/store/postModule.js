import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      posts: [],
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPageCount: 0,
      sortOptions: [
        {value: 'title', name: 'by title',},
        {value: 'body', name: 'by body',},
      ],
    };
  },  
  getters: {
    getSortedPosts(state) {
      return [...state.posts].sort((p1, p2) =>{
        return p1[state.selectedSort]?.localeCompare(p2[state.selectedSort]);
      });
    },
    searchedAndSelectedPosts(state, getters) {
      return getters.getSortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    },
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setPostsLoading(state, payload) {
      state.isPostsLoading = payload;
    },
    setSelectedSort(state, payload) {
      state.selectedSort = payload;
    },
    setSearchQuery(state, payload) {
      state.searchQuery = payload;
    },
    setPage(state, payload) {
      state.limit = payload;
    },
    setTotalPageCount(state, payload) {
      state.totalPageCount = payload;
    },
  },
  actions: {
    async fetchPosts({state, commit}) {
      commit('setPostsLoading', true);

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });

        commit('setTotalPageCount', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch (error) {
        console.error('[Axios Error]: ', error);
      } finally {
        commit('setPostsLoading', false);
      };
    },
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page += 1);

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });

        commit('setTotalPageCount', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        console.error('[Axios Error]: ', error);
      };
    },
  },
};