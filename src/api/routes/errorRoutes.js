const express =  require('express')
const errorRoutes = express.Router()
 
const responseError = (req, res) => {
    res.send({ error : -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` })
}
 
errorRoutes.get('*', responseError)
errorRoutes.post('*', responseError)
errorRoutes.delete('*', responseError)
errorRoutes.put('*', responseError)
 
module.exports = errorRoutes