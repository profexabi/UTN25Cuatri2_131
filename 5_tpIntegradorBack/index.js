/*======================
    Importaciones
======================*/
import express from "express"; // Importamos el framework Express
const app = express(); // Inicializamos express en la variable app, que contendra todos los metodos

import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno
const PORT = environments.port;
const session_key = environments.session_key;

import cors from "cors"; // Importamos el modulo CORS

// Importamos los middlewares
import { loggerUrl } from "./src/api/middlewares/middlewares.js"; 

// Importamos las rutas de producto
import { productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";

// Incorporamos la configuracion en el index.js
import { __dirname, join } from "./src/api/utils/index.js";

import session from "express-session";


/*===================
    Middlewares
====================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes

// Middleware para parsear las solicitudes POST y PUT que envian JSON en el body
app.use(express.json());

// Middleware para parsear las solicitudes POST que enviamos desde el <form> HTML
app.use(express.urlencoded({ extended: true }));

app.use(loggerUrl); // Aplicamos el middleware loggerUrl

// Middleware para servir archivos estaticos (img, css, js)
app.use(express.static(join(__dirname, "src/public"))); // Nuestros archivos estaticos se serviran desde la carpeta public



/*================
    Config
================*/
// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views")); // Nuestras vistas se serviran desde la carpeta public

// Middleware de sesion 
app.use(session({
    secret: session_key, // Esto firma las cookies para evitar manipulacion
    resave: false, // Esto evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarde sesiones vacias
}));


/* TO DO: 
    1. Crear la vista del login con un <form> que manda los datos a un
    2. Endpoint /login que recibe estos datos y redireciona
    3. Integrar las redirecciones en view.routes.js
    4. Añadiremos el boton en el <nav> para poder hacer una solicitud al
    5. Endpoint /logout para salir del login

*/

/*======================
    Rutas
======================*/
// Rutas producto
app.use("/api/products", productRoutes);

// Rutas vista
app.use("/", viewRoutes);

// Rutas usuario
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});