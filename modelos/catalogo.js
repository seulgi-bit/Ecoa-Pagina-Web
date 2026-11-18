const mongoose = require('mongoose');

document.addEventListener("DOMContentLoaded", async () => {
  // Buscamos el contenedor donde van las tarjetas en tu catalogo.html
  const contenedorProductos = document.querySelector(".productos");

  if (!contenedorProductos) return;

  try {
    // Pedimos los productos al servidor (que los busca en MongoDB)
    const respuesta = await fetch('/api/catalogo');
    const productos = await respuesta.json();

    // Limpiamos el contenido estático que tenías antes en el HTML
    contenedorProductos.innerHTML = "";

    // Creamos una tarjeta por cada producto que venga de la base de datos
    productos.forEach(prod => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("product-card");

      tarjeta.innerHTML = `
                <h4>${prod.nombre}</h4>
                <img class="img-productos" src="${prod.imagen}" alt="${prod.nombre}">
                <p>${prod.descripcion}</p>
                <div class="card-footer">
                    <span class="price">$ ${prod.precio.toLocaleString()}</span>
                    <button class="btn-pedido" data-id="${prod._id}">Añadir al carrito 🛒</button>
                </div>
            `;

      contenedorProductos.appendChild(tarjeta);
    });

  } catch (error) {
    console.error("Error al cargar el catálogo:", error);
  }
});