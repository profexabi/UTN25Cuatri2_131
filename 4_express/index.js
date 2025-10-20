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
})

// TO DO, terminar de explicar este servidor
// #### TO DO, pendiente, terminar de explicar `package.json` (pag 8)