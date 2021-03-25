import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const acceptedFields = ['content', 'note', 'spotId', 'authorId']

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, note, spotId, authorId } = req.body

        const prisma = new PrismaClient()

    
    
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        })

        const updatePost = await prisma.post.update({
            where: {
                id
            },
            data: {
                content,
                note,
                spotId,
                authorId
            }
        })

        res.json({ data: { post, updatePost } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api