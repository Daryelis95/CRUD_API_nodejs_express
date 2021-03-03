const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

//obtener todos los registros
router.get('/' , (req , res , next) => {

    Product.find()
    .exec()
    .then(docs => {

        console.log(docs);
       /*  if(docs.length > 0) { */

            res.status(200).json(docs);
        /* } */
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ 
            
            error : err
        })
    });
    
});
//agregar registros
router.post('/' , (req , res , next) => {
    //Crear nuevo producto
    const product = new Product({

        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //guardar producto
    product.save() //save().exec() convierte en una promesa
    .then(result => {

        console.log(result);
        res.status(200).json({
            message : 'api exitosa  POST /products',
            createdProduct : result
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error : err})
    })

    
});
//obtener registros por id
router.get('/:productId' , (req , res , next) => {

    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            
            res.status(200).json(doc);
            
        }else{
            res.status(404).json({
                message : 'no se encontró una entrada válida para la identificación proporcionada'
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error : err})
    })
});
//actualizar registros 
router.patch('/:productId' , (req , res , next) => {
    
    const id = req.params.productId;
    const updateOps = {};
    //recorrer todo lo que viene en el cuerpo
    for (const ops of req.body){
        
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id : id } , {$set: updateOps})
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err =>{

        console.log(err);
        
        res.status(500).json({
            error: err
        });
    });

   
});

//eliminar registros 
router.delete('/:productId' , (req , res , next) => {

    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error : err})
    })
});

module.exports = router;