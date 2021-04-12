import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

const api = Router()

api.post('/', async (req, res) => {
    try {

        const acceptedFields = ['content', 'note', 'spotId', 'authorId']

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, note, spotId, authorId } = req.body

    
        const post = await prisma.post.create({
            data: {
                content,
                note,
                spotId: spotId,
                authorId: authorId
            }
        })

        const spotNote = await prisma.post.findMany({
            where: {
                id: spotId
            },
            select: {
                note
            }
        }).then(async function(note) {
            console.log(note)
        })

        res.json({ data: { post } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api