import { Router } from 'express'
import auth from './auth/router'
import spot from './spot/router'
import secured from './secured/router'
import passport from 'passport'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ hello: "world" })
})

router.use('/auth', auth)
router.use('/spot', spot)
router.use('/users', passport.authenticate('jwt', { session: false }), secured)

export default router