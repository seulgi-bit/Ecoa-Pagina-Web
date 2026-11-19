require('dotenv').config();
const mongoose = require('mongoose');
const Catalogo = require('./modelos/catalogo');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Conectado a MongoDB para migrar el catálogo...");
    // Mis productos
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
      }
    ];

   
    await Catalogo.deleteMany({});
    await Catalogo.insertMany(productosHTML);

    console.log("✨ ¡Catálogo migrado a MongoDB Atlas con éxito! 🌿");
    mongoose.connection.close();
  })
  .catch(err => console.error("Error al conectar:", err));