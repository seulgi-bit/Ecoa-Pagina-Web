document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("loginForm") || document.querySelector("form");
    const mensajeError = document.getElementById("mensajeError");

    if (formLogin) {
        formLogin.addEventListener("submit", async function (evento) {
            evento.preventDefault(); 

            
            const correo = document.getElementById("email")?.value.trim()
                || document.querySelector("input[type='email']").value.trim();

            const password = document.getElementById("password")?.value.trim()
                || document.querySelector("input[type='password']").value.trim();

           
            if (correo === "" || password === "") {
                if (mensajeError) {
                    mensajeError.textContent = "Por favor, completa todos los campos.";
                } else {
                    alert("Por favor, completa todos los campos.");
                }
                return;
            }

            try {
                
                const respuesta = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: correo, password })
                });

                const datos = await respuesta.json();

                if (respuesta.ok) {
                    const nombreUsuario = datos.usuario?.nombre || datos.nombre || correo;
                    const datosUsuario = datos.usuario || {
                        nombre: nombreUsuario,
                        email: correo
                    };

                    alert(`¡Bienvenida de vuelta a Ecoa, ${datos.nombre} ! 🌿✨`);
                    localStorage.setItem("sesionActiva", "true");
                    localStorage.setItem("usuarioEcoa", JSON.stringify(datosUsuario));

                   
                    window.location.href = "inicio.html";
                } else {
                   
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
