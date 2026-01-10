<script setup lang="ts">
defineProps<{
  label: string
  id: string
  type?: string
  placeholder?: string
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
// Для себя: тут не нужно const emit= потому что эмитим в шаблоне (нет функции)
</script>

<template>
  <div class="form__user-data">
    <label
      class="form__title"
      :for="id"
      >{{ label }}</label
    >
    <input
      class="input__order"
      :id="id"
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.form__title {
  display: block;
  margin-bottom: 10px;
  width: 115px;
}

.form__user-data {
  width: 270px;
  height: 80px;
  padding: 10px;
  margin-right: 10px;
}

.input__order {
  width: 100%;
}
</style>
