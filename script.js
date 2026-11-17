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



