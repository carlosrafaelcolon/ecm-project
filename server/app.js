const express = require('express')
const compression = require('compression') // compresses requests
const path = require('path')
const app = express()
const ytRoutes = require('./routes/yt.routes')
const userRoutes = require('./routes/users.routes')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(compression())
app.use((req, res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
  });
// Routes
app.use('/api/v1/youtube', ytRoutes)
app.use("/api/v1/user", userRoutes)

/*
 |--------------------------------------
 | IF IN PRODUCTION SERVE ANGULAR CLIENT.
 |--------------------------------------
 */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  'client', 'build', 'index.html'))
  })
}

module.exports = app;