<template>
  <button
    class="my_btn"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
}
</script>

<style scoped>
  .my_btn {
    padding: 10px 15px;
    border: 1px solid rgb(5, 128, 5);
    outline: none;
    background-color: transparent;
    font-size: 17px;
    cursor: pointer;
    color: rgb(5, 128, 5);
  }
</style>