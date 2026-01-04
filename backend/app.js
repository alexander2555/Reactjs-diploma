require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes')
const path = require('path')

const PORT = 3001
const app = express()

app.use(express.static(path.resolve('..', 'frontend', 'dist')))

app.use(cookieParser({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))

app.use('/api', routes)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Catch-all handler: возвращает index.html для всех GET запросов, которые не являются API запросами
app.get('/*path', (req, res) => {
  res.sendFile(path.resolve('..', 'frontend', 'dist', 'index.html'))
})

mongoose.connect(process.env.DB_CONN_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
