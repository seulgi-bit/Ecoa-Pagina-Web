require('dotenv').config();
const mongoose = require('mongoose');
const Catalogo = require('./modelos/catalogo');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Conectado a MongoDB para migrar el catálogo...");

    const productosHTML = [
      {
        nombre: "Tamaño A6",
        descripcion: "Bolsillo / 10.5 x 14.8 cm Pequeña, compacta, pensada para llevar siempre encima y anotar ideas rápidas.",
        precio: 10000,
        imagen: "./assets/img/libretabolsillo_A6.png",
        stock: 10
      },
      {
        nombre: "Tamaño A5",
        descripcion: "Mediano / 14.8 x 21 cm El rey indiscutible. Es el equilibrio perfecto entre espacio para escribir y portabilidad.",
        precio: 15000,
        imagen: "./assets/img/libreta-A5.png",
        stock: 12
      },
      {
        nombre: "Sketchbook Eco",
        descripcion: "15 x 15 cm Hojas gruesas especiales para dibujo y bocetos.",
        precio: 20000,
        imagen: "./assets/img/sketchbook.png",
        stock: 8
      },
      {
        nombre: "Formato Cuadrado",
        descripcion: "20 x 20 cm Muy atractiva visualmente, popular para diarios de viaje, álbumes de fotos o cuadernos de dibujo.",
        precio: 20000,
        imagen: "./assets/img/libretacuadrada.jfif",
        stock: 5
      },
      {
        nombre: "Tamaño B5",
        descripcion: "Universitario / 17.6 x 25 cm Más grande, muy buscada por estudiantes universitarios o profesionales.",
        precio: 25000,
        imagen: "./assets/img/libretauniversitaria.jfif",
        stock: 15
      },
      {
        nombre: "Formato Horizontal",
        descripcion: "Dibujo y Bocetos / 29.7 cm x 21 cm Ideal para creativos y diseñadores.",
        precio: 30000,
        imagen: "./assets/img/libretaapaisada.jfif",
        stock: 7
      },
      {
        nombre: "Nueva Libreta Tradicional EcoChina",
        descripcion: "Diseño exclusivo de temporada año nuevo chino.",
        precio: 40000,
        imagen: "./assets/img/libretachina.jfif",
        caracteristicas: {
          tamano: "14.5 cm de ancho x 21 cm de alto (Formato A5).",
          materiales: [
            "200 paginas de papel de algodon reciclado.",
            "Carton rigido interior hecho de carton 100% reciclado prensado.",
            "Pegamentos a base de agua biodegradables y tintas ecologicas."
          ],
          diseno: "Estilo tradicional inspirado en la cultura china."
        },
        stock: 15
      },
      {
        nombre: "Nueva Libreta Tradicional EcoChina",
        descripcion: "Diseño exclusivo de temporada año nuevo chino.",
        precio: 35000,
        imagen: "./assets/img/templochino.jpg",
        caracteristicas: {
          tamano: "20cm x 20cm (Formato cuadrado).",
          materiales: [
            "100 paginas de papel de algodon reciclado.",
            "Carton rigido interior hecho de carton 100% reciclado prensado.",
            "Cosido hacia afuera con hilo encerado negro."
          ],
          diseno: "Estilo tradicional inspirado en la cultura china."
        },
        stock: 20
      },
       {
        nombre: "Nueva Libreta Econavideño",
        descripcion: "Diseño exclusivo de fin de año",
        precio: 50000,
        imagen: "./assets/img/econavideño.jpg",
        caracteristicas: {
          tamano: "14,8 × 21 cm(Formato A5).",
          materiales: [
            "80 paginas de colores de navidad, 20 de cada color .",
            "Carton rigido interior forrado en tela lino color veige.",
            "Cosido a mano con hilo de algodon y pegado."
          ],
          diseno: "Estilo especial navideño."
        },
        stock: 35
      },
      {
        nombre: "Nueva Libreta Ecoa",
        descripcion: "Diseño exclusivo de ecoa",
        precio: 50000,
        imagen: "./assets/img/originalecoa.jpg",
        caracteristicas: {
          tamano: "21 cm de base x 17 cm dos lados(Formato triangular).",
          materiales: [
            "60 paginas papel reciclado color kraft.",
            "Carton rigido interior forrado en tela lino roja con detalles de hojas y un colibri.",
            "Cosido a mano con hilo de algodon y pegado."
          ],
          diseno: "Estilo diseño original ecoa."
        },
        stock: 25
      },
       {
        nombre: "Nueva Libreta Ecoa",
        descripcion: "Diseño exclusivo astrologico",
        precio: 57000,
        imagen: "./assets/img/estrellaecoa.jpg",
        caracteristicas: {
          tamano: "18 cm de punta a punta x 6cm d elargo cada punta(Formato estrella).",
          materiales: [
            "60 paginas papel reciclado color negro.",
            "Carton rigido interior forrado en tilustracion de cielo nocturno.",
            "Cosido a mano con hilo de algodon y pegado."
          ],
          diseno: "Estilo diseño original ecoa."
        },
        stock: 20
      },
      {
        nombre: "Nueva Libreta Ecocute",
        descripcion: "Diseño para journaling",
        precio: 40000,
        imagen: "./assets/img/cuteecoa.jpg",
        caracteristicas: {
          tamano: "14.8 cm x 21 cm(Formato A5).",
          materiales: [
            "96 paginas papel reciclado color veige.",
            "Carton rigido interior forrado en tela rosa pastle con dettales bordadod",
            "Cosido a mano con hilo de algodon y pegado.",
          ],
          diseno: "Estilo diseño original ecoa."
        },
        stock: 45
      }
    ];

    await Catalogo.deleteMany({});
    await Catalogo.insertMany(productosHTML);

    console.log("✨ ¡Catálogo migrado a MongoDB Atlas con éxito! 🌿");
    mongoose.connection.close();
  })
  .catch(err => console.error("Error al conectar:", err));