const fs = require('fs').promises;
const moment = require('momnet')

class ProductContainer {
  constructor() {
    this.filePath = './src/db/products.txt';
    this.data = [];
    this.id = 0;
  }
  async getAll() {
    try {
        const data = await fs.readFile(this.filePath, "utf-8");  
        if (data) {
            this.data = JSON.parse(data); 
            this.data.map((product) => {this.id < product.id? this.id = product.id:""});
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

  async saveProduct(product){
    await this.getAll();
    try{
        this.id++
        const addNewProduct = {
          id: this.id,  
          timestamp: moment().format('L LTS'),
          nombre: product.nombre,
          descripcion: product.descripcion,
          codigo: product.codigo,
          foto: product.foto,
          precio: product.precio,
          stock: product.stock
         }
        this.data.push(addNewProduct)
        await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        return addNewProduct
    } catch(error){
        throw new Error("Se produjo un error al guardar el producto : " +  error.message)
    }
  }

  async getById(id) {
    await this.getAll();
    try {
        const productById = this.data.find((prod) => prod.id === parseInt(id));
      if (productById) {
          return productById
      } else {
        console.log(`No se encontro el producto con id: ${id}`);
      }
    } catch (error) {
      console.log("Error " + error);
    }
  }  

  async  updateProduct(id, product) {
    await this.getAll();
    try {
        const productById = this.data.find((prod) => prod.id === parseInt(id));
      if (productById) {
        const updProduct = {
          id: id, 
          timestamp: moment().format('L LTS'),
          nombre: product.nombre,
          descripcion: product.descripcion,
          codigo: product.codigo,
          foto: product.foto,
          precio: product.precio,
          stock: product.stock
        }
          const findIndex = this.data.findIndex((prod) => prod.id === id)
          this.data[findIndex] = updProduct
          await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
          return updProduct
      } else {
        console.log(`No se encontro el producto con id: ${id}`);
      }
    } catch (error) {
      console.log("Error " + error);
    }
  }
    
  async deleteById(id) {
    await this.getAll();
    try {
      const deleteIndex = this.data.findIndex((product) => product.id === id);
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

  
}

module.exports = ProductContainer