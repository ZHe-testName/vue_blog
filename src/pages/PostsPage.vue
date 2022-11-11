<template>
  <div class="app">
    <h1>Post's Page</h1>

    <my-input
      v-model="searchQuery"
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
        v-model="selectedSort"
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

    <!-- <ul class="pagination">
      <li 
        v-for="pageNumber in totalPageCount"
        :key="pageNumber"
        class="pagination-item"
        :class="{
          'active-pagination-item': page === pageNumber,  
        }"
        @click="paginationClick(pageNumber)"
      >
      {{ pageNumber }}
      </li>
    </ul> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import axios from 'axios';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      showDialog: false,
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
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1, p2) =>{
        return p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]);
      });
    },
    searchedAndSelectedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
    // selectedSort(newValue) {
    //   this.posts.sort((p1, p2) =>{
    //     return p1[newValue]?.localeCompare(p2[newValue]);
    //   });
    // },
  },
  methods: {
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
    async fetchPosts() {
      this.isPostsLoading = true;

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });

        this.totalPageCount = Math.ceil(response.headers['x-total-count'] / this.limit);

        this.posts = response.data;
      } catch (error) {
        console.error('[Axios Error]: ', error);
      } finally {
        this.isPostsLoading = false;
      };
    },
    async loadMorePosts() {
      try {
        this.page += 1;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });

        this.totalPageCount = Math.ceil(response.headers['x-total-count'] / this.limit);

        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        console.error('[Axios Error]: ', error);
      };
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