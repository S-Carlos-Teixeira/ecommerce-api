import bodyParser from 'body-parser'
import express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import mongoose from 'mongoose'
import { MONGODB_URI } from './config/environments'
import router from './views/router'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(mongoSanitize())

app.use(express.json())
app.use('/api', router)
// app.use(errorHandler)

async function start() {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to the database!')
    })
    .catch(err => {
      console.log(err)
    })
  return app.listen(8000, () => {
    console.log('Express API is running on http://localhost:8000')
  })
}

export const serverStartPromise = start()

export default app
