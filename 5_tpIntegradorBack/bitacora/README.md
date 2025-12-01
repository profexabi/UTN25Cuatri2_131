# Apuntes

## Qué es TCP/IP

TCP/IP es un conjunto de protocolos de comunicación desarrollado originalmente por el Departamento de Defensa de los Estados Unidos para respaldar la construcción de Internet, y es considerado el estándar fundamental para la comunicación en redes El acrónimo proviene de sus dos protocolos principales: el Protocolo de control de transmisión (TCP) y el Protocolo de internet (IP), que trabajan juntos para garantizar la transferencia eficiente y confiable de datos entre dispositivos TCP se encarga de dividir los datos en paquetes, asegurar su entrega completa, en orden y sin errores, gestionando la retransmisión de paquetes perdidos o dañados IP, por su parte, se encarga del direccionamiento y enrutamiento de los paquetes, asignando una dirección IP única a cada dispositivo para que los datos lleguen al destino correcto

El modelo TCP/IP organiza la comunicación en cuatro capas: la capa de acceso a la red (gestiona la transmisión física), la capa de Internet (responsable del direccionamiento y enrutamiento mediante IP), la capa de transporte (donde opera TCP, asegurando la entrega fiable) y la capa de aplicación (donde se encuentran protocolos como HTTP, FTP o SMTP que interactúan directamente con los usuarios) Este modelo permite que diferentes sistemas y dispositivos, independientemente de su hardware o software, puedan comunicarse entre sí de manera interoperable Aunque IP es un protocolo "de mejor esfuerzo" que no garantiza la entrega, TCP añade fiabilidad al establecer conexiones, usar un handshake de tres vías para iniciar la comunicación y verificar la recepción de cada paquete

En resumen, TCP/IP actúa como el "pegamento que mantiene unido Internet", proporcionando las reglas necesarias para que los datos se formateen, direccionen, transmitan, enrutén y reciban correctamente a través de redes globales Su arquitectura flexible, escalable y abierta ha sido clave para su adopción universal, permitiendo el funcionamiento de servicios como navegación web, correo electrónico y transferencia de archivos


---

## Que es HTTP
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

## Comparacion servidores `Node.js` y `Express.js`

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


### Chusmeando nuestro servidor minimo de Express
- *Los pasos que seguimos siempre en un proyecto Node.js son 1. Instalar, 2. Importar, 3. Utilizar*

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
});
```

1. Instalamos Express con `npm i express` y lo importamos
2. Creamos una aplicacion: Llamamos a la funcion `express()` que devuelve una instancia de aplicacion
3. Definimos una ruta: Usamos `app.get()` para definir que hacemos cuando alguien visita la raiz `"/"` de nuestro servidor. Respondemos con un simple *"Hola mundo desde Express.js"*
4. Escuchamos en un puerto: Nuestro servidor esta escuchando en el puerto 3000 y listo para aceptar conexiones



---


## Como servir archivos estaticos en Express.js usando la sintaxis ESM?

### En ESM no tenemos `__dirname` ni `__filename` de manera que tenemos que crearlos a mano
```js
// src/api/utils/index.js

// Importacion de modulos para trabajar con rutas
import { fileURLToPath } from "url"; // Convierte una URL de archivo file:// a una ruta de sistema de archivos
import { dirname, join } from "path"; // dirname devuelve del directorio de una ruta y join unifica rutas

// Obtener el nombre de archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../"); 


// Exportamos el directorio base calculado y la funcion "join" para construir rutas relativas
export {
    __dirname,
    join
}
```

### Ahora en el archivo raiz de nuestra aplicacion `index.js`
```js
// Incorporamos la configuracion en el index.js
import { __dirname, join } from "./src/api/utils/index.js";

app.use(express.static(join(__dirname, "src/public"))) // Middleware para servir archivos estaticos
```

### Gracias a esta configuracion, ahora podemos acceder a los archivos desde el navegador
Una vez configurado, podemos acceder a los archivos estaticos directamente desde su **ruta relativa**

- http://localhost:3000/css/styles.css
- http://localhost:3000/js/main.js
- http://localhost:3000/img/logo.png


---

## ¿Qué es Express.static?

`express.static` es un middleware integrado Express.js diseñada para servir archivos estáticos de manera eficiente.  Permite al servidor entregar archivos como imágenes, hojas de estilo CSS, scripts JavaScript y documentos HTML directamente a los clientes sin necesidad de procesamiento dinámico para cada solicitud.  Esta funcionalidad es crucial para mejorar el rendimiento de las aplicaciones web, ya que reduce la carga del servidor y mejora la velocidad de entrega de contenido. 

El middleware se configura normalmente especificando una ruta de directorio donde se almacenan los activos estáticos, como `app.use(express.static(“public”))`. Una vez configurado, Express sirve automáticamente cualquier archivo ubicado dentro del directorio especificado cuando se solicita a través de HTTP, utilizando la ruta del archivo relativa al directorio raíz. Por ejemplo, un archivo `public/styles.css` se puede acceder en `http://localhost:3000/styles.css`. 

`express.static` también se puede utilizar con rutas virtuales para crear rutas URL personalizadas para archivos estáticos, lo que ofrece una mayor flexibilidad en la organización de las URL. Admite opciones de configuración avanzadas como el almacenamiento en caché, la compresión y los encabezados personalizados, que se pueden configurar a través de un objeto de opciones. Además, se puede aplicar a varios directorios en secuencia, y Express los busca uno por uno hasta encontrar el archivo solicitado. 

