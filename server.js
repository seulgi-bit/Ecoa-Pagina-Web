
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// 1. Conexión a MongoDB usando la variable del archivo .env
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('¡Conexión exitosa a MongoDB Atlas! 🌿🚀');
        // Encendemos el servidor solo si la base de datos respondió bien
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// 2. Ejemplo de una "Ruta" (Endpoint) básica para probar
app.get('/', (req, res) => {
    res.send('El servidor de Ecoa está conectado y funcionando.');
});