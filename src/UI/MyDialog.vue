<template>
  <div 
    class="dialog"
    v-if="show"
    @click.stop="closeDialog"
  >
    <div 
      class="content"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin.js';

export default {
  name: 'my-dialog',
  mixins: [toggleMixin],
}
</script>

<style scoped>
  .dialog {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    background-color: rgba(0, 0, 0, 0.558);
  }

  .content {
    margin: auto;
    min-width: 330px;
    min-height: 120px;
    border-radius: 12px;
    background-color: aliceblue;
    padding: 20px;
  }
</style>