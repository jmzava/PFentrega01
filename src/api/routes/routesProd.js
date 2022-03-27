const express =  require('express')
const routesProduct = express.Router()
const ClassProd = require ('../class/classProd')

const storProd = new ClassProd()

routesProduct.get('/', async (req, res) => {
        try {
            const products = await storProd.getAll()
            res.status(200).json(products)
        } catch(error){
            res.status(500).json({error: error.message})
        }
    })

module.exports = routesProduct



// routerProd
//     .get('/', (req, res) => {
//         try {
//             res.status(statusOk).json(storProd.productsAll)
//         } catch(error){
//             res.status(statusErrServer).json({error: error.message})
//         }
//     })

//     .get('/:idProduct', (req, res) => {
//         try {
//             const product = storProd.getById(req.params.idProduct)
//             if (product){
//                 res.status(statusOk).json(product)
//             }else{
//                 res.status(statusNotFound).json({error: 'producto no encontrado'})
//             }
//         } catch(error){
//             res.status(statusErrServer).json({error: error.message})
//         }
//     })

//     .post('/', (req, res) => {
//         try {
//             if (req.body.title && req.body.price){
//                 const product = storProd.saveProduct(req.body)
//                 res.status(statusCreated).json(product)
//             }else{
//                 res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
//             }
//         } catch(error){
//             res.status(statusErrServer).json({error: error.message})
//         }
//     })

//     .put('/:idProduct', (req, res) => {
//         try {
           
//             const product = storProd.getById(req.params.idProduct)
    
//             if (product){

//                 if (req.body.title && req.body.price){
//                     const productUpdated = storProd.updateProduct(Number(req.params.idProduct), req.body)
//                     res.status(statusOk).json(productUpdated)
//                 }else{
//                     res.status(statusErrClient).json({error: 'Complete los datos obligatorios'})
//                 }

//             }else{
//                 res.status(statusNotFound).json({error: 'producto no encontrado'})
//             }
//         } catch(error){
//             res.status(statusErrServer).json({error: error.message})
//         }
//     })

//     .delete('/:idProduct', (req, res) => {
//         try {
//             const product = storProd.getById(req.params.idProduct)
//             if (product){
//                 storProd.deleteProduct(product.id)
//                 res.status(statusOk).json({
//                     message: 'El producto ha sido eliminado',
//                     product: product
//                 })
//             }else{
//                 res.status(statusNotFound).json({error: 'producto no encontrado'})
//             }
//         } catch(error){
//             res.status(statusErrServer).json({error: error.message})
//         }
//     })
