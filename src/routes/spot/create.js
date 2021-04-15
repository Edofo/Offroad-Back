import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'
import axios from 'axios'

const api = Router()

api.post('/', async (req, res) => {
    try {

        const acceptedFields = ['level', 'adress', "infos", "noteUser", "content", "authorId", "userName"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { level, adress, infos, noteUser, content, authorId, userName } = req.body

        axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=photos,formatted_address,name,geometry',{
            params:{
                input: adress,
                key: process.env.GOOGLE_API_KEY
            }
        })
        .then(async(responseData) => {

            axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                params: {
                    photoreference: responseData.data.candidates[0].photos[0].photo_reference,
                    maxheight: responseData.data.candidates[0].photos[0].height,
                    key: process.env.GOOGLE_API_KEY
                }
            })
            .then(async(response) => {

                console.log(response)

                const spot = await prisma.spot.create({
                    data: {
                        level,
                        adress: responseData.data.candidates[0].formatted_address,
                        infos,
                        lat: responseData.data.candidates[0].geometry.location.lat,
                        lng: responseData.data.candidates[0].geometry.location.lng,
                        note: noteUser,
                    }
                })
                
                const post = await prisma.post.create({
                    data: {
                        content,
                        note: noteUser,
                        spotId: spot.id,
                        authorId,
                        userName,
                    }
                })

                res.json({ data: { spot, post } })
            })
        })

        

        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api