const server = require('./src/app')

const PORT = process.env.PORT || 8080 


server.listen(PORT, ()=> {
    console.log( 'Servidor corriendo en el puerto ' + PORT)
})
server.on('error', (err) => console.log(err.message)) 
