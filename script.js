// Seleccionamos el formulario de inicio de sesión
const formLogin = document.querySelector("form");

if (formLogin) {
    formLogin.addEventListener("submit", function(evento) {
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