<script setup lang="ts"></script>

<template>
  <button
    class="form__button"
    type="submit"
  >
    <slot>кнопка</slot>
    <!-- Компонент использует <slot> — это значит, что я могу передавать внутрь него текст кнопки -->
  </button>
</template>

<style scoped>
.form__button {
  width: 150px;
  height: 40px;
  display: block;
  font-size: 15px;
  margin-bottom: 20px;
  background-color: blueviolet;
  color: white;
  border: none;
  border-radius: 7px;
}
</style>
