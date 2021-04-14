import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

const api = Router()

api.post('/', async (req, res) => {
    try {

        const acceptedFields = ['content', 'noteUser', 'postId', 'authorId', 'userName']

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content, noteUser, postId, authorId, userName } = req.body

        const post = await prisma.post.create({
            data: {
                content,
                note: noteUser,
                postId: postId,
                authorId: authorId,
                userName,
            }
        })

        const spotNote = await prisma.post.findMany({
            where: {
                spotId,
            },
            select: {
                note: true,
            }
        }).then(async(response) => {
            
            let count = 0;
            let moyen = 0;

            for(let i = 0; 0 < response.length; i++) {
                count = count + response[i].note;

                if(i + 1 == response.length) {
                    moyen = Math.floor((count / response.length) * 10) / 10;
                    console.log(moyen)

                    const spotInfos = await prisma.spot.update({
                        where: {
                            id: spotId,
                        },
                        data: {
                            note: moyen,
                        }
                    })

                    res.json({ data: { post, spotInfos } })
                }
            }
        })
        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api