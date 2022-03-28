const fs = require('fs').promises;
const moment = require('momnet')

class CartContainer {
    constructor() {
      this.filePath = './src/db/cart.txt';
      this.data = [];
      this.id = 0;
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");  
            if (data) {
                this.data = JSON.parse(data); 
                this.data.map((cart) => {this.id < cart.id? this.id = cart.id:""});
            return this.data;
            }
        } catch (error) {
            if (error.code == 'ENOENT'){
                await fs.writeFile(this.filePath, '')
            return []
            }
            throw new Error(`Error no capturado: ${error.message}`)
        }    
    }
    async getCartById(id) {
        try {
        await this.getAll();
            const cartById = this.data.find((cart) => cart.id === parseInt(id));
        if (cartById) {
            return cartById
        } else {
            console.log(`No se encontro el carrito con id: ${id}`);
        }
        } catch (error) {
        console.log("Error " + error);
        }
    }

    async saveCart(){
        try{
            await this.getAll();
            this.id++
            const newCart = { 
                id: this.id,
                timestamp: moment().format('L LTS'),
                productos: []
        }
        this.data.push(newCart)
        await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        return newCart.id
    }
        catch (error){
            throw new Error("Se produjo un error al guardar el carrito : " +  error.message)
        }
    }

    async deleteCartById(id) {
        try {
            await this.getAll();
            const deleteIndex = this.data.findIndex((cart) => cart.id === id);
        if (deleteIndex === -1 ){
            console.log("Id no encontrado; ");
        } else{
            const deleteData = this.data.splice(deleteIndex,1)
            await fs.writeFile(
                    this.filePath,
                    JSON.stringify(this.data, null, 2)
                    );
        }
        } catch (error) {
        console.log("Error " + error);
        }
    }
    async addProdtoCart(cart, id){
        try{
          await this.getAll()
          const updateIndex = this.data.findIndex((cart) => cart.id === id);
          if (updateIndex === -1 ){
              console.log("Id no encontrado; ");
          } else{
              this.data[updateIndex] = cart
              await fs.writeFile(
                      this.filePath,
                      JSON.stringify(this.data, null, 2)
                    );
          }
        }catch(e){

        }
    }

}

module.exports = CartContainer


