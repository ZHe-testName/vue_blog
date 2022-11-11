<template>
  <div>
    <ul
      v-if="posts.length > 0"
    >
      <h3>Post's List</h3>
      <TransitionGroup name="list">
        <post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
        />
      </TransitionGroup>
    </ul>
    <h3
      v-else
      :style="{color: 'tomato'}"
    >Post's List Is Empty</h3>
  </div>
</template>

<script>
import Post from './Post.vue'
export default {
  components: { Post },
  props: {
    posts: {
      type: Array,
      require: true,
    },
  },
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    margin-top: 35px;
  }
  .list-move, 
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }
</style>