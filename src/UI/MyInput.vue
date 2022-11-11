<template>
  <input 
    :type="type" 
    class="input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateInput"
  >
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String,
      required: false,
      default: () => 'text',
    },
    placeholder: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  data() {
    return {

    };
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
}
</script>

<style scoped>
  .input {
    width: 100%;
    border: 1px solid rgb(5, 128, 5);
    padding: 10px;
    margin-top: 15px;
  }
</style>