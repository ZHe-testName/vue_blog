<template>
  <li 
    class="post"
  >
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Name: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>

    <div class="post_btns">
      <my-button
        @click="$router.push(`/posts/${post.id}`)"
      >
        Open
      </my-button>

      <my-button
        @click="$emit('remove', post)"
      >
        Remove
      </my-button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
  .post {
    border: 3px solid rgb(18, 184, 18);
    border-radius: 5px;
    padding: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  .post_btns {
    display: flex;
    height: 40px;
    margin-top: 20px;
  }

  .post_btns > button:first-of-type {
    margin-right: 10px;
  }
</style>