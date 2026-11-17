// --- LÓGICA DE REGISTRO DE NUEVOS USUARIOS ---
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector("form");

    if (formRegistro) {
        formRegistro.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Evita que la página se recargue

            // 1. Capturamos los valores que el usuario escribió en el formulario
            // (Asegúrate de que tus inputs tengan estos id o búscalos por selector)
            const nombreInput = document.getElementById("nombre") || document.querySelector("input[type='text']");
            const correoInput = document.getElementById("email") || document.querySelector("input[type='email']");
            const passwordInput = document.getElementById("password") || document.querySelector("input[type='password']");

            const nombre = nombreInput ? nombreInput.value.trim() : "";
            const correo = correoInput ? correoInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value.trim() : "";

            // 2. Validamos que no queden campos vacíos
            if (!nombre || !correo || !password) {
                alert("Por favor, completa todos los campos para registrarte.");
                return;
            }

            // 3. Creamos un objeto con los datos del nuevo usuario
            const nuevoUsuario = {
                nombre: nombre,
                correo: correo,
                password: password
            };

            // 4. Guardamos el usuario en el localStorage (simulando tu base de datos local)
            localStorage.setItem("usuarioEcoa", JSON.stringify(nuevoUsuario));

            // 5. Mensaje de éxito y redirección automática al login
            alert("¡Registro exitoso, " + nombre + "! 🌿✨ Ya puedes iniciar sesión.");
            window.location.href = "login.html";
        });
    }
});