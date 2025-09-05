<script setup lang="ts">
import Sidebar from '@/components/SidebarPage.vue'
</script>

<template>
  <div class="main">
    <div class="panel">
      <Sidebar />
    </div>

    <div class="create-order">
      <h1 class="create-order__title">Создать заказ</h1>
      <form class="form">
        <div class="form__row">
          <div class="form__user-data">
            <p class="form__title">Имя заказчика</p>
            <input
              class="input__name"
              type="text"
              name="name"
              placeholder="Например: Иван Петров"
            />
          </div>

          <div class="form__user-data form__user-address">
            <p class="form__title">Адрес</p>
            <input
              class="input__name"
              type="text"
              name="name"
              placeholder="Город, улица, дом, кв"
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
            />
          </div>

          <div class="form__user-data">
            <p class="form__title">Статус</p>
            <input
              class="input__name"
              type="text"
              name="status"
              placeholder="Новый"
            />
          </div>
        </div>

        <p class="form__title">Комментарий</p>
        <textarea
          class="form__comment"
          name="comment"
          placeholder="Комментарий"
        ></textarea>

        <p class="form__title">Название товара</p>
        <input
          class="input__name input__name-product"
          type="text"
          name="product"
          placeholder="Начните вводить название"
        />
        <div class="form__button">
          <button class="form__btn form__button-save">сохранить заказ</button>
          <button class="form__btn form__button-cancel">отменить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
}

.create-order {
  width: 100%;
  padding: 30px 10px;
}

.create-order__title {
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
}

.input__name-product {
  margin-bottom: 40px;
}
</style>
