# Que significa que el protocolo HTTP sea sin estado?
## [Wikipedia Protocolo sin estado](https://es.wikipedia.org/wiki/Protocolo_sin_estado)

HTTP es un protocolo sin estado (stateless), lo que significa que cada solicitud del cliente se trata de forma independiente, sin recordar ninguna información de solicitudes anteriores Esto implica que el servidor no almacena ningún estado ni contexto sobre el cliente entre peticiones, y cada petición debe contener toda la información necesaria para ser procesada Como resultado, el servidor no puede identificar si una solicitud proviene del mismo cliente que una anterior, lo que requiere que el cliente proporcione datos como credenciales o identificadores en cada interacción Para superar esta limitación y simular un comportamiento con estado, se utilizan mecanismos como cookies, sesiones o tokens, que permiten al cliente almacenar información y enviarla en cada solicitud

---

# Guia Login

## 1. Instalamos [express-session](https://www.npmjs.com/package/express-session)
```sh
npm i express-session
```

`express-session` es un middleware que permite que Express recuerde datos entre peticiones
Al ser el protocolo HTTP sin estado, express no sabe quienes somos entre una ruta y otra, asi que al iniciar sesion, guardaremos algo asi:

```js
req.session.user = { id: 12, nombre: "Kevin" }
```

Y asi en cualquier request futura, haremos una redireccion si no hay una sesion iniciada

```js
if(!req.session.user) {
    return res.redirect("/login");
}
```


---


## 2. Hacemos el setup del middleware `express-session`
### 2.1 Creamos una key para poder proteger nuestras rutas, [generador de keys online](https://secretkeygen.vercel.app/)

### 2.2 Guardamos esta key generada en nuestro .env y lo exportamos en `environments.js`

- En nuestro `.env`
*Debe guardarse aca para no estar expuesta en el repo, porque en produccion debe ser larga, compleja y secreta. Ya que si alguien la roba, puede falsificar sesiones*
```js
// .env
SESSION_KEY="3cad74cc75e25ac4c13601993d30c890"
```

- En nuestro `config/environments.js`
```js
// environments.js
session_key: process.env.SESSION_KEY
```

### 2.3 Importamos y hacemos el setup de la sesion
- En nuestro archivo principal `index.js`. Ahora hacemos la configuracion de la sesion
```js
// index.js

// Traemos session_key de environments
import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno
const session_key = environments.session_key;

import session from "express-session"; // Importamos session despues de instalar npm i express-session


// Middleware de sesion 
app.use(session({
    secret: session_key, // Esto firma las cookies para evitar manipulacion, un mecanismo de seguridad que usa una key o contraseña bien fuerte y larga
    resave: false, // Esto evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarde sesiones vacias
}));
```


---

## 3. Creamos el endpoint de la vista del /login y la vista de `login.ejs`

### 3.1 Creamos el endpoint para la vista del login
```js
// Vista Login
router.get("/login", (req, res) => {
    res.render("login");
})
```

### 3.2 Creamos la vista de `views/login.ejs` y el middleware para parsear datos del `<form>`

- `index.js`

    - Express no sabe como leer el cuerpo de la peticion POST si no tenemos un middleware de parsing

    - En el caso de un formulario HTML clasico (method="POST"), el navegador envia los datos como `application/x-www-form-urlencoded` por defecto

    - Si no tenemos el parser de urlencoded, req.body sera undefined.

    - Recordemos, para enviar datos como `application/x-www-form-urlencoded`, necesitamos el middleware `express.urlencoded`
```js
// Middleware para parsear las solicitudes POST que enviamos desde el <form> HTML
app.use(express.urlencoded({ extended: true }));
```

- `login.ejs`
```html
<%- include("partials/head.ejs") %>

<!-- Mostramos el mensaje de error del endpoint -->
<% if (typeof error !== "undefined") { %>
    <div class="error-message">
        <%= error %>
    </div>
<% } %>


<h1>Login dashboard</h1>

<form action="/login" method="POST" autocomplete="off" id="login-form">

    <label for="emailUser">Email</label>
    <input type="email" name="email" id="emailUser" required>

    <label for="passwordUser">Password</label>
    <input type="password" name="password" id="passwordUser" required>

    <input type="submit" value="Login">
    <input type="button" id="acceso-rapido" value="Acceso rapido">
</form>


<script>
    // Funcionalidad boton acceso rapido
    let emailUser = document.getElementById("emailUser");
    let passwordUser = document.getElementById("passwordUser");

    let acceso_rapido = document.getElementById("acceso-rapido");

    acceso_rapido.addEventListener("click", () => {
        emailUser.value = "test@test.com";
        passwordUser.value = "test"
    });
</script>

<%- include("partials/footer.ejs") %>

```

