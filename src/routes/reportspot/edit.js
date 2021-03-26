import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const acceptedFields = ['content', 'spotId', "authorId"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, spotId, authorId } = req.body

        const prisma = new PrismaClient()
    
        const reportspot = await prisma.reportspot.findFirst({
            where: {
                id
            }
        })

        const updateReport = await prisma.reportspot.update({
            where: {
                id
            },
            data: {
                content,
                spotId,
                authorId
            }
        })

        res.json({ data: { reportspot, updateReport } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api