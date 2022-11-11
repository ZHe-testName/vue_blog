<template>
  <navbar></navbar>
  
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  components: {
    Navbar,
  },
}
</script>

<style>  
  * {
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
    }

    .app {
      padding: 20px;
    }
</style>
