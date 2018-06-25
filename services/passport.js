
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const keys = require('../config/keys')

const User = require('../models/User')

passport.serializeUser((user, done)=> {
    done(null, user.id )
})

passport.deserializeUser( (id, done)=> {
   User.findById(id).then ( user => {
       done(null, user)
   }
   )
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
   (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id }).then( existingUser => {
        if(!existingUser) {
            new User({
                googleId: profile.id
               }).save().then(newUser=> done(null,newUser),err => console.log(err) )
        }
        else {
            done(null,existingUser)
        }
    }

    )
       
       
   }
  ))