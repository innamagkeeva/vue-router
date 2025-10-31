import fs from 'fs'
import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'
const { createHmac, randomUUID } = await import('node:crypto')

const SECRET = 'abcdefg'
const PORT = 8000
const MIN_DELAY = 50
const MAX_DELAY = 700
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

function hashPassword(password) {
  return createHmac('sha256', SECRET).update(password).digest('hex')
}

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, randomInteger(MIN_DELAY, MAX_DELAY))
  })
  next()
})

server.post('/orders', (req, res, next) => {
  req.body.id = randomUUID()
  req.body.status = 'Новый'
  req.body.date = Date.now()
  next()
})

server.post('/register', (req, res) => {
  try {
    const { login, password, firstName, secondName } = req.body
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json'), 'UTF-8'))

    const userFromBD = users.find((username) => username.login === login)

    if (userFromBD) {
      return res.status(409).json({ data: 'такой логин занят' })
    }

    const newUser = {
      login,
      firstName,
      secondName,
      hash: hashPassword(password),
      token: Date.now(),
      role: 'USER',
    }

    users.push(newUser)
    try {
      fs.writeFileSync(path.resolve(__dirname, 'users.json'), JSON.stringify(users, null, 2))
      delete newUser.hash
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(500).json({ data: 'ошибка создания пользователя на сервере', error })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({ data: e.message })
  }
})

server.post('/auth', (req, res) => {
  try {
    const { login, password } = req.body
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json'), 'UTF-8'))
    const hash = hashPassword(password)

    const userFromBD = users.find((username) => username.login === login && username.hash === hash)

    if (userFromBD) {
      delete userFromBD.hash
      return res.json(userFromBD)
    }

    return res.status(403).json({ data: 'не верный логин или пароль' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ data: e.message })
  }
})

server.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[0]
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json'), 'UTF-8'))
    const userFromBD = users.find((user) => user.token === Number(token))

    if (userFromBD) {
      delete userFromBD.hash
      return res.status(200).json(userFromBD)
    }

    return res.status(403).json({ data: 'не верный токен' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ data: e.message })
  }
})

server.use((req, res, next) => {
  if (req.path === '/public/path') {
    return next()
  }

  if (req.path === '/') {
    return res.status(200).json({ data: 'Всё работает!' })
  }

  // чтобы включить проверку на авторизацию раскомментируй строчки между ***
  
  const token = req.headers.authorization?.split(' ')[0]
  if (!token) {
    return res.status(403).json({ data: 'Вы не авторизованны' })
  }

  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json'), 'UTF-8'))
  const userFromBD = users.find((user) => user.token === Number(token))
  if (!userFromBD) {
    return res.status(403).json({ data: 'Вы не авторизованны' })
  }
  

  next()
})

server.use(router)

server.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту!`)
})
