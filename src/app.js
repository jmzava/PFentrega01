const express = require('express')
const myRoutesProd =require('./api/routes/routesProd')
const myRoutesCart = require('./api/routes/routesCart')
const errorRoutes = require('./api/routes/errorRoutes')
const cors = require("cors")

const whitelist = ["http://127.0.0.1:5501"]

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }
  

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.use(cors(corsOptions))

server.use( '/productos', myRoutesProd)
server.use( '/carrito', myRoutesCart)
server.use( '*', errorRoutes)


// server.set('view engine', 'ejs');
// server.set('views','./views');

module.exports = server