require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes')
const path = require('path')

const PORT = 3001
const app = express()

app.use(express.static(path.resolve('..', 'frontend', 'build')))

app.use(cookieParser())
app.use(express.json())

app.use('/api', routes)
app.use(bodyParser.urlencoded({ extended: true }))

// Catch-all handler: возвращает index.html для всех GET запросов, которые не являются API запросами
app.get('/*path', (req, res) => {
  res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'))
})

mongoose.connect(process.env.DB_CONN_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
