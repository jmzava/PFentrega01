const express =  require('express')
const routesProduct = express.Router()
const ClassProd = require ('../class/classProd')
const isAdmin = require('../middleware/login').isAdmin;
const admin = Boolean(true)

const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrUser = 401
const statusErrServer = 500


const storProd = new ClassProd()

routesProduct.get('/', async (req, res) => {
        try {
            const products = await storProd.getAll()
            res.status(statusOk).json(products)
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })

routesProduct.get('/:idProduct', async (req, res) => {
        try {
            const product = await storProd.getById(req.params.idProduct)
            if (product){
                res.status(statusOk).json(product)
            }else{
                res.status(statusNotFound).json({error: 'producto no encontrado'})
            }
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })

routesProduct.post('/', isAdmin(admin), async (req, res) => {
        try {
            if (req.body.nombre){
                const product = await storProd.saveProduct(req.body)
                res.status(statusCreated).json(product)
            }else{
                res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
            }
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })

routesProduct.put('/:idProduct', isAdmin(admin), async (req, res) => {
        try {
           
            const product = await storProd.getById(req.params.idProduct)
    
            if (product){

                if (req.body.nombre){
                    const productUpdated = await storProd.updateProduct(Number(req.params.idProduct), req.body)
                    res.status(statusOk).json(productUpdated)
                }else{
                    res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
                }

            }else{
                res.status(statusNotFound).json({error: 'producto no encontrado'})
            }
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
  })

routesProduct.delete('/:idProduct',  isAdmin(admin),async (req, res) => {
        try {
            const product = await storProd.getById(req.params.idProduct)
            if (product){
                const delProduct = await storProd.deleteById(product.id)
                res.status(statusOk).json({
                    message: 'El producto ha sido eliminado',
                    product: delProduct
                })
            }else{
                res.status(statusNotFound).json({error: 'producto no encontrado'})
            }
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })
    
module.exports = routesProduct