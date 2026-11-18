document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("loginForm") || document.querySelector("form");
    const mensajeError = document.getElementById("mensajeError");

    if (formLogin) {
        formLogin.addEventListener("submit", async function (evento) {
            evento.preventDefault(); // Evita que la página se recargue

            // Obtenemos el correo y la contraseña ingresados
            const correo = document.getElementById("email")?.value.trim() 
                        || document.querySelector("input[type='email']").value.trim();
            
            const password = document.getElementById("password")?.value.trim() 
                          || document.querySelector("input[type='password']").value.trim();

            // Validamos que no estén vacíos
            if (correo === "" || password === "") {
                if (mensajeError) {
                    mensajeError.textContent = "Por favor, completa todos los campos.";
                } else {
                    alert("Por favor, completa todos los campos.");
                }
                return;
            }

            try {
                // Hacemos la petición fetch al servidor backend
                const respuesta = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ correo, password })
                });

                const datos = await respuesta.json();

                if (respuesta.ok) {
                    // Si el login es exitoso
                    alert(`¡Bienvenida de vuelta a Ecoa, ${datos.nombre} ! 🌿✨`);
                    localStorage.setItem("sesionActiva", "true");
                    
                    // Redirigimos a la página de inicio
                    window.location.href = "inicio.html";
                } else {
                    // Si el correo o contraseña son incorrectos
                    if (mensajeError) {
                        mensajeError.textContent = datos.mensaje || "Correo o contraseña incorrectos.";
                    } else {
                        alert(datos.mensaje || "Correo o contraseña incorrectos.");
                    }
                }

            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                if (mensajeError) {
                    mensajeError.textContent = "No se pudo conectar con el servidor. Revisa que esté encendido.";
                } else {
                    alert("No se pudo conectar con el servidor.");
                }
            }
        });
    }
});
        