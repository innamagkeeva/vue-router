<script setup lang="ts">
import { reactive } from 'vue'
import { ordersApi, type OrderStatus } from '@/api/orders'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import OrderStatusSelect from '@/components/OrderStatusSelect.vue'
import BaseTextarea from '@/components/BaseTextarea.vue'

const router = useRouter()

const orderForm = reactive({
  userName: '',
  address: '',
  date: '',
  comment: '',
  product: '',
  status: '' as OrderStatus | '',
})

// Создаем отдельный объект errors/ с теми же полями, что и в orderForm. !! тут НЕ дублируется ничего(orderForm и errors),одинаковые ключи но разный смысл,разный жизненный цикл

const errors = reactive({
  userName: '',
  address: '',
  date: '',
  comment: '',
  product: '',
  status: '',
})

// Функции валидации:

function validateUserName() {
  errors.userName = orderForm.userName.length > 2 ? '' : 'Заполните это поле'
}

function validateAddress() {
  errors.address = orderForm.address.length > 10 ? '' : 'Заполните это поле'
}

function validateDate() {
  errors.date = orderForm.date ? '' : 'Заполните это поле'
}

function validateComment() {
  errors.comment = orderForm.comment ? '' : 'Заполните это поле'
}

function validateProduct() {
  errors.product = orderForm.product ? '' : 'Заполните это поле'
}

function validateStatus() {
  errors.status = orderForm.status ? '' : 'Заполните это поле'
}

function validateForm() {
  validateUserName()
  validateAddress()
  validateDate()
  validateComment()
  validateProduct()
  validateStatus()

  return (
    !errors.userName &&
    !errors.address &&
    !errors.date &&
    !errors.comment &&
    !errors.product &&
    !errors.status
  )
}

function resetForm() {
  orderForm.address = ''
  orderForm.comment = ''
  orderForm.date = ''
  orderForm.product = ''
  orderForm.userName = ''
  orderForm.status = ''
}

async function createOrder(status: OrderStatus) {
  try {
    const response = await ordersApi.create({
      userName: orderForm.userName,
      address: orderForm.address,
      comment: orderForm.comment,
      date: new Date(orderForm.date).getTime(),
      id: Date.now().toString(),
      orderName: orderForm.product,
      status,
    })
    console.log('Заказ успешно сохранен', response.data)
    resetForm()
  } catch (error) {
    console.log(error)
  }
}

// function saveOrder() {
//   if (
//     orderForm.userName &&
//     orderForm.address &&
//     orderForm.date &&
//     orderForm.comment &&
//     orderForm.product &&
//     orderForm.status !== ''
//   ) {
//     const status: OrderStatus = orderForm.status
//     createOrder(status)
//   } else {
//     console.log('Введите все данные')
//   }
// } Эта функция рабочая была до того, как сделали чтоб после нажатия на кнопку "Сохранить" под незаполненным полем выскакивала предупреждение.

function saveOrder() {
  if (!validateForm()) {
    return
  }
  createOrder(orderForm.status as OrderStatus)
}

function goToHomePage() {
  router.push({ name: 'home' })
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
        <div class="form__block">
          <BaseInput
            id="user-name"
            label="Имя заказчика"
            v-model="orderForm.userName"
            placeholder="Введите имя"
            :max-length="15"
          />
          <p class="error">
            {{ errors.userName }}
          </p>
        </div>

        <div class="form__block">
          <BaseInput
            class="form__user-address"
            id="address"
            label="Адрес"
            v-model="orderForm.address"
            placeholder="Город, улица, дом, кв"
            :max-length="50"
          />
          <p class="error">
            {{ errors.address }}
          </p>
        </div>
      </div>

      <div class="form__row">
        <div class="form__block">
          <BaseInput
            id="date"
            type="date"
            label="Дата"
            v-model="orderForm.date"
          />
          <p class="error">
            {{ errors.date }}
          </p>
        </div>

        <div class="form__block">
          <OrderStatusSelect v-model="orderForm.status" />
          <p class="error">
            {{ errors.status }}
          </p>
        </div>
      </div>

      <div class="form__block">
        <BaseTextarea
          label="Комментарий"
          id="comment"
          placeholder="Ваш комментарий"
          v-model="orderForm.comment"
        />
        <p class="error">
          {{ errors.comment }}
        </p>
      </div>

      <div class="form__block form__block-indent">
        <BaseInput
          class="form__product"
          id="product"
          label="Название товара"
          v-model="orderForm.product"
          placeholder="Начните вводить название товара"
          :max-length="20"
        />
        <p class="error">
          {{ errors.product }}
        </p>
      </div>

      <div class="form__buttons">
        <BaseButton
          type="button"
          @click="goToHomePage"
        >
          Отменить
        </BaseButton>
        <BaseButton type="submit">Сохранить заказ</BaseButton>
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
  margin-bottom: 15px;
}

.form__row {
  display: flex;

  margin-bottom: 10px;
}

.form__user-address {
  width: 430px;
}

.input__order {
  margin-bottom: 15px;
}

.form__buttons {
  width: 350px;
  display: flex;
  justify-content: space-between;
}

.form__product {
  width: 100%;
}

.error {
  width: 120px;
  min-height: 18px;
  margin: 0 auto;
  color: red;
  font-size: 13px;
}

.form__block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.form__block-indent {
  margin-bottom: 50px;
}
</style>

<!-- для себя:  | - типовой "или". те "а" или "b" или "с" (точнее - может быть или "а" или "b" -любой) ,   || - логический OR те: а||b если а-тру - покажет а, если а - фолс - покажет b. 
  -->
