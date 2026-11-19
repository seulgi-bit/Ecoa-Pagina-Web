// FUNCIONALIDAD DEL FORMULARIO DE CONTACTO A WHATSAPP 
const formContacto = document.getElementById("formulario-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault(); 

    
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    
    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    //  Mi número de WhatsApp de Ecoa 
    const telefonoWhatsApp = "573007431586";

    
    const textoMensaje = `¡Hola, Ecoa! 🌿✨\n\n` +
      `Me comunico desde la sección de Contacto:\n` +
      `- *Nombre:* ${nombre}\n` +
      `- *Correo:* ${email}\n` +
      `- *Mensaje:* ${mensaje}`;

    
    const mensajeCodificado = encodeURIComponent(textoMensaje);

    
    const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, "_blank");
  });
}