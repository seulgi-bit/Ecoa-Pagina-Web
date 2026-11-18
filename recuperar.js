document.addEventListener("DOMContentLoaded", () => {
  const formRecuperar = document.getElementById("recuperarForm");
  const mensajeEstado = document.getElementById("mensajeEstado");

  if (formRecuperar) {
    formRecuperar.addEventListener("submit", async function (evento) {
      evento.preventDefault();

      const email = document.getElementById("email").value.trim();

      if (email === "") {
        mensajeEstado.textContent = "Por favor, ingresa tu correo electrónico.";
        mensajeEstado.style.color = "#d9534f";
        return;
      }

      // Aquí puedes conectar más adelante con tu backend si creas una ruta /api/recuperar
      mensajeEstado.textContent = "¡Listo! Si el correo está registrado, enviaremos las instrucciones.";
      mensajeEstado.style.color = "#ffffff";

      // Limpiamos el campo después de unos segundos o simulamos el proceso
      setTimeout(() => {
        formRecuperar.reset();
      }, 3000);
    });
  }
});