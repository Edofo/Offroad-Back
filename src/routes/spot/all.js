import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

const api = Router()

api.get('/', async (req, res) => {
  try {

    const acceptedFields = ['level']

    const missingValues = acceptedFields.filter(field => !req.body[field])
    if (!isEmpty(missingValues)) {
      return res.status(400).json({
        error: `Values ${missingValues.join(', ')} are missing`
      })
    }

    const { level } = req.body


    const spot = await prisma.spot.findMany({
      where: {
        level
      }
    })

    res.json({ data: { spot } })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default api