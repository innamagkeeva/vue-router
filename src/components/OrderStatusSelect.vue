<script setup lang="ts">
import { orderStatuses, type OrderStatus } from '@/api/orders'
defineProps<{
  modelValue: OrderStatus | ''
}>()

defineEmits<{
  'update:modelValue': [value: OrderStatus | '']
}>()
</script>

<template>
  <div class="select">
    <div class="select__status">
      Выбран статус:
      <strong>{{ orderStatuses.find((s) => s.value === modelValue)?.label || 'Не выбран' }}</strong>
    </div>

    <select
      class="select__model"
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value as OrderStatus)
      "
    >
      <option
        disabled
        value=""
      >
        Выберите один из вариантов
      </option>

      <option
        v-for="status in orderStatuses"
        :key="status.value"
        :value="status.value"
      >
        {{ status.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select {
  padding: 10px;
}

.select__status {
  margin-bottom: 10px;
}

.select__model {
  width: 220px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 7px;
}
</style>
