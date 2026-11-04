document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.querySelector('.carrito-productos');
    const subtotalElemento = document.querySelector('#subtotal-carrito');
    const envioElemento = document.querySelector('#envio-carrito');
    const totalElemento = document.querySelector('#total-carrito');
    const costoEnvio = 8000;

    if (!contenedorProductos || !subtotalElemento || !envioElemento || !totalElemento) {
        console.error('No se encontraron los elementos necesarios para mostrar el carrito.');
        return;
    }

    let carrito;
    try {
        carrito = JSON.parse(localStorage.getItem('carritoEcoa') || '[]');
    } catch (error) {
        console.error('No se pudo leer el carrito guardado.', error);
        contenedorProductos.textContent = 'No se pudo cargar el carrito. Revisa los datos guardados e inténtalo de nuevo.';
        return;
    }

    if (!Array.isArray(carrito)) {
        console.error('Los datos guardados del carrito no tienen el formato esperado.');
        contenedorProductos.textContent = 'No se pudo cargar el carrito. Revisa los datos guardados e inténtalo de nuevo.';
        return;
    }

    function obtenerPrecio(producto) {
        if (typeof producto.precio === 'number' && Number.isFinite(producto.precio)) {
            return Math.max(0, producto.precio);
        }

        const digitos = String(producto.precio ?? '').replace(/\D/g, '');
        return digitos ? Number(digitos) : 0;
    }

    function formatearPrecio(valor) {
        return `$ ${Math.round(valor).toLocaleString('es-CO')} COP`;
    }

    function guardarCarrito() {
        localStorage.setItem('carritoEcoa', JSON.stringify(carrito));
    }

    function actualizarResumen() {
        const subtotal = carrito.reduce((suma, producto) => {
            const cantidad = Number.isInteger(producto.cantidad) && producto.cantidad > 0
                ? producto.cantidad
                : 1;
            return suma + obtenerPrecio(producto) * cantidad;
        }, 0);
        const envio = carrito.length > 0 ? costoEnvio : 0;

        subtotalElemento.textContent = formatearPrecio(subtotal);
        envioElemento.textContent = formatearPrecio(envio);
        totalElemento.textContent = formatearPrecio(subtotal + envio);
    }

    function crearBoton(texto, accion, etiqueta) {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.textContent = texto;
        boton.setAttribute('aria-label', etiqueta);
        boton.dataset.accion = accion;
        return boton;
    }

    function mostrarCarrito() {
        contenedorProductos.replaceChildren();

        if (carrito.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'Tu carrito está vacío 🌿';
            mensaje.style.cssText = 'text-align:center; padding: 2rem;';
            contenedorProductos.append(mensaje);
            actualizarResumen();
            return;
        }

        carrito.forEach((producto, index) => {
            const cantidad = Number.isInteger(producto.cantidad) && producto.cantidad > 0
                ? producto.cantidad
                : 1;
            const item = document.createElement('div');
            item.className = 'item-carrito';

            if (producto.imagen) {
                const imagen = document.createElement('img');
                imagen.src = producto.imagen;
                imagen.alt = producto.titulo || 'Producto Ecoa';
                item.append(imagen);
            }

            const detalles = document.createElement('div');
            detalles.className = 'item-detalles';

            const titulo = document.createElement('h3');
            titulo.textContent = producto.titulo || 'Producto Ecoa';
            detalles.append(titulo);

            if (producto.detalles) {
                const descripcion = document.createElement('p');
                descripcion.textContent = producto.detalles;
                detalles.append(descripcion);
            }

            const precio = document.createElement('span');
            precio.className = 'precio';
            precio.textContent = formatearPrecio(obtenerPrecio(producto));
            detalles.append(precio);
            item.append(detalles);

            const controlesCantidad = document.createElement('div');
            controlesCantidad.className = 'item-cantidad';
            controlesCantidad.append(
                crearBoton('-', 'restar', `Restar una unidad de ${producto.titulo || 'producto'}`)
            );

            const textoCantidad = document.createElement('span');
            textoCantidad.textContent = String(cantidad);
            controlesCantidad.append(textoCantidad);
            controlesCantidad.append(
                crearBoton('+', 'sumar', `Agregar una unidad de ${producto.titulo || 'producto'}`)
            );
            item.append(controlesCantidad);

            const botonEliminar = crearBoton('🗑️', 'eliminar', `Eliminar ${producto.titulo || 'producto'}`);
            botonEliminar.className = 'btn-eliminar';
            item.append(botonEliminar);

            item.dataset.indice = String(index);
            contenedorProductos.append(item);
        });

        actualizarResumen();
    }

    contenedorProductos.addEventListener('click', (evento) => {
        const boton = evento.target.closest('button[data-accion]');
        if (!boton) {
            return;
        }

        const item = boton.closest('.item-carrito');
        const index = Number(item?.dataset.indice);
        if (!Number.isInteger(index) || !carrito[index]) {
            return;
        }

        const cantidadActual = Number.isInteger(carrito[index].cantidad) && carrito[index].cantidad > 0
            ? carrito[index].cantidad
            : 1;
        if (boton.dataset.accion === 'sumar') {
            carrito[index].cantidad = cantidadActual + 1;
        } else if (boton.dataset.accion === 'restar') {
            carrito[index].cantidad = Math.max(1, cantidadActual - 1);
        } else if (boton.dataset.accion === 'eliminar') {
            carrito.splice(index, 1);
        }

        guardarCarrito();
        mostrarCarrito();
    });

    mostrarCarrito();
});
