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