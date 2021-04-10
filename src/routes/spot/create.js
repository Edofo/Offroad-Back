import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'
import axios from 'axios'

const api = Router()

api.post('/', async (req, res) => {
    try {

        const acceptedFields = ['level', 'adress', "infos"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { level, adress, infos } = req.body

        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address: adress,
                key: process.env.GOOGLE_API_KEY
            }
        })
        .then(async function(response){
            console.log(response.data.results[0].geometry.location);

            const spot = await prisma.spot.create({
                data: {
                    level,
                    adress,
                    infos,
                    lat: '',
                    lng: '',
                    note: 0,
                }
            })

            res.json({ data: { spot } })
        })

        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api