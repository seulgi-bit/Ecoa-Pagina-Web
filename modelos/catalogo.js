const mongoose = require('mongoose');

const catalogoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String },
  caracteristicas: {
    tamano: String,
    materiales: [String],
    diseno: String
  },
  stock: { type: Number, default: 10 }
}, { collection: 'catalogo' });

module.exports = mongoose.model('Catalogo', catalogoSchema);