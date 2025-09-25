<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Status = 'В обработке' | 'Доставлен' | 'Отменен'

const userName = ref<string>('')
const address = ref<string>('')
const data = ref<string>('')
const status = ref<Status>('В обработке')
const comment = ref<string>('')
const product = ref<string>('')

function saveOrder() {
  if (userName.value && address.value && data.value && comment.value && product.value) {
    router.push({ name: 'listOrders' })
  } else {
    console.log('Введите все данные')
  }
}
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Создать заказ</h1>
    <form
      class="form"
      @submit.prevent="saveOrder"
    >
      <div class="form__row">
        <div class="form__user-data">
          <p class="form__title">Имя заказчика</p>
          <input
            class="input__name"
            type="text"
            name="name"
            placeholder="Например: Иван Петров"
            v-model="userName"
          />
        </div>

        <div class="form__user-data form__user-address">
          <p class="form__title">Адрес</p>
          <input
            class="input__name"
            type="text"
            name="name"
            placeholder="Город, улица, дом, кв"
            v-model="address"
          />
        </div>
      </div>

      <div class="form__row">
        <div class="form__user-data">
          <p class="form__title">Дата</p>
          <input
            class="input__name"
            type="data"
            placeholder="введите дату"
            v-model="data"
          />
        </div>

        <div class="form__user-data">
          <p class="form__title">Статус</p>
          <input
            class="input__name"
            type="text"
            name="status"
            placeholder="Новый"
            v-model="status"
          />
        </div>
      </div>

      <p class="form__title">Комментарий</p>
      <textarea
        class="form__comment"
        name="comment"
        placeholder="Комментарий"
        v-model="comment"
      ></textarea>

      <p class="form__title">Название товара</p>
      <input
        class="input__name input__name-product"
        type="text"
        name="product"
        placeholder="Начните вводить название"
        v-model="product"
      />
      <div class="form__button">
        <button
          type="submit"
          class="form__btn form__button-save"
        >
          сохранить заказ
        </button>
        <RouterLink
          class="form__btn form__button-cancel"
          :to="{ name: 'home' }"
          >Отменить</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  width: 700px;
  margin: 0 auto;
}

.title {
  width: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.form__row {
  display: flex;
  margin-bottom: 20px;
}

.form__title {
  margin-bottom: 10px;
  width: 115px;
}

.form__user-data {
  width: 270px;
  height: 80px;
  padding: 10px;
  margin-right: 10px;
}

.form__user-address {
  width: 430px;
}

.input__name {
  width: 100%;
  margin-bottom: 20px;
}

.form__comment {
  width: 500px;
  margin-bottom: 20px;
}

.form__button {
  width: 350px;
  height: 40px;

  display: flex;
}

.form__btn {
  width: 120px;
  height: 40px;
  border-radius: 10px;
}

.form__button-save {
  background-color: blue;
  color: white;
  margin-right: 10px;
}

.form__button-cancel {
  border: 1px solid black;
  text-align: center;
  line-height: 40px;
}

.input__name-product {
  margin-bottom: 40px;
}
</style>
