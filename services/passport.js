
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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
    callbackURL: '/auth/google/callback',
    proxy: true
  },
   async (accessToken, refreshToken, profile, done) => {

      const existingUser = await User.findOne({ googleId: profile.id })
      if(!existingUser) {
        const newUser =  await new User({ googleId: profile.id }).save()
        return done(null,  newUser)
      } 
      done(null,  existingUser)

  }
  ))

  passport.use(new FacebookStrategy({
    clientID: keys.facebookClientId,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookId: profile.id })
    if(!existingUser) {
      const newUser =  await new User({ facebookId: profile.id }).save()
      return done(null,  newUser)
    } 
    done(null,  existingUser)

}
))