class Login{
    static isAdmin(isAdmin){
        return  (req,res,next) =>{
            try {
                if (isAdmin)next()
                else res.send({ error : -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method}  no autorizada` })
                }
            catch (e){
                res.send(e.message)
            }
        }
    }
}

module.exports = Login