import axios from 'axios'
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const apiLocal = axios.create({
  baseURL: 'http://localhost:8000/',
})

export { api, apiLocal }
