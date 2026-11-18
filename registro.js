// --- LÓGICA DE REGISTRO DE NUEVOS USUARIOS ---
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector("form");

    if (formRegistro) {
        formRegistro.addEventListener("submit", async function (evento) {
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
            if (!nombre || !email || !password) {
                alert("Por favor, completa todos los campos para registrarte.");
                return;
            }

            // 3. Creamos un objeto con los datos del nuevo usuario
            const nuevoUsuario = {
                nombre: nombre,
                email: correo,
                password: password
            };

            // --- 4. ENVIAR LOS DATOS AL SERVIDOR Y A MONGODB ---
        try {
            const respuesta = await fetch('http://localhost:1111/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email : correo, password })
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                // Mensaje de éxito y redirección automática al login
                alert(`¡Registro exitoso, ${nombre}! 🌿 Ya puedes iniciar sesión.`);
                window.location.href = "login.html";
            } else {
                // Si el correo ya existe o hubo un error del servidor
                alert(`Error: ${resultado.mensaje}`);
            }

        } catch (error) {
            console.error('Error de conexión con el servidor:', error);
            alert('No se pudo conectar con el servidor. Revisa que esté encendido.');
        }
        });
    }
});