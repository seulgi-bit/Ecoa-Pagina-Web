// --- LÓGICA DE INICIO DE SESIÓN SEGURO ---
document.addEventListener("DOMContentLoaded", () => {
    // Buscamos el formulario de login (ya sea por ID 'loginForm' o por etiqueta 'form')
    const formLogin = document.getElementById("loginForm") || document.querySelector("form");
    const mensajeError = document.getElementById("mensajeError");

    if (formLogin) {
        formLogin.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Evita que la página se recargue

            // 1. Obtenemos lo que el usuario escribió
            const correo = document.getElementById("email") 
                           ? document.getElementById("email").value.trim() 
                           : document.querySelector("input[type='email']").value.trim();
                           
            const password = document.getElementById("password") 
                             ? document.getElementById("password").value.trim() 
                             : document.querySelector("input[type='password']").value.trim();

            // 2. Validamos que no estén vacíos
            if (correo === "" || password === "") {
                if (mensajeError) {
                    mensajeError.textContent = "Por favor, completa todos los campos.";
                } else {
                    alert("Por favor, completa todos los campos.");
                }
                return;
            }

            // 3. Buscamos el usuario registrado en la "base de datos" local (localStorage)
            const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioEcoa"));

            // 4. Verificamos si existe un registro previo
            if (!usuarioRegistrado) {
                if (mensajeError) {
                    mensajeError.textContent = "No hay cuentas registradas. Por favor, regístrate.";
                } else {
                    alert("❌ No hay ninguna cuenta registrada. Regístrate primero.");
                }
                return;
            }

            // 5. Comparamos los datos ingresados con los guardados
            if (correo === usuarioRegistrado.correo && password === usuarioRegistrado.password) {
                alert("¡Bienvenida de vuelta a Ecoa, " + usuarioRegistrado.nombre + "! 🌿✨");
                
                // Guardamos el estado de sesión activa
                localStorage.setItem("sesionActiva", "true");

                // Redirigimos a la página de inicio
                window.location.href = "inicio.html";
            } else {
                if (mensajeError) {
                    mensajeError.textContent = "Correo o contraseña incorrectos. Inténtalo de nuevo.";
                } else {
                    alert("❌ Error: Correo o contraseña incorrectos.");
                }
            }
        });
    }
});
// --- LÓGICA DE INICIO DE SESIÓN RECONOCIENDO CUENTAS ---
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("loginForm") || document.querySelector("form");
    const mensajeError = document.getElementById("mensajeError");

    if (formLogin) {
        formLogin.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const correo = document.getElementById("email") 
                           ? document.getElementById("email").value.trim() 
                           : document.querySelector("input[type='email']").value.trim();
                           
            const password = document.getElementById("password") 
                             ? document.getElementById("password").value.trim() 
                             : document.querySelector("input[type='password']").value.trim();

            if (correo === "" || password === "") {
                if (mensajeError) {
                    mensajeError.textContent = "Por favor, completa todos los campos.";
                } else {
                    alert("Por favor, completa todos los campos.");
                }
                return;
            }

            // Buscamos si hay un usuario guardado en el navegador
            const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioEcoa"));

            // 1. Si no existe ninguna cuenta registrada
            if (!usuarioRegistrado) {
                if (mensajeError) {
                    mensajeError.textContent = "No hay cuentas registradas. Por favor, regístrate.";
                } else {
                    alert("❌ No hay ninguna cuenta registrada. Regístrate primero.");
                }
                return;
            }

            // 2. Verificamos si los datos coinciden con los del registro
            if (correo === usuarioRegistrado.correo && password === usuarioRegistrado.password) {
                alert("¡Bienvenida de vuelta a Ecoa, " + usuarioRegistrado.nombre + "! 🌿✨");
                
                // Activamos la sesión (esto también le dice a tu carrito que ya puede guardar datos)
                localStorage.setItem("sesionActiva", "true");

                // Redirigimos al inicio
                window.location.href = "inicio.html";
            } else {
                if (mensajeError) {
                    mensajeError.textContent = "Correo o contraseña incorrectos.";
                } else {
                    alert("❌ Error: Correo o contraseña incorrectos.");
                }
            }
        });
    }
});