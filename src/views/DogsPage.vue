<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Dogs {
  message: string[]
  status: string
}

// ???? если не делаем проверку на status - можно эту строчку вообще не  писать?

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

onMounted(() => {
  getDogs()
})
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
</style>
