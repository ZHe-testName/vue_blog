<template>
  <select
    class="select"
    v-model="modelValue"
    @change="selectChanged"
  >
    <option 
      disabled
      value=""
    >Choose Option</option>

    <option
      v-for="option in options"
      :key="option.value" 
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectChanged(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
}
</script>

<style scoped>
  .select {
    height: 40px;
    cursor: pointer;
  }
</style>