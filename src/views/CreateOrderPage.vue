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

// Функция валидации через "руками"

// function validateForm() {
//   errors.userName = orderForm.userName ? '' : 'Заполните это поле'
//   errors.address = orderForm.address ? '' : 'Заполните это поле'
//   errors.date = orderForm.date ? '' : 'Заполните это поле'
//   errors.comment = orderForm.comment ? '' : 'Заполните это поле'
//   errors.product = orderForm.product ? '' : 'Заполните это поле'
//   errors.status = orderForm.status ? '' : 'Заполните это поле'

//   return (
//     !errors.userName &&
//     !errors.address &&
//     !errors.date &&
//     !errors.comment &&
//     !errors.product &&
//     !errors.status
//   )
// }Оставила для наглядности.закомментировала.

// Функция валидации через перебор. Не руками по каждому полю,как закомментированный пример выше, а один цикл.
function validateForm() {
  let isValid = true

  for (const key of Object.keys(errors) as Array<keyof typeof orderForm>) {
    // тут говорится:«key — это НЕ любая строка,а один из ключей формы»
    if (!orderForm[key]) {
      errors[key] = 'Заполните это поле'
      isValid = false
    }
  }
  return isValid
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
      address: orderForm.address,
      comment: orderForm.comment,
      date: new Date(orderForm.date).getTime(),
      id: Date.now().toString(),
      orderName: orderForm.product,
      status,
      userName: orderForm.userName,
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
          />
          <p
            v-if="errors.userName"
            class="error"
          >
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
          />
          <p
            v-if="errors.address"
            class="error"
          >
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
          <p
            v-if="errors.date"
            class="error"
          >
            {{ errors.date }}
          </p>
        </div>

        <div class="form__block">
          <OrderStatusSelect v-model="orderForm.status" />
          <p
            v-if="errors.status"
            class="error"
          >
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
        <p
          v-if="errors.comment"
          class="error"
        >
          {{ errors.comment }}
        </p>
      </div>

      <div class="form__block">
        <BaseInput
          class="form__product"
          id="product"
          label="Название товара"
          v-model="orderForm.product"
          placeholder="Начните вводить название товара"
        />
        <p
          v-if="errors.product"
          class="error"
        >
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
  margin-bottom: 20px;
}

.form__row {
  display: flex;
  margin-bottom: 20px;
}

.form__user-address {
  width: 430px;
}

.input__order {
  margin-bottom: 20px;
}

.form__buttons {
  width: 350px;
  display: flex;
  justify-content: space-between;
}

.form__product {
  width: 100%;
  margin-bottom: 20px;
}

.error {
  max-width: 120px;
  margin: 0 auto;
  color: red;
  font-size: 13px;
  margin-bottom: 20px;
}

.form__block {
  display: flex;
  flex-direction: column;
}
</style>

<!-- для себя:  | - типовой "или". те "а" или "b" или "с" (точнее - может быть или "а" или "b" -любой) ,   || - логический OR те: а||b если а-тру - покажет а, если а - фолс - покажет b. 
  -->
