import { Router } from 'express'
import passport from 'passport'

const api = Router()

api.get('/failed', (req, res) => res.send('You Failed to log in!'))

api.get('/good', (req, res) => {
    console.log(res)
    res.send(`Welcome ${req}!`)
})

api.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
api.get('/callback', passport.authenticate('google', { failureRedirect: 'failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req)
    res.redirect('good');
  }
);

export default api