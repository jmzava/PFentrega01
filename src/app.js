const express = require('express')
const myRoutesProd =require('./api/routes/routesProd')
const myRoutesCart = require('./api/routes/routesCart')

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use( '/productos', myRoutesProd)
server.use( '/carrito', myRoutesCart)


server.set('view engine', 'ejs');
server.set('views','./views');

module.exports = server