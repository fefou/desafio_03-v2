const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')
const productosJSON = require('./productos.json')


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


app.get('/productos', (req, res) => {
    let resultado=productosJSON

    if(req.query.limit){
        resultado=resultado.slice(0, req.query.limit)
    }

    res.setHeader('Content-Type','application/json');
    res.status(200).json({filtros: req.query,resultado });
});


// app.get('/productos/:id', (req, res) => {

//     let id = req.params.id
//     let resultado = productosJSON.find(prod => prod.id == id)

//     if (resultado){
//         fs.readFile('productos.json', 'utf8', (err, data) => {

//             const productos = JSON.parse(data);
//             res.status(200).json({ resultado });

//         });
//     }else{
//         res.status(404).json({ error: 'Producto no encontrado' })
//     }
// });

app.get('/productos/:id',(req,res)=>{

    let id=req.params.id
    // console.log(id, 2)
    id=parseInt(id)  
    if(isNaN(id)){
        return res.send('Error, ingrese un argumento id numerico')
    }


    resultado=productosJSON.find(per=>per.id===id)

    res.setHeader('Content-Type','application/json');
    res.status(200).json({resultado});
})


app.listen(port, () => {
    console.log(`Server funcionando con Express en el puerto ${port}`);
});


