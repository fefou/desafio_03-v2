const fs=require('fs')

class ProductManager {

    constructor(rutaArchivo) {
        // this.productos = []
        this.path=rutaArchivo
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(fs.readFileSync(this.path, "utf-8"))
        } else {
            return []
        }
    }

    getProductById(id) {
        let productos = this.getProducts();

        let index = productos.findIndex((producto) =>{
            return producto.id === id
        })

        if (index === -1){
            console.log(`no existe el producto con id ${id}`)
            return
        }
        return productos[index]
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        let productos = this.getProducts()

        let id = 1
        if (productos.length > 0) {
            id = productos[productos.length - 1].id + 1
        }

        let existe = productos.find(u => u.code === code)
        if (existe) {
            console.log(` El código ${code} ya existe.`)
            return
        }
        productos.push({
            id, title, description, price, thumbnail, code, stock
        })

        fs.writeFileSync(this.path, JSON.stringify(productos, null, 5))

    }

    deleteProduct(id){
        let productos= this.getProducts()
        let indice=productos.findIndex(p=>p.id ===id)
        if (indice === -1){
            console.log(`El producto con id ${id} no existe en la base de datos`)
            return
        }

        productos.splice(indice, 1)

        fs.writeFileSync(this.path, JSON.stringify(productos, null, 5))
    }

    updateProduct(id, objeto){
        let productos= this.getProducts()
        let indice=productos.findIndex(p=>p.id ===id)
        if (indice === -1){
            console.log(`El producto con id ${id} no existe en la base de datos`)
            return
        }

        productos[indice]={
            ...productos[indice],
            ...objeto,
            id
        }


        fs.writeFileSync(this.path, JSON.stringify(productos, null, 5))
    }

    
    

}

const pm=new ProductManager("./productos.json")

pm.addProduct("prueba1", "archivo prueba1", "100", "sin imagen", 1, 10)
pm.addProduct("prueba2", "archivo prueba2", "200", "sin imagen", 2, 20)
pm.addProduct("prueba3", "archivo prueba3", "300", "sin imagen", 3, 30)
pm.addProduct("prueba4", "archivo prueba4", "400", "sin imagen", 4, 40)
pm.addProduct("prueba5", "archivo prueba5", "500", "sin imagen", 5, 50)
pm.addProduct("prueba6", "archivo prueba6", "600", "sin imagen", 6, 60)
pm.addProduct("prueba7", "archivo prueba7", "700", "sin imagen", 7, 70)
pm.addProduct("prueba8", "archivo prueba8", "800", "sin imagen", 8, 80)
pm.addProduct("prueba9", "archivo prueba9", "900", "sin imagen", 9, 90)
pm.addProduct("prueba10", "archivo prueba10", "1000", "sin imagen", 10, 100)