<script setup lang="ts">
defineProps<{
  label: string
  id: string
  placeholder?: string
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="comment">
    <label
      class="comment__title"
      for="id"
      >{{ label }}</label
    >
    <textarea
      class="comment__textarea"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  </div>
</template>

<style scoped>
.comment__title {
  margin-bottom: 10px;
  width: 115px;
}

.comment__textarea {
  width: 100%;
  height: 70px;
  border: 1px solid gray;
  border-radius: 5px;
  padding-left: 10px;
}

.comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
