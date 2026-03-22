<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

const model = defineModel<string>({ default: '' })
// { default: '' } = не вызовет ошибки при пустой строке

const currentLength = computed(() => model.value.length)

defineProps<{
  label: string
  id: string
  type?: string
  placeholder?: string
  maxLength?: number
}>()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
// useTemplateRef указывает что это инпут, и делает внутри: const inputRef = ref <HTMLInputElement | null>(null)

function focus() {
  inputRef.value?.focus()
}

defineExpose({
  focus,
})
// defineExpose — всегда пишется в дочернем компоненте как тут
// useTemplateRef + onMounted — всегда пишется в родителе (странице)
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
      ref="inputRef"
      class="input__order"
      :id="id"
      :type="type || 'text'"
      :placeholder="placeholder"
      :maxlength="maxLength"
      v-model="model"
    />
  </div>
</template>

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
