<template>
  <div class="app">
    <h1>Post's Page</h1>

    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      v-custom-focus
      placeholder="Search..."
    />

    <div class="app-btns">
      <my-button
        @click="openDialog"
        style="margin-top: 20px"
      >
        Create Post
      </my-button>

      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>

    <my-dialog
      v-model:show="showDialog"
    >
      <post-form
        @createPost='addPost'
      />
    </my-dialog>

    <post-list
      v-if="!isPostsLoading"
      :posts='searchedAndSelectedPosts'
      @remove="removePost"
    />

    <div v-else>
      Post's Loading...
    </div>

    <div 
      class="observer"
      ref="observer"
      v-intersection="{loadMorePosts}"
    />
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    ...mapState({
        posts: state => state.post.post,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPageCount: state => state.post.totalPageCount,
        sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      getSortedPosts: 'post/getSortedPosts',
      searchedAndSelectedPosts: 'post/searchedAndSelectedPosts',
    }),
  },
  methods: {
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    addPost(post) {
      this.posts.unshift(post);

      this.showDialog = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    openDialog() {
      this.showDialog = true;
    },
    paginationClick(pageNumber) {
      this.page = pageNumber;
    },
  },
  mounted() {
    this.fetchPosts();
  },
}
</script>

<style>
  .app-btns {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .pagination {
    list-style-type: none;
    display: flex;
    margin: auto;
    margin-top: 15px;
    justify-content: center;
  }

  .pagination-item {
    margin-right: 5px;
    border: 1px solid black;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
  }

  .active-pagination-item {
    border: 2px solid rgb(6, 159, 6);
    box-shadow: 0px 0px 5px 1px rgb(81, 218, 81);
  }

  .observer {
    height: 30px;
    margin-top: 40px;
    background-color: transparent;
    visibility: hidden;
  }
</style>