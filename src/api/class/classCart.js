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
}

module.exports = CartContainer


