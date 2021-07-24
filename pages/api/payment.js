import mercadopago from 'mercadopago'
import Cors from 'cors'

function initMiddleware(middleware) {
    return (req, res) =>
    new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
            if(result instanceof Error){
                return reject(result)
            }
            return resolve(result)
        })
    })
}

const cors = initMiddleware(Cors({
    methods: ['GET', 'POST']
}))

export default async function handler(req, res) {
    await cors(req, res)
    mercadopago.configurations.setAccessToken(process.env.SELLER_ACCESS_TOKEN)
    let preference = {
        items: req.body.items,
        back_urls: req.body.back_urls,
    }
    mercadopago.preferences.create(preference)
        .then(response=>{
            res.json({init_point: response.body.init_point})
        })
        .catch(err=>{
            res.status(500).send(err)
        })
}