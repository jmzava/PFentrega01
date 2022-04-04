const express = require('express')
const myRoutesProd =require('./api/routes/routesProd')
const myRoutesCart = require('./api/routes/routesCart')
const errorRoutes = require('./api/routes/errorRoutes')

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))
server.use(express.json())


server.use( '/api/productos', myRoutesProd)
server.use( '/api/carrito', myRoutesCart)
server.use( '*', errorRoutes)


module.exports = server