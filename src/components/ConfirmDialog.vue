<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  cancel: []
  ok: []
}>()
</script>
<template>
  <div
    class="confirm"
    v-if="isOpen"
  >
    <h2 class="confirm__title">Вы точно хотите удалить заказ?</h2>
    <div class="confirm__actions">
      <button
        class="confirm__button"
        @click="emit('cancel')"
      >
        cancel
      </button>
      <button
        class="confirm__button"
        @click="emit('ok')"
      >
        ok
      </button>
    </div>
  </div>
</template>

<style scoped>
.confirm {
  position: fixed;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  background-color: gray;
  padding: 50px 20px;
  color: white;
}

.confirm__title {
  margin-bottom: 28px;
}

.confirm__actions {
  display: flex;
  justify-content: space-between;
}

.confirm__button {
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 16px;
  transition:
    background-color 0,
    3s ease,
    color 0,
    3s ease;
}

.confirm__button:hover {
  background-color: white;
  color: black;
}
</style>
