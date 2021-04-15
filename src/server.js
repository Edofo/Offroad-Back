import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import checkEnv from './utils/checkEnv'
import mlog from './utils/mlog'
import routes from './routes/router'
import './middlewares/passport'

import prisma from './db'

import passport from 'passport'

async function server() {
  try {
    checkEnv()

    await prisma.$connect()
    mlog(`✨ Database successfully connected !`, 'SUCCESS')


    Sentry.init({
      dsn: process.env.SENTRY_DNS,
    
      tracesSampleRate: 1.0,
    });
    
    const transaction = Sentry.startTransaction({
      op: "test",
      name: "My First Test Transaction",
    });
    
    setTimeout(() => {
      try {
        foo();
      } catch (e) {
        Sentry.captureException(e);
      } finally {
        transaction.finish();
      }
    }, 99);

    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())

    app.get('/', (_req, res) => {
      res.send("Please take a look at our <a href='/api'>API</a>")
    })

    app.use('/api', routes)

    dotenv.config()
    const port = parseInt(process.env.PORT || 3000, 10)

    app.listen(port, () => {
      mlog(`✨ Server is listening on port ${port} !`)
    })
  } catch (err) {
    mlog(err.message, 'ERROR')
  }
}

server()
