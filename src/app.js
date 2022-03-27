const express = require('express')
const myRoutes =require('./api/routes/routesProd')


const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use(myRoutes)


server.set('view engine', 'ejs');
server.set('views','./views');

module.export = server