const passport = require('passport')

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] 
      }))
      
    app.get('/auth/google/callback',passport.authenticate('google'), (req,res) => {
        console.log('should be finally sending back the response to the user')
        res.send({"hey" : "callback URI"})
    })

    app.get('/api/current_user', (req, res)=> { 
        //passport attaches the user object to the req 
       res.send(req.session)

    })

    app.get('/api/logout', (req,res) => {
        //we can make use of logout function on the request object attached by the passport
        req.logout()
        res.send(req.user)

    })
}
