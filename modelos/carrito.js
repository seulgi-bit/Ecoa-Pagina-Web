const mongoose = require('mongoose');
const carritoSchema = mongoose.Schema({
  nombre:{
    type:String
  },
  precio:{
    type:Number
  },
  cantidad:{
    type:Number
  },
  imagen:{
    type:String
  }

})
module.exports = mongoose.model('catalogo', carritoSchema)
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);