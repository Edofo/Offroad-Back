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

        /*axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address: adress,
                key: process.env.GOOGLE_API_KEY
            }
        })*/
        
        axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json',{
            params:{
                input: adress,
                key: process.env.GOOGLE_API_KEY
            }
        })
        .then(async function(response){

            const spot = await prisma.spot.create({
                data: {
                    level,
                    adress,
                    infos,
                    /*lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng,*/
                    lat: response.data.candidates[0].geometry.location.lat,
                    lat: response.data.candidates[0].geometry.location.lng,
                    note: noteUser,
                }
            })
            
            const post = await prisma.post.create({
                data: {
                    content,
                    note: noteUser,
                    spotId: spot.id,
                    authorId,
                    userName
                }
            })

            res.json({ data: { spot, post } })
        })

        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api