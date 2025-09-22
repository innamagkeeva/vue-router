<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Dogs {
  message: string[]
  status: string
}

const dogs = ref<Dogs | null>(null)
async function getDogs() {
  const url = 'https://dog.ceo/api/breed/hound/images'
  const response = await fetch(url)

  if (response.ok) {
    const json = await response.json()
    dogs.value = json
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0, // установим скроллл  на величину 0px
    behavior: 'smooth', // используем плавный скролл
  })
}

const showButton = ref(false)

// Следим за скроллом и показываем кнопку, если нужно
function handleScroll() {
  showButton.value = window.scrollY > 450
}

onMounted(() => {
  getDogs()
  window.addEventListener('scroll', handleScroll)
  // Добавляет обработчика scroll
})

// ❗ Проблема без onUnmounted
// Если ты не уберёшь слушателя, когда компонент больше не нужен, то:обработчик всё ещё будет "висеть" в памяти,может происходить утечка памяти (memory leak),может вызываться handleScroll даже когда компонента нет.

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
// удаляет обработчик события scroll из окна браузера, когда компонент уничтожается (то есть удаляется со страницы).
</script>

<template>
  <h1 class="title">Собачки</h1>
  <ul
    v-if="dogs"
    class="dogs__list"
  >
    <li
      v-for="(url, index) in dogs.message"
      :key="index"
      class="dogs__item"
    >
      <img
        :src="url"
        alt="dog"
        class="dogs__image"
      />
    </li>
  </ul>
  <p
    class="dogs__loading"
    v-else
  >
    Загрузка...
  </p>

  <button
    class="scroll-to-top"
    @click="scrollToTop"
    v-show="showButton"
  >
    &#8593; Наверх
  </button>
  <!-- &#8593; это юникод стрелки вверх -->
</template>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.dogs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 45px;
}

.dogs__image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  /* "Заполни весь контейнер изображением, сохранив его пропорции, обрезая лишнее, если нужно."  */
  border-radius: 10px;
  border: 1px solid sienna;
}

.dogs__loading {
  text-align: center;
}

.scroll-to-top {
  width: 85px;
  height: 30px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  background-color: gray;
  color: white;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: blue;
  /* при наведении меняет цвет фона */
}
</style>
