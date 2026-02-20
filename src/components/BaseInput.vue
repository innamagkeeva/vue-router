<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  id: string
  type?: string
  placeholder?: string
  modelValue: string
  maxLength?: number
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
// Для себя: тут не нужно const emit= потому что эмитим в шаблоне (нет функции)

const currentLength = computed(() => props.modelValue.length)
</script>

<template>
  <div class="form__user-data">
    <label
      class="form__title form__title-counter"
      :for="id"
      ><span>{{ label }}</span>
      <span v-if="maxLength">{{ currentLength }} / {{ maxLength }}</span>
    </label>

    <input
      class="input__order"
      :id="id"
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxLength"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
<!-- $emit или $event - ($) Это данные эмита или события -->

<style scoped>
.form__title {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}

.form__title-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form__user-data {
  width: 270px;
  height: 80px;
  padding: 10px;
  margin-right: 10px;
}

.input__order {
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
