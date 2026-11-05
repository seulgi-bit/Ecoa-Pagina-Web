const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  // Si entran a la raíz ('/'), cargamos 'inicio.html' por defecto
  let filePath = request.url === '/' ? './inicio.html' : '.' + request.url;

  // Obtenemos la extensión del archivo (html, css, jpg, js, etc.)
  let extname = path.extname(filePath);
  let contentType = 'text/html';

  // Definimos los tipos de contenido para que el navegador los entienda bien
  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
  }

  // Leemos el archivo del proyecto
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>404 - Página no encontrada</h1>');
      } else {
        response.writeHead(500);
        response.end('Error interno del servidor: ' + error.code);
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});
//segunda parte del código, usando express para manejar las rutas y el carrito de compras
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());//la app puede recibir objetos y enviar objetos

app.use(express.static(__dirname));

let productos = [
  { nombre: 'Producto 1', precio: 10, cantidad: 5, imagen: 'img/producto1.jpg' },
  { nombre: 'Producto 2', precio: 20, cantidad: 3, imagen: 'img/producto2.jpg' },
  { nombre: 'Producto 3', precio: 15, cantidad: 8, imagen: 'img/producto3.jpg' }
];

let carrito = [];


app.get('/productos', (req, res) => {
  res.json(productos);
});

// 2. Ruta para obtener el carrito
app.get('/api/carrito', (req, res) => {
  res.json(carrito);
});

// 3. Ruta para agregar al carrito mediante POST
app.post('/api/carrito', (req, res) => {
  const item = req.body;
  carrito.push(item);
  res.json({ mensaje: "Guardado en el servidor", carrito });
});

const PORT = 1111;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicio.html')); // Cambia 'inicio.html' por el archivo que quieras mostrar
});
// Como tus archivos HTML están sueltos en la carpeta del proyecto, usa esto:
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});