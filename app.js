const express = require('express')
const app = express()
const todoRoutes = require('./api/routes/todo.routes')
const mongodb = require('./db/mongodb.connect')

require('dotenv').config()

mongodb.connect()

app.use(express.json())

app.use('/todos', todoRoutes)

app.use((error, req, res, next) => {
    res.status(500).json({message: error.message})
})

app.get('/', (req, res) => {
    res.json('hello world')
})

module.exports = app