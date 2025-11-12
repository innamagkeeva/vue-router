<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { userApi } from '@/api/users'

const isOpen = ref(false)

function openConfirmDialog() {
  isOpen.value = true
}

const isMoved = ref(false)

function toggleMove() {
  isMoved.value = !isMoved.value
}

async function getUser() {
  try {
    const response = await userApi.getUser()
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="pageHome">
    <h1 class="pageHome__title">Главная страница</h1>
    <button
      class="btn__open"
      @click="openConfirmDialog"
    >
      Открыть окно
    </button>
    <button @click="toggleMove">Двигать</button>
    <div
      class="circle"
      :class="{ 'circle--moved': isMoved }"
    ></div>

    <ConfirmDialog v-model="isOpen" />
  </div>
</template>

<style scoped>
.pageHome {
  flex: 1;
  padding-top: 40px;
}

.pageHome__title {
  width: 300px;
  margin: 0 auto;
}

.btn__open {
  padding: 15px 30px;
}

.circle {
  width: 100px;
  height: 100px;
  background-color: teal;
  border-radius: 50%;
  transition: translate 1s ease;
}

.circle--moved {
  translate: 300px;
}
</style>
