# Ecoa — Catálogo y Tienda Web 🌿

Aplicación web  para explorar el catálogo de productos, gestionar inicio de sesión con MongoDB Atlas, administrar el carrito de compras y enviar mensajes directos por WhatsApp.

## ✨ Funcionalidades
- **Catálogo dinámico:** Consulta productos almacenados en MongoDB Atlas a través de `/api/catalogo`.
- **Usuarios y autenticación:** Registro (`/api/registro`) e inicio de sesión (`/api/login`) conectados a la colección `usuarios` en MongoDB.
- **Carrito de compras:** Permite agregar productos, ajustar cantidades, eliminar ítems y gestionar el estado en el navegador.
- **Formulario de contacto a WhatsApp:** Valida los campos y abre un mensaje formateado hacia WhatsApp con los datos ingresados.

## 🛠️ Tecnologías
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend:** Node.js, Express, CORS, dotenv
- **Base de datos:** MongoDB Atlas con Mongoose

## 📁 Estructura del proyecto
- `server.js` — Configuración del servidor Express, conexión a MongoDB Atlas y rutas de la API.
- `modelos/` — Esquemas y modelos de Mongoose (`usuario.js`, `catalogo.js`).
- `catalogo.html`, `catalogo_front.js`, `cargarCatalogo.js` — Vista y lógica del catálogo.
- `carrito.html`, `carrito.js`, `agregar-carrito.js` — Vista y lógica del carrito.
- `login.html`, `login.js`, `registro.html`, `registro.js` — Autenticación y registro.
- `contacto.html`, `contacto.js` — Formulario de contacto integrado con WhatsApp.
- `.env.example` — Ejemplo de variables de entorno necesarias.

## 🚀 Instalación y ejecución local

1. **Clona o descarga el repositorio** y ábrelo en Visual Studio Code.
2. **Instala las dependencias:**
   ```bash
   npm install
