import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

import checkEnv from './utils/checkEnv'
import mlog from './utils/mlog'
import routes from './routes'
import './middlewares/passport'

import passport from 'passport'

async function server() {
  try {
    checkEnv()

    // Try to connect to our database
    const prisma = new PrismaClient()
    await prisma.$connect()
    mlog(`✨ Database successfully connected !`, 'SUCCESS')


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
