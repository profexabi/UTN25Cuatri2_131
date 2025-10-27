# UTN 2025 Cuatri 2 Div 131 :penguin:

# Guia Express :books:

`Express.js` es un framework web apra Node.js que nos permite construir servidores y aplicaciones web de forma sencilla y rapida

- Es minimalista, está diseñado para facilitar la creación de servidores web
- Nos permite crear rutas de forma simplificada
- Manejar peticiones HTTP
- Aplicar middlewares de forma más simple
- Es ligero y flexible
- Cuenta con un gran ecosistema de modulos y herramientas con [npm](https://www.npmjs.com/)



## **1 / Setup e instalacion**
#### Comandos con la terminal de git bash

### 1.1 Creacion del proyecto
```sh
# Creamos una carpeta para nuestro proyecto
mkdir nombreProyectoExpress
cd nombreProyectoExpress

# Inicializamos un proyecto npm (node package manager)
npm init -y

# Instalamos express https://www.npmjs.com/package/express
npm install express
```

- El comando `npm init` genera un archivo `package.json`, que contiene informacion clave sobre nuestro proyecto, incluyendo dependencias, scripts, metadatos, etc

- Creamos un archivo principal (que coincida con el main de nuestro package.json)

```json
"main": "index.js",
```

- Recordemos crear un archivo `.gitignore`!
```sh
touch .gitignore
```
- Metamos adentro los nombres de archivos o carpetas que no querramos que se pusheen a git ej: `node_modules` o `.env`
- Estos modulos quedan almacenados en nuestra compu pero no se pushean a git, para poder instalarlos cuando clonemos el repo, usaremos el comando
```sh
npm install
```


### 1.2 Instalamos las dependencias necesarias
Vamos a instalar:

- **express**: Framework web
- **nodemon**: Herramienta que reinicia automaticamente la aplicacion Node.js cuando detecta cambios en los archivos
- **dotenv**: Modulo que carga variables de enotrno desde un archivo `.env` al entorno de ejecucion de Node.js
- **mysql2**: Herramienta para conectarnos a nuestra BBDD MySQL
```sh
npm install express nodemon dotenv mysql2
```

### 1.3 Script personalizado y sintaxis ESM
- Agregamos type module en el `package.json` para usar la sintaxis moderna ES6 de ESM (EcmaScript Modules)
- Agregar script `dev`
```json
  "scripts": {
    "dev": "nodemon index.js"
  },
  "type": "module",
```

### 1.4 Creamos el archivo de variables de entorno `.env`
- Creamos el archivo `.env` y lo agregamos a `.gitignore` 
- En `.env` agregamos las variables locales sensibles como el puerto o la conexion a la BBDD
```txt
PORT=3000
DB_HOST="localhost"
DB_NAME="tp25_autoservicio"
DB_USER="root"
DB_PASSWORD="abc123."
```
---

## 2 / Estructura de directorios y conexion a la BBDD


---


## Notas TP Integrador

## Paso 1
### Proyecto frontend
- *Reutilizamos el 1er parcial pero consumiendo nuestra propia API Rest*

- App front donde usuarios compran 2 tipos de producto

- Al finalizar la compra, creamos un boton que diga "hacer compra" o "imprimir ticket"
    - imprimir 1 ticket con la libreria Js PDF
    - registramos 1 venta (POST para registrar una venta)

#### **Explicacion del cliente**

1. Pantalla de bienvenida donde se pide insertar nombre (y guardarlo en la sesion)

2. Pantalla productos. 
    - Visualizar tarjetas de productos -> datos, img y boton agregar a carrito
    - Esta pantalla productos se ve gracias a que hacemos una peticion fetch a nuestra API Rest, [ejemplo](https://jsonplaceholder.typicode.com/users)

3. Pantalla carrito. Listado de productos añadidos al carrito. Debe permitir agregar o quitar distintas cantidades

4. Pantalla ticket. Confirmado el carrito (boton hacer compra o imprimir ticket)
    - Imprimimos un ticket en pdf con [JS PDF](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html)
    - Se produce un POST a la tabla ventas (hora, cantidad de productos, precio total, etc)

---

## Paso 2

#### BBDD MySQL con las respectivas tablas 

### Proyecto backend
- Una API Rest que va a estar conectada a la BBDD y va a devolver datos

- Nuevas vistas HTML (EJS) -> Es el propio servidor el que va a generar las vistas y el HTML
- Esta vista va a ser el panel de administracion o "backoffice" que nos permitira gestionar productos y usuarios


#### **Explicacion del servidor**
Solamente vamos a crear usuarios admins! los clientes no se loguean, solamente se registra en el ticket y en la venta el nombre que pusieran en la pantalla de bienvenida

1. *Pantalla login que debe permitir ingresar correo y password* -> Conveniente dejar este paso para cuando esten hechas las pantallas

2. Con este login exitoso, pantalla dashboard que posee las siguientes vistas asi como el nav para redirigir a las pantallas de alta, baja y modificacion de productos y usuarios

    2.1 Listado de productos que trae todo el choclo de productos como nuestro parcial -> **GET**

    2.2. Pantalla para obtener productos/usuarios por su id -> **GET by id**

    2.3. Pantalla alta producto para cargar un nuevo producto son con un formulario que permita cargar sus datos y su imagen en url  -> **POST**

    2.4. Recicla el form de get by id -> Pantalla modificar producto para modificar los datos de un producto a partir de su ID -> **PUT**

    2.5 Recicla el form de get by id -> Pantalla para eliminar producto -> **DELETE**

---


## Paso 3
Ya con la API Rest andando 

### 3.1 Login basico con EJS y [bcrypt](https://www.npmjs.com/package/bcrypt)

### 3.2 Subida de archivos con Multer

### 3.3 Descarga de excel con las ventas

### 3.4 Paginacion


---

### Lista de videos

#### 1. [Introductorio / Playlist de Programacion web de todocode](https://www.youtube.com/watch?v=lC6JOQLIgp0&list=PLQxX2eiEaqbxx6Ds5bd1F6LZJo7_OnZhV&index=3)
    - Arquitectura cliente-servidor
    - Protocolo HTTP -> Requests y Responses
    - Que es JSON
    - Que son las APIs

#### 2. [Avanzado / Clase completa sobre protocolo HTTP y arquitectura cliente/servidor](https://www.youtube.com/watch?v=l6oF_RpBf64)


---


## Teoría y fundamentos web del backend


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

#### Recomendacion para nombrar los repos del tp
- `grupoXIProgra3ntegrador25Cuatri2_back`
- `grupoXProgra3Integrador25Cuatri2_front`

