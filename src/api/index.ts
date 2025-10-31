import axios from 'axios'
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const apiLocal = axios.create({
  baseURL: 'http://localhost:8000/',
})

apiLocal.interceptors.request.use(
  function (config) {
    // Сделайте что-нибудь перед отправкой запроса
    console.log('мы сделали запрос')

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    // теперь при каждом запросе через apiLocal в заголовках будет: authorization: localStorage.getItem('token')
    // {
    //       headers: {
    //         authorization: localStorage.getItem('token'),
    //       }
    //     }

    return config
  },
  function (error) {
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error)
  },
)

export { api, apiLocal }
