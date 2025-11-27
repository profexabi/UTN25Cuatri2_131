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


### 4.2 Creamos el endpoint /api/users para poder insertar nuevos usuarios en la tabla

---


## 5. Creamos el endpoint para recibir los datos POST del `<form>` de login.ejs
