document.addEventListener("DOMContentLoaded", async () => {
  const contenedorProductos = document.querySelector(".productos");

  if (!contenedorProductos) return;

  try {
    const respuesta = await fetch('/api/catalogo');
    const productos = await respuesta.json();

    contenedorProductos.innerHTML = "";

    productos.forEach(prod => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("product-card");

      let caracteristicasHTML = "";
      if (prod.caracteristicas) {
        caracteristicasHTML = `<div class="card-caracteristicas">`;
        if (prod.caracteristicas.tamano) {
          caracteristicasHTML += `<p><strong>Tamaño:</strong> ${prod.caracteristicas.tamano}</p>`;
        }
        if (prod.caracteristicas.materiales && prod.caracteristicas.materiales.length > 0) {
          caracteristicasHTML += `<p><strong>Materiales:</strong> ${prod.caracteristicas.materiales.join(", ")}</p>`;
        }
        if (prod.caracteristicas.diseno) {
          caracteristicasHTML += `<p><strong>Diseño:</strong> ${prod.caracteristicas.diseno}</p>`;
        }
        caracteristicasHTML += `</div>`;
      }

      tarjeta.innerHTML = `
                <h4>${prod.nombre}</h4>
                <img class="img-productos" src="${prod.imagen}" alt="${prod.nombre}">
                <p>${prod.descripcion}</p>
                ${caracteristicasHTML}
                <p class="stock"><strong>Disponibles:</strong> ${prod.stock !== undefined ? prod.stock : 'Agotado'} unidades</p>
                <div class="card-footer">
                    <span class="price">$ ${prod.precio.toLocaleString()}</span>
                    <button class="btn-pedido"
                        data-id="${prod._id}"
                        data-titulo="${prod.nombre}"
                        data-precio="${prod.precio}"
                        data-imagen="${prod.imagen}"
                        data-detalles="${prod.descripcion}">
                        Añadir al carrito 🛒
                    </button>
                </div>
            `;

      contenedorProductos.appendChild(tarjeta);
    });

    // Evento para los botones de agregar al carrito (conectado a 'carritoEcoa')
    document.querySelectorAll(".btn-pedido").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const producto = {
          id: btn.getAttribute("data-id"),
          titulo: btn.getAttribute("data-titulo"),
          precio: Number(btn.getAttribute("data-precio")),
          imagen: btn.getAttribute("data-imagen"),
          detalles: btn.getAttribute("data-detalles"),
          cantidad: 1
        };

        console.log("Producto a añadir:", producto);
        agregarAlCarritoEcoa(producto);
      });
    });

  } catch (error) {
    console.error("Error al cargar el catálogo desde la BD:", error);
  }
});

function agregarAlCarritoEcoa(producto) {
  let carrito = JSON.parse(localStorage.getItem("carritoEcoa")) || [];

  const index = carrito.findIndex(item => item.id === producto.id);
  if (index > -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carritoEcoa", JSON.stringify(carrito));
  alert(`${producto.titulo} se añadió al carrito con éxito! 🛒✨`);
}