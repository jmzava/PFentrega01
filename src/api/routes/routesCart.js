const express =  require('express')
const routesCart = express.Router()
const ClassCart = require ('../class/classCart')
const ClassProd = require ('../class/classProd')

const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500


storCart = new ClassCart()
storProd = new ClassProd()

routesCart
    .get('/', async (req, res) => {
        try {
            const cart = await storCart.getAll()
            res.status(statusOk).json(cart)
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })
    .post('/', async (req, res) =>{
        try {
            const cart = await storCart.saveCart()
            res.status(statusOk).json(cart)
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            const cart = await storCart.getCartById(req.params.id)
            if (cart){
                const delCart = await storCart.deleteCartById(cart.id)
                res.status(statusOk).json({
                    message: 'El Carrito ha sido eliminado',
                    product: delCart
                })
            }else{
                res.status(statusNotFound).json({error: 'carrito no encontrado'})
            }
        } catch(error){
            res.status(statusErrServer).json({error: error.message})
        }
    })
    
    .post('/:id/productos/:idProduct', async (req, res) => {
        try{
            const cart = await storCart.getCartById(req.params.id)
            if (cart){
                const prod = await storProd.getById(req.params.idProduct)
                cart.productos.push(prod)
                await storCart.addProdtoCart(cart, cart.id)
                res.status(statusOk).json(cart)
            }else{
                res.status(statusNotFound).json({error: 'carrito no encontrado'})
            }        
            }catch(e){
                res.status(statusErrServer).json({e: e.message})
            }
        })
    .get('/:id/productos', async (req, res) =>{
        try{
            const cart = await storCart.getCartById(req.params.id)
            if (cart){
                res.status(statusOk).json(cart.productos)
            }else{
                res.status(statusNotFound).json({error: 'carrito no encontrado'})
            }

        }catch(e){
            res.status(statusErrServer).json({e: e.message})
        }
    })
    .delete('/:id/productos/:idProduct', async (req, res) => {
        try{
            const cart = await storCart.getCartById(req.params.id)
            if (cart){
 
                const deleteIndex = cart.productos.findIndex((prod) => prod.id === Number(req.params.idProduct))
 
                if (deleteIndex === -1){
                    console.log('no se encuentra')
                }else{
                    const deleteData = cart.productos.splice(deleteIndex,1)
                }
 
                await storCart.addProdtoCart(cart, cart.id)
                res.status(statusOk).json(cart)
            }else{
                res.status(statusNotFound).json({error: 'carrito no encontrado'})
            }
      
            }catch(e){
                res.status(statusErrServer).json({e: e.message})
            }
        })

module.exports = routesCart