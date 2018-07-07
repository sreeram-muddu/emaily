const mongoose = require('mongoose')
const { Schema } = mongoose

//defines the kind of data that we are planning to store
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0}
})

//creation of the collection if it doesn't exist
const User = mongoose.model('users',userSchema)

module.exports = User