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

server.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});