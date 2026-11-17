
// --- LÓGICA DEL MENÚ DE NAVEGACIÓN Y HAMBURGUESA ---
document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const navMenu = document.getElementById("navmenu");

    // Verificamos que ambos elementos existan en la página actual antes de activar nada
    if (btnMenu && navMenu) {
        btnMenu.addEventListener("click", () => {
            // Alterna la clase 'activo' para mostrar u ocultar el menú en dispositivos móviles
            navMenu.classList.toggle("activo");
        });
    }
});