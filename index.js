const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User')
require('./services/passport')

const p = mongoose.connect(keys.mongoURI, () => console.log('connected to mongodb'))

const app = express()

//   middleware => small functions that modify the request bofore its send to the route handler 
// Good use case for logging, authenicating user before processing their requests etc
//These middlewares are called for all the requests

// extracts the cookie data from the request
app.use(
    cookieSession({
       maxAge: 30 * 24 * 60 * 60 * 1000,
       keys: [keys.cookieKey]
    })
)

//gets the user id from cookie data
app.use(passport.initialize())

// extracts user object and appends to the req object
app.use(passport.session())

require('./routes/authRoutes')(app)




const PORT = process.env.PORT || 5000
console.log('listening to the server at the port ',PORT)
app.listen(PORT)