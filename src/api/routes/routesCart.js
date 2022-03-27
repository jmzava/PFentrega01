const express =  require('express')
const routesCart = express.Router()
const ClassCart = require ('../class/classCart')


const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500


storCart = new ClassCart()

routesCart
    .get('/', async (req, res) => {
        try {
            const cart = await storCart.getAll()
            res.status(statusOk).json(cart)
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })

    
module.exports = routesCart