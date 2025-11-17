/*======================
    Importaciones
======================*/
import express from "express"; // Importamos el framework Express
const app = express(); // Inicializamos express en la variable app, que contendra todos los metodos

import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno
const PORT = environments.port;

import cors from "cors"; // Importamos el modulo CORS

// Importamos los middlewares
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 

// Importamos las rutas de producto
import { productRoutes } from "./src/api/routes/index.js";

// Incorporamos la configuracion en el index.js
import { __dirname, join } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";


/*===================
    Middlewares
====================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body

app.use(loggerUrl); // Aplicamos el middleware loggerUrl

// Middleware para servir archivos estaticos (img, css, js)
app.use(express.static(join(__dirname, "src/public"))); // Nuestros archivos estaticos se serviran desde la carpeta public



/*================
    Config
================*/
// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views")); // Nuestras vistas se serviran desde la carpeta public



/*======================
    Rutas
======================*/
// Gracias al middleware Router, todas las peticiones (get, post, put, delete) directamente van al modulo productRoutes que se encargan de manejarlas
app.use("/api/products", productRoutes);

// TO DO -> Crear vista TP Integrador y terminar vistas EJS

// TODO -> Modularizar despues!
app.get("/dashboard", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM products");
        console.log(rows);

        res.render("index", {
            title: "Dashboard",
            about:"Listado principal",
            productos: rows
        });

    } catch (error) {
        console.error(error);
    }
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});