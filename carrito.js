// --- LÓGICA EXCLUSIVA: Mostrar y gestionar la tabla del carrito y WhatsApp ---
document.addEventListener('DOMContentLoaded', () => {

    const contenedorProductos = document.querySelector('.carrito-productos') || document.querySelector('.carrito-contenido');
    const subtotalElemento = document.querySelector('#subtotal-carrito');
    const envioElemento = document.querySelector('#envio-carrito');
    const totalElemento = document.querySelector('#total-carrito');
    const costoEnvio = 8000;

    if (!contenedorProductos) {
        return;
    }

    let carrito;
    try {
        carrito = JSON.parse(localStorage.getItem('carritoEcoa')) || [];
    } catch (error) {
        console.error('No se pudo leer el carrito guardado.', error);
        contenedorProductos.textContent = 'No se pudo cargar el carrito. Revisa los datos guardados e inténtalo de nuevo.';
        return;
    }

    if (!Array.isArray(carrito)) {
        carrito = [];
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
        const sesionActiva = localStorage.getItem('sesionActiva');
        if (sesionActiva === 'true') {
            localStorage.setItem('carritoEcoa', JSON.stringify(carrito));
        }
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

            const controlesCantidad = document.createElement('div');
            controlesCantidad.className = 'item-cantidad';

            controlesCantidad.append(crearBoton('-', 'restar', `Restar una unidad de ${producto.titulo || 'producto'}`));

            const textoCantidad = document.createElement('span');
            textoCantidad.textContent = String(cantidad);
            controlesCantidad.append(textoCantidad);

            controlesCantidad.append(crearBoton('+', 'sumar', `Agregar una unidad de ${producto.titulo || 'producto'}`));

            detalles.append(controlesCantidad);
            item.append(detalles);

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
        if (!boton) return;

        const itemElement = boton.closest('.item-carrito');
        if (!itemElement) return;

        const index = Number(itemElement.dataset.indice);
        if (!Number.isInteger(index) || !carrito[index]) return;

        const accion = boton.dataset.accion;

        if (accion === 'sumar') {
            carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
        } else if (accion === 'restar') {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad -= 1;
            }
        } else if (accion === 'eliminar') {
            // Borramos el elemento del arreglo localmente
            carrito.splice(index, 1);
        }

        // Guardamos inmediatamente el nuevo estado en el navegador
        localStorage.setItem("carritoEcoa", JSON.stringify(carrito));

        // Volvemos a pintar el carrito actualizado en pantalla
        mostrarCarrito();
    });

    mostrarCarrito();

    // Botón de pago por WhatsApp dentro de la página del carrito
    const btnPagarWhatsApp = document.querySelector('.btn-pagar');

    if (btnPagarWhatsApp) {
        btnPagarWhatsApp.addEventListener('click', (e) => {
            e.preventDefault();

            let carritoActual = JSON.parse(localStorage.getItem('carritoEcoa')) || [];

            if (carritoActual.length === 0) {
                alert('Tu carrito está vacío. ¡Agrega algunos productos primero! 🌿');
                return;
            }

            const tuNumeroWhatsApp = '573007431586';
            let mensaje = '¡Hola, Ecoa! 🌿✨ Quiero hacer el siguiente pedido:\n\n';

            carritoActual.forEach((producto, index) => {
                mensaje += `${index + 1}. *${producto.titulo}*\n`;
                if (producto.detalles) {
                    mensaje += `   - ${producto.detalles}\n`;
                }
                mensaje += `   - Cantidad: ${producto.cantidad}\n`;
                mensaje += `   - Precio: ${producto.precio}\n\n`;
            });

            const notaCliente = document.querySelector('#nota');
            if (notaCliente && notaCliente.value.trim() !== '') {
                mensaje += `📝 *Nota especial:* ${notaCliente.value.trim()}\n\n`;
            }

            mensaje += '¡Quedo atento/a para coordinar el pago y el envío! 🚚✨';

            const mensajeCodificado = encodeURIComponent(mensaje);
            const urlWhatsApp = `https://wa.me/${tuNumeroWhatsApp}?text=${mensajeCodificado}`;

            window.open(urlWhatsApp, '_blank');
        });
    }
});