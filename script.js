// Seleccionamos el botón hamburguesa y el menú por sus IDs
const btnMenu = document.getElementById('btn-menu');
const navMenu = document.getElementById('navmenu');

// Verificamos que ambos elementos existan antes de agregar el evento
if (btnMenu && navMenu) {
    btnMenu.addEventListener('click', () => {
        // Alterna la clase 'activo' cada vez que haces clic en el botón
        navMenu.classList.toggle('activo');
    });
}


// Seleccionamos el formulario de inicio de sesión
const formLogin = document.querySelector("form");

if (formLogin) {
    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault(); // Evita que la página se recargue automáticamente

        // Obtenemos los valores que escribió el usuario
        const correo = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        // Una validación simple
        if (correo === "" || password === "") {
            alert("Por favor, completa todos los campos.");
        } else {
            alert("¡Bienvenida de vuelta a Ecoa, " + correo + "!");

            // Aquí puedes redirigir al usuario a la página principal por ahora:
            window.location.href = "inicio.html";
        }
    });
}


// Contenido de añadir al carrito y enviar a WhatsApp
document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA ACTUAL: Añadir productos del catálogo al carrito
    const botonesAnadir = document.querySelectorAll('.btn-pedido');

    botonesAnadir.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');

            // Extraemos los datos de la tarjeta del producto
            const titulo = card.querySelector('h4').textContent;
            const imagen = card.querySelector('.img-productos').getAttribute('src');
            const precio = card.querySelector('.price').textContent;

            const producto = {
                titulo,
                imagen,
                precio,
                cantidad: 1
            };

            // Guardamos el producto en el carrito (usando localStorage)
            let carrito = JSON.parse(localStorage.getItem('carritoEcoa')) || [];

            // Verificamos si el producto ya estaba en el carrito para sumarle 1 en lugar de duplicarlo
            const index = carrito.findIndex(item => item.titulo === titulo);
            if (index > -1) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push(producto);
            }

            localStorage.setItem('carritoEcoa', JSON.stringify(carrito));

            // Mensaje visual rápido de confirmación
            alert(`¡"${titulo}" se ha añadido a tu carrito con éxito! 🌿`);
        });
    });


    // 2. NUEVA LÓGICA: Enviar el pedido completo de la página de carrito a WhatsApp
    const btnPagarWhatsApp = document.querySelector('.btn-pagar');

    if (btnPagarWhatsApp) {
        btnPagarWhatsApp.addEventListener('click', (e) => {
            e.preventDefault();

            let carrito = JSON.parse(localStorage.getItem('carritoEcoa')) || [];

            if (carrito.length === 0) {
                alert("Tu carrito está vacío. ¡Agrega algunos productos primero! 🌿");
                return;
            }
            const tuNumeroWhatsApp = "573007431586";

            let mensaje = "¡Hola, Ecoa! 🌿 Quiero hacer el siguiente pedido:\n\n";

            carrito.forEach((producto, index) => {
                mensaje += `${index + 1}. *${producto.titulo}*\n`;
                if (producto.detalles) {
                    mensaje += `   - ${producto.detalles}\n`;
                }
                mensaje += `   - Cantidad: ${producto.cantidad}\n`;
                mensaje += `   - Precio: ${producto.precio}\n\n`;
            });

            // Agrega la nota especial si el usuario escribió algo
            const notaCliente = document.querySelector('#nota')?.value;
            if (notaCliente) {
                mensaje += `📝 *Nota especial:* ${notaCliente}\n\n`;
            }

            mensaje += "¡Quedo atento/a para coordinar el pago y el envío! ✨";

            // Codificamos y abrimos el enlace de WhatsApp
            const mensajeCodificado = encodeURIComponent(mensaje);
            const urlWhatsApp = `https://wa.me/${tuNumeroWhatsApp}?text=${mensajeCodificado}`;

            window.open(urlWhatsApp, '_blank');
        });
    }

});