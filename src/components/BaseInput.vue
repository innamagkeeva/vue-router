<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string>({ default: '' })
// { default: '' } = не вызовет ошибки при пустой строке

defineProps<{
  label: string
  id: string
  type?: string
  placeholder?: string
  maxLength?: number
}>()

const currentLength = computed(() => model.value.length)
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
      :maxlength="maxLength"
      v-model="model"
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
