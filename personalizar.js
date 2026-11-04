
console.log("El archivo de JavaScript está conectado correctamente.");
// 1. Declaramos TODAS las variables correctamente buscando sus ID del HTML
const selectFormato = document.getElementById('formato');
const selectTamaño = document.getElementById('tamaño');
const selecttipoPortada = document.getElementById('tipo-portada');
const selectGamaColorPortada = document.getElementById('gama-color-portada');
const selectMargenPortada = document.getElementById('margen-portada');
const selectPortadaAnimada = document.getElementById('portada-animada');
const selectTipoPapel = document.getElementById('tipo-papel');
const selectGamaColorHojas = document.getElementById('gama-color-hojas');
const selectHojas = document.getElementById('hojas');
const selectDecoracionHojas = document.getElementById('decoracion-hojas');
const selectEncuadernado = document.getElementById('encuadernado');
const selectAccesorioextra = document.getElementById('accesorio-extra');
const btnCotizar = document.getElementById('btn-cotizar');
const divResultado = document.getElementById('resultado-cotizacion');

// 2. Objeto con los precios
const precios = {
  formato: {
    horizontal: 5000,
    vertical: 2000,
    cuadrado: 9000,
    personalizado: 6000
  },
  tamaño: {
    A6: 5000,
    A5: 6000,
    B5: 8000,
    A4: 10000,
    personalizado: 15000
  },
  "tipo-Portada": {
    "tapa-dura": 8000,
    "tapa-flexible": 3000,
    tela: 10000,
    corcho: 8000
  },
  "gama-Color-Portada": {
    pastel: 2000,
    tierra: 3000,
    retro: 4500,
    vivos: 5500,
    neutros: 7000,
    personalizado: 5000
  },
  "margen-Portada": {
    "sin-margen": 0,
    botanico: 3000,
    vintage: 4000,
    geometrico: 2000,
    personalizado: 5000
  },
  "portada-Animada": {
    "original-ilustrada": 35000,
    "capas-3d": 25000,
    interactiva: 20000,
    minimalista: 10000,
    personalizado: 15500
  },

  "tipo-Papel": {
    "eco-cana": 2000,
    "reciclado-post": 1500,
    kraft: 2500,
    artesanal: 5500,
    "algodon-acuarela": 6500
  },
  "gama-Color-Hojas": {
    pastel: 1000,
    tierra: 1500,
    retro: 2200,
    vivos: 2000,
    neutros: 800,
    personalizado: 2500
  },

  hojas: {
    punteadas: 2000,
    rayadas: 500,
    lisas: 1000,
    cuadriculadas: 1500,
    organizadores: 4000,
    personalizado: 4500
  },
  "decoracion-Hojas": {
    ninguna: 0,
    botanico: 2000,
    envejecido: 1500,
    filigrana: 3000,
    petalos: 2500,
    personalizado: 4000
  },
  encuadernado: {
    cosido: 10000,
    pegado: 8000,
    argollado: 6000,
    personalizado: 12000
  },
  "accesorio-Extra": {
    ninguno: 0,
    elastico: 6000,
    marcapaginas: 1000,
    bolsillo: 1000,
    "cordon-vintage": 5000,
    personalizado: 8000
  },


};

