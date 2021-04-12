import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

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

        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address: adress,
                key: process.env.GOOGLE_API_KEY
            }
        })
        
        const updateSpot = await prisma.spot.update({
            where: {
                id
            },
            data: {
                level,
                adress,
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
                infos
            }
        })

        res.json({ data: { spot, updateSpot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api