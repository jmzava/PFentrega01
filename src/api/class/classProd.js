const fs = require('fs').promises;

class ProductContainer {
  constructor() {
    this.filePath = "./products.txt";
    this.data = [];
    this.id = 0;
  }
  async getAll() {
    try {
        console.log(this.filePath)
        const data = await fs.readFile(this.filePath, "utf-8");  
        if (data) {
            this.data = JSON.parse(data); 
            this.data.map((product) => {this.id < product.id? this.id = product.id:""});
        return this.data;
        }
    } catch (error) {
        if (error.code == 'ENOENT'){
            await fs.promises.writeFile(this.filePath, '')
        return []
        }
        throw new Error(`Error no capturado: ${error.message}`)
        }
  }
  async saveProduct(product){
    try{
        this.productId++
        const addNewProduct = {
          id: this.productId,  
          timestamp: product.timestamp,
          nombre: product.nombre,
          descripcion: product.descripcion,
          codigo: product.codigo,
          foto: product.foto,
          precio: product.precio,
          stock: product.stock
         }
        this.product.push(addNewProduct)
        return addNewProduct
    } catch(error){
        throw new Error("Se produjo un error al guardar el producto : " +  error.message)
    }
  }

  async getById(id) {
    await this.getAll();
    try {
      const productById = this.data.find((prod) => prod.id === id);
      if (productById) {
        console.log("Producto encontrado:\n ");
        console.log(productById);
      } else {
        console.log(`No se encontro el producto con id: ${id}`);
      }
    } catch (error) {
      console.log("Error " + error);
    }
  }  
}

module.exports = ProductContainer