// 3. Función para calcular el precio
function calcularPrecio() {

  // Obtenemos los valores seleccionados
  const formatoSeleccionado = selectFormato.value;
  const tamañoSeleccionado = selectTamaño.value;
  const tipoPortadaSeleccionado = selecttipoPortada.value;
  const gamaColorPortadaSeleccionada = selectGamaColorPortada.value;
  const margenPortadaSeleccionado = selectMargenPortada.value;
  const portadaAnimadaSeleccionada = selectPortadaAnimada.value;
  const tipoPapelSeleccionado = selectTipoPapel.value;
  const gamaColorHojasSeleccionada = selectGamaColorHojas.value;
  const hojasSeleccionadas = selectHojas.value;
  const decoracionHojasSeleccionada = selectDecoracionHojas.value;
  const encuadernadoSeleccionado = selectEncuadernado.value;
  const accesorioExtraSeleccionado = selectAccesorioextra.value;

  // Buscamos los costos en el objeto
  const costoFormato = precios.formato[formatoSeleccionado] || 0;
  const costoTamaño = precios.tamaño[tamañoSeleccionado] || 0;
  const costoTipoPortada = precios["tipo-Portada"][tipoPortadaSeleccionado] || 0;
  const costoGamaColorPortada = precios["gama-Color-Portada"][gamaColorPortadaSeleccionada] || 0;
  const costoMargenPortada = precios["margen-Portada"][margenPortadaSeleccionado] || 0;
  const costoPortadaAnimada = precios["portada-Animada"][portadaAnimadaSeleccionada] || 0;
  const costoTipoPapel = precios["tipo-Papel"][tipoPapelSeleccionado] || 0;
  const costoGamaColorHojas = precios["gama-Color-Hojas"][gamaColorHojasSeleccionada] || 0;
  const costoHojas = precios.hojas[hojasSeleccionadas] || 0;
  const costoDecoracionHojas = precios["decoracion-Hojas"][decoracionHojasSeleccionada] || 0;
  const costoEncuadernado = precios.encuadernado[encuadernadoSeleccionado] || 0;
  const costoAccesorioExtra = precios["accesorio-Extra"][accesorioExtraSeleccionado] || 0;

  // Sumamos todo
  const precioTotal = costoFormato + costoTamaño + costoTipoPortada +
    costoGamaColorPortada + costoMargenPortada + costoPortadaAnimada +
    costoTipoPapel + costoGamaColorHojas + costoHojas +
    costoDecoracionHojas + costoEncuadernado + costoAccesorioExtra;

  // Mostramos el resultado en pantalla
  divResultado.innerHTML = `
        <div style="background: #fdfbf7; padding: 15px; border-radius: 8px; border: 1px solid #dcd3c1;">
          <p style="font-weight: bold; color: #2d5a27; font-size: 1.1rem;">✨ Resumen de tu libreta Ecoa:</p>
          <ul style="margin: 10px 0; padding-left: 20px; color: #4a4a4a; line-height: 1.6;">
            <li>Formato: <strong>${formatoSeleccionado}</strong></li>
            <li>Tamaño: <strong>${tamañoSeleccionado}</strong></li>
            <li>Tipo de Portada: <strong>${tipoPortadaSeleccionado}</strong></li>
            <li>Gama Color Portada: <strong>${gamaColorPortadaSeleccionada}</strong></li>
            <li>Margen Portada: <strong>${margenPortadaSeleccionado}</strong></li>
            <li>Portada Animada: <strong>${portadaAnimadaSeleccionada}</strong></li>
            <li>Tipo de Papel: <strong>${tipoPapelSeleccionado}</strong></li>
            <li>Gama Color Hojas: <strong>${gamaColorHojasSeleccionada}</strong></li>
            <li>Diseño de Hojas: <strong>${hojasSeleccionadas}</strong></li>
            <li>Decoración de Hojas: <strong>${decoracionHojasSeleccionada}</strong></li>
            <li>Encuadernado: <strong>${encuadernadoSeleccionado}</strong></li>
            <li>Accesorio Extra: <strong>${accesorioExtraSeleccionado}</strong></li>
          </ul>
          <p style="font-size: 1.3rem; color: #a0522d; font-weight: bold; margin-top: 15px; text-align: right;">
            Precio estimado total: $${precioTotal.toLocaleString()} COP
          </p>
        </div>
    `;
  return precioTotal;
}

// 4. Asignamos el evento de clic al botón
if (btnCotizar) {
  btnCotizar.addEventListener('click', calcularPrecio);
}

const btnAgregarCarrito = document.getElementById('btn-agregar-carrito');
if (btnAgregarCarrito) {
  btnAgregarCarrito.addEventListener('click', () => {
    const precio = calcularPrecio();
    const opciones = [
      ['Formato', selectFormato],
      ['Tamaño', selectTamaño],
      ['Portada', selecttipoPortada],
      ['Color de portada', selectGamaColorPortada],
      ['Margen', selectMargenPortada],
      ['Ilustración', selectPortadaAnimada],
      ['Papel', selectTipoPapel],
      ['Color de hojas', selectGamaColorHojas],
      ['Hojas', selectHojas],
      ['Decoración', selectDecoracionHojas],
      ['Encuadernado', selectEncuadernado],
      ['Accesorio', selectAccesorioextra]
    ];
    const configuracion = opciones.map(([, selector]) => selector.value);
    const detalles = opciones
      .map(([nombre, selector]) => `${nombre}: ${selector.selectedOptions[0].textContent.trim()}`)
      .join(' | ');

    let carrito;
    try {
      carrito = JSON.parse(localStorage.getItem('carritoEcoa') || '[]');
    } catch (error) {
      console.error('No se pudo leer el carrito guardado.', error);
      alert('No se pudo cargar el carrito. Inténtalo de nuevo.');
      return;
    }

    if (!Array.isArray(carrito)) {
      console.error('Los datos guardados del carrito no tienen el formato esperado.');
      alert('No se pudo cargar el carrito. Revisa los datos guardados e inténtalo de nuevo.');
      return;
    }

    const id = `personalizada-${configuracion.join('|')}`;
    const existente = carrito.find(producto => producto.id === id);
    if (existente) {
      existente.cantidad = (Number(existente.cantidad) || 1) + 1;
    } else {
      carrito.push({
        id,
        titulo: 'Libreta personalizada Ecoa',
        imagen: './assets/img/logocompleto.jpeg',
        precio,
        detalles,
        cantidad: 1
      });
    }

    localStorage.setItem('carritoEcoa', JSON.stringify(carrito));
    window.location.href = 'carrito.html';
  });
}
