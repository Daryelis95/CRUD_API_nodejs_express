const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


//middleware
app.use(morgan('dev'));
//analizar url leer parametros de formato simple
app.use(bodyParser.urlencoded({extended : false}));
//formato json
app.use(bodyParser.json());

//agregar encabezado para que accedan clientes de otros puertos distintos al 3000
app.use((req , res, next) => {

    //cabecera
    res.header('Access-Control-Allow-Origin' , '*'); //* dar acceso a todos

    res.header('Access-Control-Allow-Headers' , 'Origin , X-Requested-With , Content-Type ,Accept , Authotization ');

    if(req.method === 'OPTIONS'){
        //metodos permitidos
        res.header('Access-Control-Allow-Methods' , 'PUT , POST , PATHS, DELETE , GET');
        res.status(200).json({});
    }

    next();
});

//rutas
app.use('/products' , productRoutes);
app.use('/orders' , orderRoutes);

//manejos de errores

app.use((req , res , next) =>{

    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req , res , next) =>{

    res.status(error.status || 500);
    res.json({

        error: {
            message: error.message
        }
    });
});

module.exports = app;