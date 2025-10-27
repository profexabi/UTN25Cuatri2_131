// Creamos un servidor base con Express.js que responde con un "Hola Mundo en la ruta principal"

// Importamos Express
const express = require("express");

// Creamos una (instancia de) aplicacion de express
const app = express();

// Definimos la ruta principal
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Escuchamos en el puerto 3000
const puerto = 3000;

app.listen(puerto, () => {
    console.log(`Servidor Express corriendo en el puerto ${puerto}`);
});

/*
1. Instalamos Express con `npm i express` y lo importamos
2. Creamos una aplicacion: Llamamos a la funcion `express()` que devuelve una instancia de aplicacion
3. Definimos una ruta: Usamos `app.get()` para definir que hacemos cuando alguien visita la raiz `"/"` de nuestro servidor. Respondemos con un simple *"Hola mundo desde Express.js"*
4. Escuchamos en un puerto: Nuestro servidor esta escuchando en el puerto 3000 y listo para aceptar conexiones

*/