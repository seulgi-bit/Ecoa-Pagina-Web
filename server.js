/*const http = require('http');
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
});*/

const express = require('express');
const path = require('path');
const app = express();
const PORT = 1111;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicio.html')); // Cambia 'inicio.html' por el archivo que quieras mostrar
});
// Como tus archivos HTML están sueltos en la carpeta del proyecto, usa esto:
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});