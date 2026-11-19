// Nuevos usuarios
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector("form");

    if (formRegistro) {
        formRegistro.addEventListener("submit", async function (evento) {
            evento.preventDefault(); 

            
            const nombreInput = document.getElementById("nombre") || document.querySelector("input[type='text']");
            const correoInput = document.getElementById("email") || document.querySelector("input[type='email']");
            const passwordInput = document.getElementById("password") || document.querySelector("input[type='password']");

            const nombre = nombreInput ? nombreInput.value.trim() : "";
            const correo = correoInput ? correoInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value.trim() : "";

            
            if (!nombre || !email || !password) {
                alert("Por favor, completa todos los campos para registrarte.");
                return;
            }

           
            const nuevoUsuario = {
                nombre: nombre,
                email: correo,
                password: password
            };

            
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
                
                alert(`¡Registro exitoso, ${nombre}! 🌿 Ya puedes iniciar sesión.`);
                window.location.href = "login.html";
            } else {
              
                alert(`Error: ${resultado.mensaje}`);
            }

        } catch (error) {
            console.error('Error de conexión con el servidor:', error);
            alert('No se pudo conectar con el servidor. Revisa que esté encendido.');
        }
        });
    }
});