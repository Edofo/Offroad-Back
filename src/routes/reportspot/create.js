import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
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

        const prisma = new PrismaClient()    
    
        const report = await prisma.report.create({
            data: {
                content,
                spotId,
                authorId
            }
        })

        res.json({ data: { report } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api