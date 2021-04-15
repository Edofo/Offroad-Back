import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'
import axios from 'axios'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const acceptedFields = ['level', 'adress', "infos"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { level, adress, infos } = req.body

    
        const spot = await prisma.spot.findFirst({
            where: {
                id
            }
        })

        if (!spot) {
            return res.status(400).json({ error: `this report with id: ${id} doesn't exist` })
        }

        axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=photos,formatted_address,name,geometry',{
            params:{
                input: adress,
                key: process.env.GOOGLE_API_KEY
            }
        })
        .then(async(responseData) => {

            console.log(responseData)

            axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                params: {
                    photoreference: responseData.data.candidates[0].photos[0].photo_reference,
                    maxheight: responseData.data.candidates[0].photos[0].height,
                    key: process.env.GOOGLE_API_KEY
                }
            })
            .then(async function(response){

                const updateSpot = await prisma.spot.update({
                    where: {
                        id
                    },
                    data: {
                        level,
                        adress: responseData.data.candidates[0].formatted_address,
                        infos,
                        lat: responseData.data.candidates[0].geometry.location.lat,
                        lng: responseData.data.candidates[0].geometry.location.lng,
                        photo: response.request.res.responseUrl
                    }
                })

            res.json({ data: { spot, updateSpot } })
            
            })
        })
        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api