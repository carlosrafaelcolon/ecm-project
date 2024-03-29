const express = require('express')
const cors = require('cors')
const compression = require('compression') // compresses requests
const path = require('path')
const app = express()
const ytRoutes = require('./routes/yt.routes')
const userRoutes = require('./routes/users.routes')
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(compression())

// Routes
app.use('/api/v1/youtube', ytRoutes)
app.use("/api/v1/user", userRoutes)

/*
 |--------------------------------------
 | IF IN PRODUCTION SERVE REACT CLIENT.
 |--------------------------------------
 */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  'client', 'build', 'index.html'))
  })
}

module.exports = app;