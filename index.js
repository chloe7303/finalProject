import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import session from 'express-session'
import connectMongo from 'connect-mongo'

import routerUser from './routes/users.js'
import routerProject from './routes/projects.js'

dotenv.config()

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(bodyParser.json())

// 跨域設定
app.use(cors({
  origin (origin, callback) {
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.DEV === 'true') {
        callback(null, true)
      } else if (origin.includes('github')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

const MongoStore = connectMongo(session)

const sessionSettings = {
  secret: '123456',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  saveUninitialized: false,
  rolling: true,
  resave: true
}
if(process.env.DEV === 'false') {
  // 如果不是本機的開發環境，允許不同網域的認證 但要是https
  sessionSettings.cookie.sameSite = 'none'
  sessionSettings.cookie.secure = true
}
app.use(session(sessionSettings))

app.set('trust proxy', 1)

app.use('/users', routerUser)
app.use('/projects', routerProject)

// error handler
app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
})