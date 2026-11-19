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

      
      mensajeEstado.textContent = "¡Listo! Si el correo está registrado, enviaremos las instrucciones.";
      mensajeEstado.style.color = "#ffffff";

      
      setTimeout(() => {
        formRecuperar.reset();
      }, 3000);
    });
  }
});