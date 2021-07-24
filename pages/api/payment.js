const mercadopago = require('mercadopago')

export default async function handler(req, res) {
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