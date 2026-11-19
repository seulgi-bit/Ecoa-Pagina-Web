
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));// verifica que en el servidor aparezca mi pagina web

// 1. Conexión a MongoDB usando la variable del archivo .env
const PORT = process.env.PORT || 1111;
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

// 3. IMPORTAR LOS MODELOS DE LA BASE DE DATOS

const Usuario = require('./modelos/usuario.js');
const Catalogo = require('./modelos/catalogo.js');

//PARA CONECTAR LA BASE DE DATOS DE MONGO A CATALOGO EN VEZ DE HTML
app.get('/api/catalogo', async (req, res) => {
    try {
        const productos = await Catalogo.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el catalogo' });
    }
});


// 4. RUTAS PARA EL REGISTRO DE USUARIOS

app.post('/api/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'Este correo ya está registrado.' });
        }

        // Crear y guardar el nuevo usuario en MongoDB
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: '¡Usuario registrado con éxito en MongoDB! 🌿' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al registrar.' });
    }
});

// 5. RUTAS PARA EL LOGIN DE USUARIOS
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por correo y contraseña
        const usuario = await Usuario.findOne({ email, password });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
        }

        res.status(200).json({ mensaje: '¡Inicio de sesión exitoso!', nombre: usuario.nombre });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión.' });
    }
});



// Ruta para obtener los productos del catálogo en formato JSON
app.get('/api/catalogo', async (req, res) => {
    try {
        const productos = await Catalogo.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener el catálogo:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos." });
    }
});