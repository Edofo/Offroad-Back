import { Router } from 'express'
import auth from './auth'
import spotRouter from './spot/router'
import secured from './secured'
import passport from 'passport'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ hello: "world" })
})

router.use('/auth', auth)
router.use('/spot', spotRouter)
router.use('/', passport.authenticate('jwt', { session: false }), secured)

export default router