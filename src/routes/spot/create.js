import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'

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

        if(adress != ""){ // Si l'adresse n'est pas vide
            let geocoder =  new google.maps.Geocoder(); // On instancie le geocoder
            geocoder.geocode( { 'address': adress}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) { // Si l'adresse a été résolue
                    lat = results[0].geometry.location.lat(); // On récupère la latitude
                    lon = results[0].geometry.location.lng(); // On récupère la longitude
                    console.log(lat)
                } else {
                    alert("Something got wrong " + status);
                }
            });
        }

        const spot = await prisma.spot.create({
            data: {
                level,
                adress,
                infos
            }
        })

        res.json({ data: { spot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api