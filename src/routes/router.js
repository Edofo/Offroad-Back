import { Router } from 'express'
import auth from './auth/router'
import google from './auth/google'
import spot from './spot/router'
import post from './post/router'
import like from './like/router'
import historique from './historique/router'
import reportpost from './reportpost/router'
import reportspot from './reportspot/router'
import secured from './secured/router'
import passport from 'passport'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ hello: "world" })
})

router.use('/auth', auth)
router.use('/google', google)

router.use('/spot', spot)

router.use('/post', post)
router.use('/like', like)
router.use('/historique', historique)

router.use('/reportpost', reportpost)
router.use('/reportspot', reportspot)

router.use('/users', passport.authenticate('jwt', { session: false }), secured)

export default router