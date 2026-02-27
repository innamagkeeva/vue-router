<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  label: string
  id: string
  placeholder?: string
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
      v-model="model"
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
  min-height: 70px;
  max-height: 200px;
  resize: vertical;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
}

.comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
