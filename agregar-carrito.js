//Añadir productos al carrito desde el catálogo 
document.addEventListener('DOMContentLoaded', () => {
    const botonesAnadir = document.querySelectorAll('.btn-pedido');

    botonesAnadir.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (!card) return;

            const titulo = card.querySelector('h4').textContent;
            const imagen = card.querySelector('.img-productos').getAttribute('src');
            const precio = card.querySelector('.price').textContent;

            const producto = {
                titulo,
                imagen,
                precio,
                cantidad: 1
            };

            let carrito = JSON.parse(localStorage.getItem('carritoEcoa')) || [];

            const index = carrito.findIndex(item => item.titulo === titulo);
            if (index > -1) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push(producto);
            }

            
            if (localStorage.getItem('sesionActiva') === 'true') {
                localStorage.setItem('carritoEcoa', JSON.stringify(carrito));
            }

            alert(`¡"${titulo}" se ha añadido a tu carrito con éxito! 🌿`);
        });
    });
});