const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// 1. Configuraciones básicas de Express
app.use(express.json()); // Permite recibir y enviar objetos JSON
app.use(express.static(__dirname)); // Sirve automáticamente tus HTML, CSS, JS e imágenes

// 2. CONEXIÓN A MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/ecoa_db')
  .then(() => console.log('¡Conectado a MongoDB con éxito! 🍃'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// 3. BASE DE DATOS TEMPORAL (O en memoria mientras configuras los Modelos de Mongoose)
let productos = [
  { nombre: 'Producto 1', precio: 10, cantidad: 5, imagen: 'img/producto1.jpg' },
  { nombre: 'Producto 2', precio: 20, cantidad: 3, imagen: 'img/producto2.jpg' },
  { nombre: 'Producto 3', precio: 15, cantidad: 8, imagen: 'img/producto3.jpg' }
];

let carrito = [];

// --- RUTAS DE LA API ---

// Ruta para obtener los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta para obtener el carrito
app.get('/api/carrito', (req, res) => {
  res.json(carrito);
});

// Ruta para agregar al carrito mediante POST
app.post('/api/carrito', (req, res) => {
  const item = req.body;
  carrito.push(item);
  res.json({ mensaje: "Guardado en el servidor", carrito });
});

// Ruta principal para cargar tu página de inicio por defecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicio.html'));
});

// 4. ENCENDER EL SERVIDOR EN EL PUERTO 1111
const PORT = 1111;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
