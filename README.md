# UTN 2025 Cuatri 2 Div 131 :penguin:

# Express :books:


## Teoría y fundamentos web del backend

### Lista de videos

#### 1. [Introductorio / Playlist de Programacion web de todocode](https://www.youtube.com/watch?v=lC6JOQLIgp0&list=PLQxX2eiEaqbxx6Ds5bd1F6LZJo7_OnZhV&index=3)
    - Arquitectura cliente-servidor
    - Protocolo HTTP -> Requests y Responses
    - Que es JSON
    - Que son las APIs

#### 2. [Avanzado / Clase completa sobre protocolo HTTP y arquitectura cliente/servidor](https://www.youtube.com/watch?v=l6oF_RpBf64)


---


### Qué es TCP/IP

TCP/IP es un conjunto de protocolos de comunicación desarrollado originalmente por el Departamento de Defensa de los Estados Unidos para respaldar la construcción de Internet, y es considerado el estándar fundamental para la comunicación en redes El acrónimo proviene de sus dos protocolos principales: el Protocolo de control de transmisión (TCP) y el Protocolo de internet (IP), que trabajan juntos para garantizar la transferencia eficiente y confiable de datos entre dispositivos TCP se encarga de dividir los datos en paquetes, asegurar su entrega completa, en orden y sin errores, gestionando la retransmisión de paquetes perdidos o dañados IP, por su parte, se encarga del direccionamiento y enrutamiento de los paquetes, asignando una dirección IP única a cada dispositivo para que los datos lleguen al destino correcto

El modelo TCP/IP organiza la comunicación en cuatro capas: la capa de acceso a la red (gestiona la transmisión física), la capa de Internet (responsable del direccionamiento y enrutamiento mediante IP), la capa de transporte (donde opera TCP, asegurando la entrega fiable) y la capa de aplicación (donde se encuentran protocolos como HTTP, FTP o SMTP que interactúan directamente con los usuarios) Este modelo permite que diferentes sistemas y dispositivos, independientemente de su hardware o software, puedan comunicarse entre sí de manera interoperable Aunque IP es un protocolo "de mejor esfuerzo" que no garantiza la entrega, TCP añade fiabilidad al establecer conexiones, usar un handshake de tres vías para iniciar la comunicación y verificar la recepción de cada paquete

En resumen, TCP/IP actúa como el "pegamento que mantiene unido Internet", proporcionando las reglas necesarias para que los datos se formateen, direccionen, transmitan, enrutén y reciban correctamente a través de redes globales Su arquitectura flexible, escalable y abierta ha sido clave para su adopción universal, permitiendo el funcionamiento de servicios como navegación web, correo electrónico y transferencia de archivos


---

### Que es HTTP
¿Qué es HTTP?

HTTP, o Protocolo de Transferencia de Hipertexto, es un protocolo de comunicación cliente-servidor que permite la transmisión de datos entre dispositivos en red, siendo la base fundamental para el funcionamiento de la World Wide Web Este protocolo sigue un modelo de solicitud-respuesta, donde un cliente, como un navegador web, envía una solicitud al servidor web para obtener un recurso, como una página HTML, y el servidor responde con el contenido solicitado HTTP es un protocolo sin estado, lo que significa que cada solicitud se maneja de forma independiente sin retener información sobre solicitudes anteriores, y utiliza estándares y reglas predefinidos para el intercambio de información Además, depende de otros protocolos de red subyacentes, como TCP/IP, para su funcionamiento


---

#### Ejemplos
```js
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My post title',
    body: 'My post content.',
    userId: 1
  })
});

const data = await response.json();
console.log(data);   
```

---

### Comparacion servidores `Node.js` y `Express.js`

#### Servidor con Node.js

```js
// Importamos el modulo http
const http = require("http"); // Ahora que esta importado, vamos a poder utilizar todos los metodos que provee este modulo

// Creamos el servidor
const servidor = http.createServer((req, res) => {

    // Configuramos la respuesta
    res.statusCode = 200; // Codigo 200 OK para indicar que la peticion fue exitosa

    res.setHeader("Content-Type", "text/plain"); // Indicamos que responderemos con texto

    res.end("Hola mundo desde Node.js"); // Mensaje que enviamos al cliente
});


// Definimos el puerto y arrancamos el servidor
const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
```

---

#### Servidor con Express.js
```js

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
```

---

## Anotaciones

- [Chusmear codigos de estado HTTP](https://http.cat/)
- [Chusmear compatibilidad entre navegadores](https://caniuse.com/?search=json)
- **Recomendacion**: Ir avanzando con el TP, adaptando el parcial para consumir los datos de aca
    - [API Rest publica de tienda de productos](https://fakestoreapi.com/products/)

- TO DO:
- *Esperemos a terminar JS VIII, Servidor Node.js y servidor Express.js y a ver la leccion protocolo HTTP y arquitectura cliente servidor*
    - **Explicar Event Loop, Call Stack (Pila de ejecucion) Callback Queue**

- **Ver lenguaje Markdown y manejo de git**
- [Lenguaje Markdown](https://es.wikipedia.org/wiki/Markdown)


---

