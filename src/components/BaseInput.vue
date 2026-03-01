<script setup lang="ts">
import { computed, onMounted, ref, useAttrs } from 'vue'

const attrs = useAttrs()

const inputElement = ref<HTMLInputElement | null>(null)

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

onMounted(() => {
  if (attrs.autofocus !== undefined) {
    inputElement.value?.focus()
  }
})
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
      ref="inputElement"
      v-bind="$attrs"
      class="input__order"
      :id="id"
      :type="type || 'text'"
      :placeholder="placeholder"
      :maxlength="maxLength"
      v-model="model"
    />
    <!-- Все неизвестные атрибуты компонента попадают в $attrs.Но по умолчанию они навешиваются на корневой элемент (div).Нам нужно перенаправить их на <input>. v-bind="$attrs" делает именно это. -->
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
