const express = require('express');

const router = express.Router();

//obtener todos los registros
router.get('/' , (req , res , next) => {

    res.status(200).json({
        message : 'api exitosa GET /orders'
    });
});
//agregar registros
router.post('/' , (req , res , next) => {

    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : 'api exitosa  POST /orders',
        order: order
    });
});
//obtener registros por id
router.get('/:orderId' , (req , res , next) => {

    const id = req.params.orderId;
    res.status(200).json({
            message : 'detalles de un orden',
            id: id
    });
        
    
});

//eliminar registros 
router.delete('/:orderId' , (req , res , next) => {

    const id = req.params.orderId;
    res.status(200).json({
        
        message : 'Metodo Delete',
        id: id
    });
});

module.exports = router;