document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Evita que la página se recargue por defecto
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const mensajeError = document.getElementById('mensajeError');

    // Datos simulados de prueba (aquí puedes poner tu propio correo)
    const correoCorrecto = "admin@ecoa.com";
    const passwordCorrecta = "123456";

    if (emailInput === correoCorrecto && passwordInput === passwordCorrecta) {
        alert('¡Inicio de sesión exitoso! Bienvenido a Ecoa.');
        // Aquí podrías redirigir a otra página, por ejemplo:
        // window.location.href = "inicio.html";
    } else {
        mensajeError.textContent = "Correo o contraseña incorrectos. Inténtalo de nuevo.";
    }
});