import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const acceptedFields = ['content', 'postId', "authorId"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, postId, authorId } = req.body

        const prisma = new PrismaClient()
    
        const reportpost = await prisma.reportPost.findFirst({
            where: {
                id
            }
        })

        const updateReport = await prisma.reportPost.update({
            where: {
                id
            },
            data: {
                content,
                postId: postId,
                authorId: authorId
            }
        })

        res.json({ data: { reportpost, updateReport } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api