---


## 4. EXTRA / Funcionalidad para crear usuarios administradores desde el dashboard

### 4.1 En `crear.ejs` vamos a duplicar un formulario especifico para usuarios

- Creamos la vista en `views/crear.ejs`
```html
<!-- Formulario para crear usuarios y enviarlos a /api/users -->
<form id="altaUsers-container">
    <label for="nombreUser">Nombre</label>
    <input type="text" name="name" id="nombreUser" required>

    <label for="emailUser">Email</label>
    <input type="email" name="email" id="emailUser" required>

    <label for="passwordUser">Password</label>
    <input type="password" name="password" id="passwordUser" required>

    <input type="submit" value="Crear usuario">
</form>
```

- Creamos el envio con fetch en `public/crear.js`
```js
// Alta Usuarios
altaUsers_container.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target); // Transformamos en objeto FormData los campos del formulario

    let data = Object.fromEntries(formData.entries()); // Transformaos a objeto JS el objeto FormData

    console.log(data);

    // Vamos a enviar los datos de nuestro usuario al endpoint /api/users
    try {
        let response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result);
            alert(result.message)
        }

    } catch(error) { // El catch solo captura errores de red
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});
```


### 4.2 Creamos el endpoint /POST para crear usuarios y modularizamos
```js
// index.js///////////////////////////////////////
// Rutas usuario
app.use("/api/users", userRoutes);




// routes/user.routes.js///////////////////////////////////////
// Importamos el middleware Router
import { Router } from "express";
import { insertUser } from "../controllers/user.controllers.js";
const router = Router();

router.post("/", insertUser);

export default router;




// routes/index.js////////////////////////////////////////////
// Importamos las rutas de productos y vistas
import productRoutes from "./product.routes.js";
import viewRoutes from "./view.routes.js";
import userRoutes from "./user.routes.js";

// Archivo de barril que contiene y centraliza todas las rutas
export {
    productRoutes,
    viewRoutes,
    userRoutes
}




// controllers/user.controllers.js///////////////////////////////////////
import UserModels from "../models/user.models.js";

export const insertUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if(!name ||!email ||!password) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }

        const [rows] = await UserModels.insertUser(name, email, password);

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.log("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}



// models/user.models.js///////////////////////////////////////
import connection from "../database/db.js";

// Crear usuario
const insertUser = (name, email, password) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    return connection.query(sql, [name, email, password]);
}

export default {
    insertUser
}
```

---


## 5. Creamos el endpoint para recibir los datos POST del `<form>` de login.ejs
Ahora vamos a recibir un email y un password, tenemos que ver que existan y de ser así, creamos una nueva sesion y redirigimos al dashboard. 
```js
// index.js -> Luego se tendra que modularizar y llevar a otra parte

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


        const sql = `SELECT * FROM users where email = ? AND password = ?`;

        const [rows] = await connection.query(sql, [email, password]);

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

        // Guardamos la sesion
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        // Una vez guardada la sesion, vamos a redireccionar al dashboard
        res.redirect("/");

    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})
```

---

## 6. Creamos las redirecciones y las pasamos a un middleware `requireLogin`
### 6.1 Agregamos el chequeo de sesion y la redireccion a login
```js
// Ejemplo en view.routes.js
router.get("/consultar", (req, res) => {

    if(!req.session.user) { // Aca verificamos si existe la sesion usuario, si no, redirige
        return res.redirect("/login");
    }

    // Para no tener que repetir todo esto, exportamos esta logica al middleware requireLogin!

    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});
```

### 6.2 Exportamos esta logica a un middleware
- `middlewares/middlewares.js`
```js
// Middleware de ruta, para proteger las vistas si no se hizo login
const requireLogin = (req, res, next) => {
   
    if(!req.session.user) {
        return res.redirect("/login");
    }

    next(); // Sin next, la peticion nunca llega a la respuesta (res)
}


export {
    loggerUrl,
    validateId,
    requireLogin
}
```

