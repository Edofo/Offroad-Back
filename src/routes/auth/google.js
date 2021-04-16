import { Router } from 'express'
import passport from 'passport'
import good from './good'

const api = Router()

api.get('/failed', (req, res) => res.send('You Failed to log in!'))
// api.get('/good', (req, res) => res.send('Logged In!'))

api.use('/good', good)

api.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
api.get('/callback', passport.authenticate('google', { failureRedirect: 'failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('good')
  }
);

export default api