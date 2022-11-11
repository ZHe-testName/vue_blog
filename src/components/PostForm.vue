<template>
  <form @submit.prevent="createPost">
      <h4>Crete Post</h4>

      <my-input 
        :placeholder="'Name'"
        v-model="post.title"
        v-custom-focus
      />
      <my-input 
        :placeholder="'Description'"
        v-model="post.body"
      />
      
      <my-button class="btn">Add Post</my-button>
    </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.$emit('createPost', {
        ...this.post,
        id: Date.now(),
      });

      Object.keys(this.post)
        .forEach(key => this.post[key] = '');
    },
  },
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }

  .btn {
    align-self: flex-end;
    margin-top: 10px;
  }
</style>