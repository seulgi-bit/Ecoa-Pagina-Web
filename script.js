// Seleccionamos los elementos del formulario por su ID
const selectTamaño = document.getElementById('tamaño');
const selectHojas = document.getElementById('hojas');
const selectencuadernado = document.getElementById('encuadernado');
const btnCotizar = document.getElementById('btn-cotizar');
const divResultado = document.getElementById('resultado-cotizacion');

const precios = {
  tamaños:{
    A6:10000,
    A5:15000,
    A4:22000
  },
  hojas: {
    punteadas: 3000,
    rayadas: 1500,
    lisas: 1000,
    cuadriculadas: 2500
  },
  encuadernado: {
    cosido: 6000,
    argollado:5000,
    grapado: 4000
  }
};

function calcularPrecio(){

  const tamañoSeleccionado = selectTamaño.value;
  const hojasSeleccionadas = selectHojas.value;
  const encuadernadoSeleccionado = selectEncuadernado.value;

  const costoTamaño = precios.tamaños[tamañoSeleccionado];
  const costoHojas = precios.hojas[hojasSeleccionadas];
  const costoEncuadernado = precios.encuadernado[encuadernadoSeleccionado];

const precioTotal = costoTamaño + costoHojas + costoEncuadernado;

divresultado.innerHTML =`
<p> Tu libreta <strong>Ecoa</strong> personalizada:</p>
        <p style="margin: 5px 0; color: #2d5a27;">Tamaño: ${tamanoSeleccionado.toUpperCase()} | Hojas: ${hojasSeleccionadas} | Acabado: ${acabadoSeleccionado}</p>
        <p style="font-size: 1.2rem; color: #a0522d;">Precio estimado: $${precioTotal.toLocaleString()} COP</p>
    `;
}
btnCotizar.addEventListener('click', calcularPrecio);