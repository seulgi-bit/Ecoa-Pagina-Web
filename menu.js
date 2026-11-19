
//  LÓGICA DEL MENÚ DE NAVEGACIÓN Y HAMBURGUESA 
document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const navMenu = document.getElementById("navmenu");

    
    if (btnMenu && navMenu) {
        btnMenu.addEventListener("click", () => {
           
            navMenu.classList.toggle("activo");
        });
    }
});