<template>
  <div class="navbar">
    <h3>Vue3</h3>
    <div class="btns">
      <my-button
        style="margin-right: 20px"
        @click="$router.push('/composition-posts')"
      >Composition Posts</my-button>

      <my-button
        style="margin-right: 20px"
        @click="$router.push('/store-posts')"
      >Store Posts</my-button>

      <my-button
        style="margin-right: 20px"
        @click="$router.push('/posts')"
      >Posts</my-button>

      <my-button
        @click="$router.push('/about')"
      >About</my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .navbar {
    height: 50px;
    background-color: rgb(164, 164, 164);
    display: flex;
    box-shadow: 2px 2px 4px green;
    padding: 0px 15px;
    align-items: center;
  }

  .btns {
    margin-left: auto;
  }
</style>