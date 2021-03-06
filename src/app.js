require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')
const foldersRouter = require('../folders/folders-router')
const notesRouter = require('../notes/notes-router')
const app = express()

app.use(
  cors({
    origin:
      "https://noteful.jonretchless.vercel.app"
      // "http://localhost:3000"
  }))


const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use('/notes', notesRouter)
app.use('/folders', foldersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app