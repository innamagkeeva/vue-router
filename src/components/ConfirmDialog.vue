<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const isOpen = defineModel<boolean>({ required: true })

const emit = defineEmits<{
  ok: []
}>()

function closeDialog() {
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  // KeyboardEvent - типизировали как событие клавиатуры
  if (event.key === 'Escape') {
    closeDialog()
    // проверка: если событие клавиатуры => нажали на клавишу Esc, то вызывается функция закрытия окна
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
// Вешаем слушатель события 'keydown' (нажатие кнопки) на документ, и название функции, которая ожидает срабатывания этого события при монтировании компонента.

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
// удаляем слушатель события при размонтировании, что важно для производительности и предотвращения багов.
</script>
<template>
  <Transition name="bounce">
    <div
      class="confirm"
      v-if="isOpen"
      style="margin-top: 20px; text-align: center"
    >
      <h2 class="confirm__title">Вы точно хотите удалить заказ?</h2>
      <div class="confirm__actions">
        <button
          class="confirm__button"
          @click="closeDialog"
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
  </Transition>
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
