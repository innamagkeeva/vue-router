<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { userApi, type User } from '@/api/users'
import SidebarPage from '@/components/SidebarPage.vue'
import HeaderPage from '@/components/HeaderPage.vue'

const user = ref<User | null>(null)

async function getUser() {
  try {
    const response = await userApi.getUser()
    console.log(response.data)
    user.value = response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <HeaderPage
    v-if="user"
    :first-name="user.firstName"
    :second-name="user.secondName"
  />
  <div class="flex">
    <div class="flex__sidebar">
      <SidebarPage :login="user?.login" />
    </div>
    <div class="flex__router">
      <RouterView :user="user" />
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  height: 100%;
}

.flex__sidebar {
  position: fixed;
}

.flex__router {
  flex: 1;
  padding: 30px 10px;
  margin-left: 230px;
  margin-top: 60px;
}
</style>
