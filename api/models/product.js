const mongoose = require('mongoose');
//connect recibe (mongodb: //la ruta si es local y /el nombre de la base de datos)
mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true, useUnifiedTopology: true});

//generar tabla
const productSchema = mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number

});

module.exports = mongoose.model('Product', productSchema);