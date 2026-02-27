<script setup lang="ts">
import { orderStatuses } from '@/api/orders'
import { computed } from 'vue'

const model = defineModel<string>()

const selectedStatusLabel = computed(() => {
  const found = orderStatuses.find((status) => status.value === model.value)
  return found?.value || 'не выбран'
})
</script>

<template>
  <div class="select">
    <div class="select__status">
      Выбран статус:
      <strong>{{ selectedStatusLabel }}</strong>
    </div>

    <select
      class="select__model"
      v-model="model"
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
