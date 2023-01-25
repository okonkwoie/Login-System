const express = require('express')
const bodyParser = require('body-parser')
const mongodbConnect = require('./db/mongodb')
const passport = require('passport')
const authRouter = require('./routes/auth')
const config = require('./config/config')
const blogRouter = require('./routes/blogs')
require('dotenv').config()
require('./authentication/auth') //for signup and login middleware

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', authRouter)
app.use('/blogs', passport.authenticate('jwt', { session: false }), blogRouter)

// error handler middleware
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500).send({
      error: 'An unexpected error occurred'
  })
  next()
})


// mongodb connection
mongodbConnect()

app.get('/', (req, res) => {
    res.send('welcome');
  });




app.listen(config.PORT, () => {
    console.log(`server is listening on port: ${config.PORT}...`);
})