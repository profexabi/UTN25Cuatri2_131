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
=====================
- Los middlewares son basicamente funciones que se ejecutan entre la peticion req y la respuesta res

- La idea de los middlewares es no repetir instrucciones por cada endpoint

- Estos son middlewares de aplicacion -> se aplican a todas las peticiones
*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body

app.use(loggerUrl); // Aplicamos el middleware loggerUrl



/*======================
    Rutas
======================*/
app.use("/api/products", productRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});