- Ahora agregamos este middleware a las rutas de las vistas
- `routes/view.routes.js`
```js
// Importamos el middleware requireLogin
import { requireLogin } from "../middlewares/middlewares.js";

router.get("/", requireLogin, productsView);

router.get("/consultar", requireLogin, (req, res) => {

    /* Para no tener que repetir todo esto, exportamos esta logica al middleware requireLogin
    if(!req.session.user) {
        return res.redirect("/login");
    }
    */
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});


router.get("/crear", requireLogin, (req, res) => {

    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});

router.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.get("/eliminar", requireLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    })
});


// Vista Login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});
```


---

## 7. Creamos el boton para hacer logout y el endpoint para /logout

### 7.1 Agregamos el boton de logout en un form dentro de `partials/nav.ejs`
```html
<header>
    <nav>
        <ul>
            <a href="/">
                <li>Ver</li>
            </a>
            <a href="/consultar">
                <li>Consultar id</li>
            </a>
            <a href="/crear">
                <li>Crear</li>
            </a>
            <a href="/modificar">
                <li>Modificar</li>
            </a>
            <a href="/eliminar">
                <li>Eliminar</li>
            </a>
        </ul>
    </nav>

    <!-- Boton para destruir sesion y redirigir a /login -->
    <form action="/logout" id="logout" method="logout">
        <input type="submit" value="Cerrar sesion">
    </form>
</header>
```


### 7.2 Endpoint para hacer /logout
```js
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
```

---

## 8. Incorporamos [bcrypt](https://www.npmjs.com/package/bcrypt) para hashear las contraseñas y que se guarden ya cifradas

### 8.1 Que es `bcrypt`?
`bcrypt` es una libreria diseñada para encriptar (hashear) contraseñas de forma sgura antes de guardarlas en una base de datos. No usa una simple encriptación reversible, sino que usa hashes con sal (salt) que:

    - No se pueden revertir
    - Son lentos, a propósio para evitar ataques de fuerza bruta
    - Generan valores distintos incluso para la misma contraseña
    - Si roban la BBDD, las constraseñas siguen seguras

Las rondas de sal son basicamente cuantas veces bcrypt aplicará el algoritmo internamente. 
Más rondas de sal -> más seguro (y  más lento). 10 es el valor estandar recomendado

La "sal" es un valor aleatorio que se añade a la contraseña antes de hashearla
    - Sin sal, "1234" -> abcd1234hash
    - Con sal 1234CJ9# -> A8fKp4sFhash
    - Aunque otra persona ponga "1234" no tendra el mismo hash

El calculo es intencionalmente lento, por lo que dificulta muchisimo los ataques por fuerza bruta. Si un atacante quiere probar millones de contraseñas, se vuelve mucho mas costoso

En resumen
    - Salt es un valor aleatorio que se mezcla con la contraseña antes del hash y garantiza que cada hash sea unico y evita ataques precomputados
    - Salt rounds es el numero de iteraciones del algoritmo, lo que hace el hashing mas lento para evitar ataques de fuerza bruta


### 8.2 Setup
#### Instalamos bcrypt
```sh
npm i bcrypt
```

#### Vamos a incorporar bcrypt en dos niveles
- En la creacion de usuarios
- En el login


### 8.3 Incorporamos bcrypt en la creacion de usuarios
- en `controllers/user.controllers.js`
```js
import bcrypt from "bcrypt";

import UserModels from "../models/user.models.js";

export const insertUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if(!name ||!email ||!password) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }

        // Setup de bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Antes de hashear
        //const [rows] = await UserModels.insertUser(name, email, password);

        // Con la contraseña hasheada
        const [rows] = await UserModels.insertUser(name, email, hashedPassword);
        // Ahora la constraseña de "thiago" pasa a ser "$2b$10$wemYF.qxnldHTJnMdxNcQeUBqZHz.FhqUBEmmCCcp/O.."

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.log("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}
```


### 8.4 Incorporamos bcrypt en el login
- En el `index.js`. *Ojo, falta modularizar*
```js
// Importamos bcrypt
import bcrypt from "bcrypt";

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
```

En resumen
1. Ciframos la contraseña cuando creamos un nuevo usuario: test@test.com -> password: "test"
2. Esta contraseña "test" ahora se cifra y se guarda cifrada en la BBDD
3. En el login, escribimos la contraseña original "test" e internamente bcrypt la cifra y se fija si el resultado final del cifrado o hasheo es el mismo que el de la BBDD -> es el mismo password

