// --- FUNCIONALIDAD DEL FORMULARIO DE CONTACTO A WHATSAPP ---
const formContacto = document.getElementById("formulario contacto");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Captura los valores de los inputs usando sus IDs
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // 2. Validación rápida para asegurar que no vayan vacíos
    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    // 3. Mi número de WhatsApp de Ecoa 
    const telefonoWhatsApp = "573007431586";//mi numero//

    // 4. Armamos el mensaje ordenado para WhatsApp
    const textoMensaje = `¡Hola, Ecoa! 🌿✨\n\n` +
      `Me comunico desde la sección de Contacto:\n` +
      `• *Nombre:* ${nombre}\n` +
      `• *Correo:* ${email}\n` +
      `• *Mensaje:* ${mensaje}`;

    // 5. Para codificamos el texto para la URL
    const mensajeCodificado = encodeURIComponent(textoMensaje);

    // 6. Para Abrir WhatsApp en una nueva pestaña
    const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, "_blank");
  });
}