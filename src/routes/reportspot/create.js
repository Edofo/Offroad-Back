import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

const api = Router()

api.post('/', async (req, res) => {
    try {
        const acceptedFields = ['content', 'spotId', "authorId"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, spotId, authorId } = req.body
 
    
        const reportspot = await prisma.reportSpot.create({
            data: {
                content,
                spotId: spotId,
                authorId: authorId
            }
        })

        res.json({ data: { reportspot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api