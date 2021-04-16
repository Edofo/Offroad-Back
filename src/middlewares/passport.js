import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JsonWebTokenStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { PrismaClient } from '@prisma/client'
import { checkPassword } from '../utils/password'
import dotenv from 'dotenv'

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/**
 * Strategy with credential email/password
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, next) => {
  try {
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return next('E-mail not found', null)
    }

    if (!checkPassword(password, user.encryptedPassword)) {
      return next('Incorrect Password', null)
    }


    next(null, user)
  } catch (err) {
    next(err.message, null)
  }
}))


/**
 * Strategy with json web token
 */
dotenv.config()

passport.use(new JsonWebTokenStrategy({
  secretOrKey: process.env.JWT_ENCRYPTION,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (jwtPayload, next) => {
  try {
    const { email } = jwtPayload

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return next('Token is invalid', null)
    }

    next(null, user)
  } catch (err) {
    next(err.message, null)
  }
}))

/**
 * Strategy with google
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, next) => {
    try {
      const prisma = new PrismaClient()

      const user = await prisma.user.findUnique({ 
        where: { 
          email: profile.emails[0].value,
        } 
      })

      if (!user) {

        const createUser = await prisma.user.create({
          data: {
            pseudo: profile.name.givenName,
            email: profile.emails[0].value,
            encryptedPassword: '',
            level: 'DEBUTANT',
            notif: false,
            sang: '',
            allergie: '',
            medicament: '',
            taille: '',
            poids: '',
            tel: '07 00 00 01 11',
            other: '',
            googleId: profile.id
          }
        })

        next(null, profile, accessToken);

      } else {

        next(null, user, profile, accessToken);

      }

    } catch (err) {
      next(err.message, null)
    }
  }
));