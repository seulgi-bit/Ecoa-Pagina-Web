
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require("path")

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "inicio.html"));
});

//  Conexión a MongoDB usando la variable del archivo .env
const PORT = process.env.PORT || 1111;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('¡Conexión exitosa a MongoDB Atlas! 🌿🚀');
       
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });





const Usuario = require('./modelos/usuario.js');
const Catalogo = require('./modelos/catalogo.js');


app.get('/api/catalogo', async (req, res) => {
    try {
        const productos = await Catalogo.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el catalogo' });
    }
});

app.post('/api/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'Este correo ya está registrado.' });
        }
        // Crear y guardar el nuevo usuario en Mongodb
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: '¡Usuario registrado con éxito en MongoDB! 🌿' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al registrar.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por correo y contraseña
        const usuario = await Usuario.findOne({ email, password });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
        }

        res.status(200).json({
            mensaje: '¡Inicio de sesión exitoso!',
            nombre: usuario.nombre,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión.' });
    }
});
