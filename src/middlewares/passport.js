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
  function(request, accessToken, refreshToken, profile, done) {
    try {
      console.log('ID: '+profile.id);
      console.log('Name: '+profile.displayName);
      console.log('Email : '+profile.emails[0].value);
      /* use the profile info (mainly profile id) to check if the user is registerd in ur db
      *  If yes select the user and pass him to the done callback
      *  If not create the user and then select him and pass to callback
      */
      return done(null, profile);

    } catch (err) {
      return(err.message, null)
    }
  }
));