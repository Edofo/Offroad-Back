import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

const api = Router()

api.get('/:id', async (req, res) => {
  try {

    const acceptedFields = ['id']

    const missingValues = acceptedFields.filter(field => !req.params.id)
    if (!isEmpty(missingValues)) {
      return res.status(400).json({
        error: `Values ${missingValues.join(', ')} are missing`
      })
    }

    const id  = req.params.id

    const spot = await prisma.spot.findMany({
      where: {
        id
      }
    })

    res.json({ data: { spot } })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default api