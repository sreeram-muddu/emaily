const mongoose = require('mongoose')
const { Schema } = mongoose

//defines the kind of data that we are planning to store
const userSchema = new Schema({
    googleId: String
})

//creation of the collection if it doesn't exist
const User = mongoose.model('users',userSchema)

module.exports = User