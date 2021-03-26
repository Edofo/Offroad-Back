import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'

const api = Router()

api.post('/', async (req, res) => {
    try {
        const acceptedFields = ['content', 'postId', "authorId"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, postId, authorId } = req.body

        const prisma = new PrismaClient()    
    
        const reportpost = await prisma.reportpost.create({
            data: {
                content,
                postId,
                authorId
            }
        })

        res.json({ data: { reportpost } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api