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
import connection from "./src/api/database/db.js";

import bcrypt from "bcrypt";


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

// TO DO, modularizar
// Creamos el endpoint que recibe los datos que enviamos del <form> del login.ejs
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; // Recibimos el email y el password

        // Optimizacion 1: Evitamos consulta innecesaria y le pasamos un mensaje de error a la vista
        if(!email || !password) {
            return res.render("login", {
                title: "login",
                error: "Todos los campos son necesarios!"
            });
        }


        // Sentencia antes de bcrypt
        // const sql = `SELECT * FROM users where email = ? AND password = ?`;
        // const [rows] = await connection.query(sql, [email, password]);

        // Bcrypt I -> Sentencia con bcrypt, traemos solo el email
        const sql = "SELECT * FROM users where email = ?";
        const [rows] = await connection.query(sql, [email]);


        // Si no recibimos nada, es porque no se encuentra un usuario con ese email o password
        if(rows.length === 0) {
            return res.render("login", {
                title: "Login",
                error: "Error! Email o password no validos"
            });
        }

        console.log(rows); // [ { id: 7, name: 'test', email: 'test@test.com', password: 'test' } ]
        const user = rows[0]; // Guardamos el usuario en la variable user
        console.table(user);

        // Bcrypt II -> Comparamos el password hasheado (la contraseña del login hasheada es igual a la de la BBDD?)
        const match = await bcrypt.compare(password, user.password); // Si ambos hashes coinciden, es porque coinciden las contraseñas y match devuelve true

        console.log(match);

        if(match) {            
            // Guardamos la sesion
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }
    
            // Una vez guardada la sesion, vamos a redireccionar al dashboard
            res.redirect("/");

        } else {
            return res.render("login", {
                title: "Login",
                error: "Epa! Contraseña incorrecta"
            });
        }


    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


// Endpoint para /logout 
app.post("/logout", (req, res) => {
    // Destruimos la sesion
    req.session.destroy((err) => {
        // En caso de existir algun error, mandaremos una respuesta error
        if(err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});