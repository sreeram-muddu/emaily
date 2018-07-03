const passport = require('passport')

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] 
      }))
      
    app.get('/auth/google/callback',passport.authenticate('google', {   successRedirect: '/surveys',
    failureRedirect: '/auth/google/failure'}), (req,res) => {
        res.redirect('/surveys')
    })

    app.get('/api/current_user', (req, res)=> { 
        //passport attaches the user object to the req 
       res.send(req.user)

    })

    app.get('/api/logout', (req,res) => {
        //we can make use of logout function on the request object attached by the passport
        req.logout()
        res.redirect('/')

    })

    app.get('/auth/facebook', passport.authenticate('facebook'))

    app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/surveys',
                                      failureRedirect: '/' }));

}
