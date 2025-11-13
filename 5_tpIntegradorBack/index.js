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


/*===================
    Middlewares
====================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body

app.use(loggerUrl); // Aplicamos el middleware loggerUrl



/*======================
    Rutas
======================*/
// Gracias al middleware Router, todas las peticiones (get, post, put, delete) directamente van al modulo productRoutes que se encargan de manejarlas
app.use("/api/products", productRoutes); 



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});