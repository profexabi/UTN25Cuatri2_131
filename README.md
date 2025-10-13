# UTN 2025 Cuatri 2 Div 131 :penguin:

# JavaScript :books:

#### [onlinegdb portfolio Kevin](https://onlinegdb.com/abeQfQjGr)

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


# Guia JavaScript
- [JavaScript Wikipedia](https://en.wikipedia.org/wiki/JavaScript)
- [Promesas en programacion](https://en.wikipedia.org/wiki/Futures_and_promises)

## JavaScript VIII / JSON, asincronia, promesas, fetch, async/await y try/catch

```js
/*========================================
    JSON (JavaScript Object Notation)
==========================================

- JSON (JavaScript Object Notation) es un formato de texto plano.

- Es el formato ligero de intercambio de datos estandar entre aplicaciones en la web. Esto quiere decir que aunque use la notacion de objetos de JavaScript (la manera en la que estructuramos la informacion de objetos en JS), es independiente del lenguaje y es ampliamente usado en todo tipo de sistemas y lenguajes de programacion


JSON es un formato de texto que representa datos estructurados basado en dos estructuras fundamentales

    1. Coleccion de pares nombre/valor (igual que un objeto en JavaScript)

    2. Lista ordenada de valores (equivalente a un array en JavaScript)


JSON es:

    - Textual y legible por humanos
    - Es muy ligero
    - Es facil de parsear (realizar la conversion) y generar
    - Es independiente del lenguaje


{
    "nombre":  "Andres Albertti",
    "edad": 30,
    "esEstudiante": true,
    "direccion": {
        "calle": "Calle falsa 123",
        "ciudad": "Springfield"
    },
    "telefonos": ["555-12345", "555-5678"],
    "nulo": null
}


Reglas de sintaxis:

    - Los datos estan representados en pares nombre/valor (clave/valor)
    - Los datos se separan por comas
    - Las llaves {} representan objetos
    - Los corchetes representan arrays [],
    - Las comillas dobles son obligatorias para nombres de propiedades y strings

JSON soporta:

    1. Strings: "texto" (siempre con comillas doble),
    2. Numeros: 42, 3.14 (sin comillas)
    3. Booleanos: true o false (sin comillas)
    4. Null: null (representa un valor nulo),
    5. Objetos { "clave" : "valor" }
    6. Arrays: [ "valor 1", "valor 2"]


Usos comunes de JSON:

    1. Comunicacion Cliente-Servidor: JSON es el estandar para APIs Rest

    2. Almacenamiento local: Guardamos datos en el navegador

    3. Configuraciones: Muchas herramientas usan JSON para configuraciones (package.json en Node.js)


En resumen:
    - JSON es una parte fundamental del ecosistema JavaScript y la web moderna

    - Es el formato estandar para el intercambio de datos

    - Es super ligero y sencillo de leer

    - Esta integrado en todos los navegadores y en Node.js
*/



/* ====================
    Asincronia
=======================

Asincronia es la capacidad de un programa de ejecutar tareas que toman tiempo (como acceder a una API, esperar a un temporizador) sin bloquear la ejecucion del resto del codigo

En JavaScript, esto es clave porque es un lenguaje single-threaded (de un solo hilo), lo que significa que solo puede ejecutar una tarea a la vez.

Por eso, para evitar que el hilo principal se bloquee, se introducen mecanismos asincronicos para "delegar" operaciones que tomaran tiempo y continuar ejecutando el resto del codigo mientras esas tareas se completan

Herramientas de JavaScript para asincronia

    1. Temporizadores: Demoramos la ejecucion de una funcion 
        setTimeout y setInterval

    2. Callbacks: Funcion que se pasa como argumento a otra funcion para ejecutarse despues de completar una operacion
        Puede generar callback hell

        function leerArchivo(nombre, callback) {
            // simulamos lectura

            setTimeout(() => {
                callback(`Contenido de ${nombre}`)    
            }, 1000)
        }

    3. Promesas: Objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca.
*/



/*===================
    Promesas
=====================

Objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca.
Aparecen en 2015 en EcmaScript 2015.
Una promesa es un objeto que representa el resultado futuro de una operacion asincrona

Estados:
- pending (esperando)
- fulfilled (completado)
- rejected (rechazado)

---
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Datos listos")
        }, 1000)
    });

    promesa.then(data => console.log(data));
---

Relacion entre fetch y promesas

fetch:      Es una funcion API Web / Devuelve una promesa / Siempre trabaja de forma asincronica

promesa:    Es un objeto nativo de JS / Puede ser usada en fetch() / Controla valores futuros

Las promesas simplemente son una forma de manejar cosas que toman tiempo
*/

// Manejando promesas con fetch(): fetch es una Web API que devuelve una promesa

// 1. Hacemos una peticion http
fetch("https://jsonplaceholder.typicode.com/users") 

    // 2. Se resuelve con una response (respuesta del servidor)
    .then(respuesta => respuesta.json()) 
    .then(data => console.log(data))

    // 3. Se rechaza si hay un error de red
    .catch(error => console.error(error));



/*==========================
    fetch en JavaScript
============================

fetch() es una funcon incorporada en los navegadores modernos que permite realizar peticiones HTTP y HTTPS de forma asincronica usando promesas

Forma parte de las Web APIs proporcionadas por el navegador, no del lenguaje JavaScript en si

Fue introducida como parte del Fetch API para reemplazar al viejo y complejo XMLHttpRequest



Caracteristicas tecnicas:

- Devuelve un objeto Promise que se resueve con un objeto Response
- Usa el estandar HTTP: metodos como GET, POST, PUT y DELETE
- Funciona bien con async/await
- Es mas limpia y moderna que XMLHttpRequest
- Soporta CORS, headers, envio de JSON y mas


fetch(url, opciones)
    .then(response => {
        // respuesta cruda del servidor
    })
    .catch(error => {
        error de red o fallo local
    })

- url: string, se refiere a la url que queremos hacer la solicitud
- options: objeto que especifica configuracion adicional como metodo, headers (cabeceras), cuerpo (body), etc
*/

// Ejemplo completo con GET
/*
fetch("https://api.example.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }

        return response.json(); // Transformamos a objeto JS
    })
    .then(data => {
        console.log("Usuarios: ", data);
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });
*/

// Ejemplo con opciones POST
/*
fetch("http://api.example.com/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        titulo: "Holis",
        contenido: "Esto es un post"
    })
})
.then(response => response.json())
.then(data => console.log("Respuesta del servidor:", data))
.catch(error => console.error("Error:", error));
*/

/*=========================
    El objeto Response
===========================

La promesa devuelta por fetch() se resuelve con un objeto Response que tiene

    - .ok -> booleano (true si status esta entre 200 y 299)
    - .status -> codigo HTTP (200, 404)
    - .statusText -> texto del estado ("OK", "Not Found")
    - .headers -> cabeceras HTTP de la respuesta
    - .json(), .text(). formData() -> Para leer el contenido de la respuesta


Manejo de errores:
    - fetch() solo rechaza la promesa en errores de red reales (sin internet, servidor caido)
    - No rechaza en codigos de erorr HTTP (404, o 500) por eso, debemos revisar con response.ok
*/



/*=====================
    asnyc / await
=======================

async / await es "azucar sintactico" o "syntactic sugar", es decir, una forma mas breve y mas sencilla de leer, sobre las Promises.

El objetivo es hacer el manejo de asincronia mas legible, estructurado y facil de depurar


Comparacion async/await con Promesas:

- async/await es mas legible y secuencial
- Provee mejor manejo de errores con try/catch
- Ideal para flujos largos y complejos de asincronia


///////////////////////////
// Como funciona async?

La palabra clave (keyword) se usa para declarar una funcion asincrona, la cual siempre devuelve una Promesa, aunque el valor retornado no lo sea

- Con async, transformamos esa funcion en una funcion asincrona que retorna una promesa
- Aunque saludar() devuelve un string, en realidad, devuelve una Promise que se resuelve con ese valor*/
async function saludar() { 
    return "Holis!";
}

saludar().then(console.log);

/*////////////////////
// Que hace await?

La palabra clave (keyword) pausa la ejecucion de la funcion async hasta que una Promesa sea resuelta (fulfilled) o rechazada (rejected)

- await espera que fetch() devuelva una Promesa resuleta antes de continuar
- El codigo despues de await no se ejecuita hasta que la Promesa es resuleta
- Recordemos que await solo puede usarse dentro de funciones async


// Que pasa internamente cuando usamos await?
1. Evaluamos la expresion que devuelve una promesa
2. Suspendemos la ejecucion de la funcion hasta que la promesa se resuelva o rechace
3. Si se resuelve, se continua con el valor
4. Si se rechaza, lanza un error que puede ser atrapado con try...catch


///////////////
// Recordar

- await BLOQUEA la ejecucion dentro de la funcion async, pero no bloquea el hilo principal
- las funciones async SIEMPRE devuelve una Promesa


- async ->      Declara una funcion asincrona que devuelve una proemsa
- await ->      Pausa la funcion hasta que la promesa se resuelva
- try/catch ->  Maneja errores de promesas rechazadas
- Todo esto hace que el codigo sea mas limpio, mas legible y facil de depurar
*/
async function obtenerDatos() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
        const datos = await respuesta.json();
        console.table(datos);

    // El bloque catch captura errores de cualquier promesa esperada con await
    } catch(error) {
        console.error("Ocurrio un error:", err);
    } finally {
        console.log("Peticion asincrona terminada");
    }
}

obtenerDatos();


// Si no hay dependencia entre las promesas, podemos encadenar con Promise.all()
/*
async function cargarTodo() {
    const [usuarios, posts] = await Promise.all([
        obtenerUsuarios(),
        obtenerPosts()
    ]);

    console.log(usuarios, posts);
}
*/

// TO DO: Ejercicio sugerido, completen este encadenamiento con Promise.all usando la API REST publica de jsonplaceholder


/*========================
    try ... catch
==========================

try ... catch es una estructura de control utilizada para capturar y manejar errores que ocurren duran la ejecucion de bloques de codigo.

Esta tecnica forma parte del manejo de excepciones en JavaScript

Su objetivo es evitar que errores inesperados detengan la ejecucion del programa y en su lugar permitir manejar dichos errores de forma controlada


///////////////////////////////
// Que errores puede capturar?

try...catch captura errores en tiempo de ejecucion (runtime) como:

- Acceso a variables no definidas
- Llamadas a funciones inexistentes
- Errores lanzados con trhwo
- Problemas en funciones JSON.parse()
- NO captura errores de sintaxis porque estos impiden que el codigo siquiera se ejecute



Precauciones:
- Puede ocultar errores reales si no se maneja correctamente
- Tiene costo de rendimiento especialmente en bucles
- Es mejor usarlo en partes del codigo donde hay riesgo real de error (Input/Output, parseo, operaciones de red, etc)


Recomendaciones:
- No atrapemos errores que no podemos manejar
- Usemos try...catch donde solo esperamos errores (parsear datos, hacer llamadas a APIs)
- Usemos finally para cerrar recursos, limpiar o terminar tareas (conexiones, indicadores de carga, etc)
- Siempre proporcionemos informacion util en el error (e.message)


////////////////////////////////
// Como funciona internamente?

1. El bloque try se ejecuta normalmente

2. Si ocurre un error dentro del try, se DETIENE INMEDIATAMENTE la ejecucion y pasa al bloque catch

3. El objeto de error (por convencion llamado error, err o e) contiene informacion como:

    - .name: tipo de error (TypeError, ReferenceError, etc)
    - .message: mensaje descriptivo

4. El bloque finally, si existe, siempre


Podemos lanzar nuestro propios errores con throw, util para validaciones o control de flujo
*/
// Ejemplo 1
try {
    const resultado = 10 / 0;
    console.log(resultado); // Infinity
    throw new Error("Error personalizado");

} catch(error) {
    console.log("Ocurrio un error:", error.message); // Ocurrio un error: Error personalizado

} finally {
    console.log("Esto se ejecuta siempre"); // Esto se ejecuta siempre
}


// Ejemplo 2
try {
    console.log("Inicio");
    throw new Error("Falla");

} catch(e) {
    console.log("Capturado:", e.message);

} finally {
    console.log("Siempre se ejecuta");
}


/* Resumen:

try     ->  ejecuta codigo que puede lanzar errores
catch   ->  Captura y maneja el error    
finally ->  Codigo que se ejecuta siempre con o sin error
throw   ->  Lanza errores manualmente
error   -> Objeto con informacion del error

Uso ideal: Operaciones input/output (I/O), llamadas a red, parsing, validacion, async/await
*/


/* ============================================
    EXTRA: Cerrando conexiones con try/catch
===============================================

1. Una peticion asincrona no se cierra manualmente como un archivo
Las peticiones HTTP normales no requieren que cerremos nada a mano
    - Abrimos la conexion HTTP
    - Esperamos la respuesta
    - Se cierra automaticamente cuando termina


2. WebSockets
- Un WebSocket es un canal de comunicacion bidireccional en tiempo real entre un cliente y un servidor
    - El cliente abre una conexion con el servidor una sola vez
    - Esa conexion permanece abierta
    - Tanto el cliente como el servidor pueden enviar y recibir mensajes en cualquier momento (comunicacion full-duplex) donde ambas partes pueden hablar a la vez
    
- A diferencia de fetch, que hace peticiones individuales, con WebSockets se mantiene una conexion abierta y persistente

    - El cliente hace una peticion
    - El servidor responde
    - La conexion se cierra

- Casos de uso: Chats en tiempo real, Juegos online, Notificaciones en vivo, Monitoreao e datos en tiempo real

3. Conviene cerrar?
En el websocket conviene cerrar, porque queda abgierta esta conexion con socket.close() -> Esto libera reecursos y evita fugas de memoria

En peticiones normales fetch, no hace falta

app.get("/ruta", async (req, res) => {
    try {

        // Aca hacemos la logica del endpoint
        res.json(datos); // -> Esta parte cierra la peticion
    } catch (error) {
        res.status(500).json({ // -> Aca tambien cierra la conexion
            error: "Algo salio mal"
        });
    }
});
*/

```

#### EXTRA: JSON vs XML

JSON y XML son dos formatos ampliamente utilizados para el intercambio y almacenamiento de datos, pero difieren significativamente en estructura, uso y eficiencia. **JSON (JavaScript Object Notation)** es más ligero, fácil de leer y rápido de analizar, lo que lo hace ideal para aplicaciones web modernas y servicios API. Por otro lado, **XML (Extensible Markup Language)** es más versátil y robusto, con soporte para espacios de nombres, comentarios y esquemas, lo que lo hace adecuado para configuraciones complejas y documentos estructurados. Aunque ambos son autodescriptivos y jerárquicos, JSON domina en entornos web dinámicos, mientras que XML sigue siendo relevante en sistemas empresariales y estándares técnicos.

## Origen y Estructura

### 1. JSON
JSON se basa en la sintaxis de objetos de JavaScript y utiliza una estructura de pares clave-valor. Es ideal para representar datos estructurados de forma ligera y eficiente. No requiere etiquetas de apertura y cierre, lo que reduce el tamaño del archivo.


{
  "usuarios": [
    { "nombre": "Ana", "edad": 30 },
    { "nombre": "Luis", "edad": 25 }
  ]
}


### 2. XML
XML es un lenguaje de marcado que permite definir etiquetas personalizadas. Su estructura jerárquica con elementos anidados lo hace adecuado para documentos complejos. Requiere etiquetas de apertura y cierre, lo que aumenta el tamaño del archivo.

```xml
<usuarios>
  <usuario>
    <nombre>Ana</nombre>
    <edad>30</edad>
  </usuario>
  <usuario>
    <nombre>Luis</nombre>
    <edad>25</edad>
  </usuario>
</usuarios>
```

## Tipos de Datos y Soporte

### 1. Tipos de Datos
- **JSON**: Soporta tipos primitivos como cadenas, números, booleanos, arrays y objetos. No permite tipos personalizados.
- **XML**: Todos los datos son tratados como texto, pero puede definir tipos mediante esquemas (XSD) y soportar fechas, imágenes, gráficos, etc.

### 2. Arrays y Estructuras
- **JSON**: Tiene soporte nativo para arrays, lo que facilita el manejo de listas.
- **XML**: No tiene soporte directo para arrays; se simulan mediante elementos repetidos.

### 3. Espacios de Nombres y Comentarios
- **JSON**: No soporta espacios de nombres ni comentarios.
- **XML**: Soporta espacios de nombres (útil en documentos grandes) y comentarios (para documentación interna).

## Facilidad de Uso y Rendimiento

### 1. Lectura y Escritura
- **JSON**: Más fácil de leer y escribir debido a su sintaxis compacta. Ideal para desarrolladores que trabajan con JavaScript.
- **XML**: Más complejo de interpretar por la cantidad de etiquetas y estructura anidada.

### 2. Tamaño y Velocidad
- **JSON**: Archivos más pequeños, menor sobrecarga, transmisión más rápida. Ideal para aplicaciones móviles y web.
- **XML**: Archivos más grandes por la verbosidad de las etiquetas. Puede requerir compresión para optimizar.

### 3. Integración con Tecnologías Web
- **JSON**: Soporte nativo en navegadores y frameworks modernos (React, Angular, etc.). Compatible con AJAX.
- **XML**: Requiere analizadores adicionales. Menos integrado con tecnologías web modernas.

## Seguridad y Compatibilidad

### 1. Seguridad
- **JSON**: Considerado más seguro porque no incluye DTD (Document Type Definition), evitando ataques como XXE.
- **XML**: Puede ser vulnerable a ataques si no se desactiva el DTD o se usa con validación insegura.

### 2. Codificación
- **JSON**: Solo soporta UTF-8.
- **XML**: Soporta múltiples codificaciones (UTF-8, UTF-16, ISO-8859-1, etc.), lo que lo hace más flexible en entornos multilingües.

## Casos de Uso Recomendados

### 1. Cuándo usar JSON
- APIs RESTful
- Aplicaciones web y móviles
- Intercambio de datos entre cliente y servidor
- Configuraciones simples
- Servicios en tiempo real (WebSockets)

### 2. Cuándo usar XML
- Documentos estructurados (facturas, informes)
- Configuraciones complejas (archivos .config, .xml en Android)
- Estándares empresariales (SOAP, RSS, XHTML)
- Sistemas que requieren validación de esquema (XSD)
- Transformaciones con XSLT

## Conclusión

**JSON** es preferido en aplicaciones modernas por su simplicidad, velocidad y facilidad de integración con JavaScript. Es ideal para servicios web, APIs y entornos donde el rendimiento es clave.  
**XML**, aunque más complejo, ofrece mayor flexibilidad, seguridad estructural y soporte para metadatos, lo que lo mantiene vigente en entornos empresariales y sistemas heredados.

La elección entre ambos depende del contexto: **JSON para agilidad y eficiencia**, **XML para robustez y control estructural**.


---


## JavaScript VII / High order functions, destructuring, spread operator, closures, funciones anidadas, callbacks, web apis

### Extra: Estructura de directorios de un proyecto frontend

- index.html
- css
    - styles.css
- js
    - main.js
- assets
    - img
        - arandanos.png
    - fonts
        - ubuntu.otf
    - icons
        - logo.ico

```js
/*========================================
    1. Callbacks
==========================================

Un callback es una funcion que se pasa como argumento a otra funcion y que se ejecuta despues de que algo haya ocurrido

Es como decirle a la funcion, cuando termines todo el codigo, llamas a esta otra funcion.

Se usan principalmente para:

    - Ejecutar codigo despues de una tarea
    - Manejar tareas asincronas (leer archivos o pedir datos a un servidor)
    - Hacer el codigo mas flexible y utilizable


Los callbacks se usan mucho para

    - Manejar eventos del usuario con addEventListener
    - Operaciones asincronas
    - Temporizadores
    - Procesamiento de datos
    - Comunicacion con servidores
*/

// Callbacks: Funciones que se pasan como argumentos a otras funciones para ser ejecutadas despues

// Callbacks ej 1: Procesando datos
function procesarDatos(datos, callback) {
    console.log("Procesando datos");
    const resultado = datos.toUpperCase();
    callback(resultado); // Ejecuta la funcion callback
}

procesarDatos("hola mundo", (res) => {
    console.log("Resultado:", res); // Resultado: HOLA MUNDO
});




// Callbacks ej 2: Otro callback
function primerSaludo(nombre, callback) {
    console.log("Llamada a la primer funcion");
    console.log(`Hola ${nombre}`);
    callback(nombre); // La funcion callback recibe tambien este parametro
}

function despedirse(nombre) {
    console.log("Ejecutando funcion callback")
    console.log(`Chau ${nombre}`);
}

primerSaludo("Emmanuel", despedirse); // Hola Emmanuel  Chau




/* ================================
    Caracteristicas principales
===================================

1. Funciones como ciudadanos de primera clase, esto significa que las funciones pueden ser

    - Asignadas a variables
    - Pasadas como argumentos
    - Retornadas desde otras funciones
*/

// Asignando funcion a variable
let miCallback = function() {
    console.log("Callback ejecutado");
}

function ejecutarCallback(callback) {
    callback();
}

ejecutarCallback(miCallback);




// 2. Sincronia y Asincronia

// Callback sincrono simulando un proceso pesado -> Esto bloquea el hilo principal!
function procesoPesado(callback) {
    console.log(`Iniciando proceso...`);

    // Simulamos una tarea pesada
    for (let i = 0; i < 2000; i++) {
        callback();
    }
}
/*
procesoPesado(function() {
    console.log("Proceso completado");
});

console.log("Esto se ejecuta despues del callback");
*/



// Callback asincrono -> No bloquea el hilo principal, sino que se ejecuta en paralelo
function procesoAsincrono(callback) {
    console.log("Iniciando proceso asincrono");

    // Simulamos el procesamiento
    setTimeout(function() {
        callback();
    }, 6000);
}

procesoAsincrono(function() {
    console.log("Proceso asincrono completado");
});

console.log("Esto se ejecuta inmediatamente")




/*======================================
    Casos de uso comunes de Callbacks
========================================

1. Temporizadores o timers

// setInterval es una funcion asincrona que se ejecuta cada x segundos
setInterval(() => {
    console.log("Holis cada medio segundo");
    }, 500);
    */
   
// setTimeout es una funcion asincrona que se ejecuta una sola vez al cabo de un tiempo
setTimeout(function() {
    console.log("Holis despues de 2 segs");
}, 2000);


let cont = 0;

let intervalo = setInterval(() => {
    cont++;
    console.log(`Contador: ${cont}`)

    if (cont === 5) {
        clearInterval(intervalo);
        console.log("Detenemos nuestro setInterval");
    }
}, 1000);
    
   

// 2. Eventos del DOM
let botonPrueba = document.getElementById("botonPrueba");

botonPrueba.addEventListener("click", function(evento) {
    console.log(`Boton clickeado`, evento.target);
});



// 3. Operaciones con arrays
const numeros = [1, 2, 3, 4, 5];

// forEach
numeros.forEach(function(num, indice) {
    console.log(`Indice: ${indice}, valor: ${num}`);
});


// map
let numsDobles = numeros.map(function(numero) {
    return numero * 2;
});
console.log(numsDobles);



// filter
// let numsParess = numeros.filter(n => n % 2 === 0);
let numsPares = numeros.filter(function(n) {
    return n % 2 === 0;
});
console.log(numsPares);



// 4. Peticiones HTTP
// Mirar abajo en Promesas y asnyc / await



// 5. Lectura de archivos (Node.js)
// Ver leccion Node.js
/*
// Improtaremos file system
const fs = require("fs");

// Lectura asincrona
fs.readFile("info.txt", "utf8", function(error, contenido) {
    if (error) {
        console.error("Error leyendo archivo: ", error);
        return;
    }

    console.log("Contenido del archivo: ", contenido);
});*/

// Desventajas de callbacks -> Pueden general callback hell! Ir abajo







/*
==========================================================
    Diferencia entre Callbacks y High Order Functions
==========================================================

Callback es la funcion pasada como argumento

High Order Function es la funcion que recibe o devuelve funciones

Estan relacionadas pero no son equivalentes. Un callback es usando dentro de una HOF, pero no todas las HOF usan callbacks explicatamente (porque pueden devolver funciones en lugar de recibirlas)
*/



/* ===============================
    Funciones de orden superior
    High Order Functions
==================================

Una funcion de orden superior es una funcion que puede hacer al menos una de estas dos cosas

    1. Recibir una o mas funciones como argumento(s)
    2. Devolver una funcion como resultado

Las funciones de orden superior operan sobre otras funciones, ya sea tomandolas como parametros o retornandolas. 


Por que usar funciones de orden superior?

    - Abstraccion: Permiten escribir codigo mas abstracto y reutilizable
    - Composicion: Facilitan combinar funcionalidades pequeñas en lógicas más complejas


Ventajas de las High Order Functions

- Reduccion de codigo repetitivo

- Mucha mayor legibilidad y expresividad

- Composicion funcional: permite encadenar transformaciones como map().filter().reduce()
*/
////////////////
// Ejemplo 1 //
// Aceptamos una funcion como argumento

// 1. Aceptando una funcion como argumento. Funcion de alto nivel que acepta una callback
function funcionAltoNivel(callback) { // Metemos callback como parametro
    console.log("Ejecutando la funcion de alto nivel");
    
    callback(); // Llamada a la funcion callback
}

function funcionCallback() {
    console.log("Ejecutando la funcion callback");
}


funcionAltoNivel(funcionCallback);


// 2. Funcion de alto nivel que devuelve una funcion
function crearSaludo(saludo) {
    // Devolviendo una nueva funcion
    return function(nombre) {
        console.log(`${saludo}, ${nombre}`);
    }
}

// Crear una funcion saludo
const saludaHola = crearSaludo("Hola");
saludaHola("Kevin");


// Creando una funcion despedida
const saludaDespedida = crearSaludo("Chauchis");
saludaDespedida("Jonathan");


// 3. Ejemplo de abstraccion en una HOF
function ejecutarOperacionArray(array, operacion) {
    return array.map(operacion)
}

// Funcion callback que duplica cada elemento en el array
function dobles(numero) {
    return numero * 2;
}

// const numeros = [1, 2, 3, 4, 5];
const numerosDobles = ejecutarOperacionArray(numeros, dobles);
console.log(numerosDobles);


////////////////////////////////////////////////////////
// Funciones de orden superior comunes en JavaScript //

// forEach: Recorre todos los elementos de un array y ejecuta una funcion sobre cada uno
numeros.forEach(function(num) {
    console.log(num * 2);
});


// map: Crea un nuevo array aplicando una funcion a cada elemento del array original
const alCuadrado = numeros.map(num => num ** 2);
console.log(alCuadrado);


// filter: Crea un nuevo array con los elementos que cumplen una condicion
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares);


// reduce: Acumula los valores del array en un solo valor, segun una funcion reductora
const suma = numeros.reduce((total, actual) =>  total + actual, 0);
console.log(suma);


/* Desgranando un ejemplo de HOF

const cuadrados = numeros.map(n => n * n);

1. map es un metodo de array y tambien es una High Order Function

    - Se llama High Order Function porque recibe como argumento otra funcion

2. esta  funcion que recibe se ejecuta una vez por cada elemento del array

    - A esa funcion que recibe map la llamamos callback


3. El callback concretamente es esta funcion
    n => n * n;

    Es equivalente a escribirlo con function

    function(n) {
        return n * n;
    }
*/
const cuadrados = numeros.map(n => n * n);


// Por dentro map, hace algo parecido a esto
function miMap(array, callback) {

    const nuevoArray = [];

    for(let i = 0; i < array.length; i++) {
        nuevoArray.push(callback(array[i], i, array));
    }

    return nuevoArray;
}

/* En nuestro caso haria

- Iteracion 1 -> callback(1) -> 1 * 1 = 1

- Iteracion 2 -> callback(2) -> 2 * 2 = 4

Resultado final:

cuadrados = [1, 4, 9, 16, 25]



Concretamente, el callback en nuestro ejemplo de map es la funcion flecha
    n => n * n

que map invoca internamente para cada elemento del array

*/


// Ejemplo de encadenamiento de HOF (Funciones de Orden Superior)
const usuarios = [
    { nombre: "Jonathan", edad: 30 },
    { nombre: "Mauro", edad: 16 },
    { nombre: "Rocio", edad: 32 },
    { nombre: "Thiago", edad: 37 },
    { nombre: "Arturo", edad: 17 }
];

const mayoresDeEdad = usuarios
    .filter(user => user.edad >= 18)
    .map(user => user.nombre);

console.log(mayoresDeEdad);









/*==========================
    Funciones anidadas
============================

En JavaScript, una funcion anidada es una funcion definida dentro de otra funcion.
Es decir, una funcion interna que vive en el scope o ambito de una funcion externa.

Una funcion anidada es una funcion que:
    - Se declara dentro de otra funcion
    - Tiene acceso a todas las variables y parametros de su funcion externa
    - Puede ser utilizada para organizar mejor el codigo, modularizar la logica o crear closures


Usos comunes:

1. Organizacion del codigo
    En lugar de escribir una gran funcion, se pueden definir sub-funciones internas para modularizar la logica


2. Funciones helper privadas
    Las funciones internas no son accesibles desde fuera, lo cual simula privacidad


3. Generacion de closures
    Las funciones anidadas pueden cerrar sobre valriables de la funcion externa, creando closures

*/

function saludar(nombre) {

    // funcion anidada dentro de saludar()
    function construirMensaje() {
        // Tiene acceso a nombre, aunque no lo definamos adentro, gracias al scope lexico
        return `Hola, ${nombre}`; 
    }

    // ..

    return construirMensaje();
}

console.log(saludar("Rocio"));


// Las funciones anidadas heredan el entorno lexico (lexical scope) de la funcion que las contiene. Esto significa que podemos acceder a las variables de la funcion externa pero no al reves

function externa() {
    let mensaje = "Hola desde fuera";

    function interna() {
        console.log(mensaje);
    }

    interna();
}

externa();


// 1. Organizando el codigo
function procesarTexto(texto) {
    
    function limpiar(t) {
        return t.trim().toLowerCase();
    }

    function contarPalabras(t) {
        return t.split(/\s+/).length;
    }

    const limpio = limpiar(texto);
    return contarPalabras(limpio);
}

console.log(
    procesarTexto("   JAVAscript      ES lo MaS   ")
);


// 2. Funciones helper
function crearUsuario(nombre) {
    function validarNombre(n) {
        return typeof n === "string" && n.length > 2;
    }

    if(!validarNombre(nombre)) {
        throw new Error("Nombre no valido");
    }

    return { nombre };
}


// 3. Generacion de closures
function contador() {
    let cuenta = 0;

    return function() {
        cuenta++;
        return cuenta
    };
}

const incrementar = contador();
console.log(incrementar());
console.log(incrementar());
console.log(incrementar());
console.log(incrementar());






/* =======================
    Destructuring
==========================

El destructuring o desestructuracion es una sintaxis que permite extraer valores de arrays o propiedades de objetos y asignarlos a variables

Es una forma de descomponeer estructuras de datos como arrays y objetos en variables individuales, sin necesidad de acceder manualmente a cada elemento o propiedad

Por que usar destructuring?

- Mejora la legibilidad del codigo
- Facilita el acceso rapido a datos de estructuras complejas
- Reduce la verbosidad (menos lineas para obtener lo mismo)
*/

// Ejemplo sin destructuring
// const numeros = [1, 2, 3, 4, 5];
const uno = numeros[0];
const dos = numeros[1];
console.log(uno, dos);

// Con destructuring
const [primero, segundo, ...resto] = numeros;
console.log(primero, segundo);
console.log(resto)



// Sin destructuring
const alumno = { nombre: "Alejo", edad: 25 };
const nomb = alumno.nombre;
const anios = alumno.edad;

// Con destructuring
let { nombre, edad } = alumno;
console.log(nombre, edad);


// Destructuring en parametros de funcion
function saludo({nombre, edad}) {
    console.log(`Holis ${nombre}, tenés ${edad} años, sos un pibe!`);
}

saludo(alumno);


// Destructuring de arrays con valores omitidos
let [prim, ,terc] = [10, 20, 30];
console.log(prim, terc);


// Rest operator con destructuring
let [a, ...sobrante] = [1, 2, 3, 4, 5];
console.log(a);
console.log(sobrante);


let {nom, ...otros} = { nom: "Jero", edad: 23, pais: "Argentina" };
console.log(otros);






/*=======================
    Spread Operator
=========================

El spread operator en JavaScript -> ...

Es una sintaxis introducida en ES6 que permite descomponer elementos iterables como arrays, string y objetos en elementos individuales.

Su principal funcion es copiar, combinar o expandir estructuras de datos de manera eficiente


Que nos permite el Spread Operator?

    - Manipulacion de arrays (copiar, concatenar)

    - Combinacion de objetos 
    
    - Paso de argumentos a funciones
*/

const original = [1, 2, 3];
const copia = [...original];

// No es una referncia, cambios en copia no afecta a original
console.log(copia);

// Concatenando arrays -> mucho mas eficiente que concat()
const continuacion = [4, 5, 6];
const combinado = [...original, ...continuacion];
console.log(combinado);


// Convertimos strings en arrays sin usar split('')
const string = "Holis";
const caracteres = [...string];
console.log(caracteres);



///////////////////////////////////////
// Rest Operator vs Spread Operator //
// rest operator -> agrupar lo que sobra.
const nums = [1, 2, 3, 4];
const [prime, ...rest] = nums;

//spread operator -> expandir elementos
const persona = { nombre: "Kevin", edad: 23 };
const copiaPersona = { ...persona, ciudad: "Buenos Aires" };

console.log(copiaPersona);


// Combinamos objetos
let estandar = { tema: "oscuro", fontSize: 14 };
let preferenciasUser = { fontSize: 18 };
let preferenciasCustom = { ...estandar, ...preferenciasUser };
console.log(preferenciasCustom);


// Spread operator en funciones

// Pasamos argumentos desde un array
function sum (a, b, c, d) { return a + b + c + d };
// const nums = [1, 2, 3, 4];
console.log(sum(...nums));

// Recogemos argumentos restantes
function logArguments(primero, ...resto) {
    console.log(primero);
    console.log(resto);
}

logArguments("a", "b", "c");





/*======================
    Closures
========================
Una closure es una funcion que recuerda el scope en el que fue creada, incluso despues de que se haya finalizado su ejecucion.

Por tanto, una funcion interna puede acceder a las variables de su funcion externa incluso despues de que esta haya terminado de ejecutarse

Cada vez que creamos una funcion dentro de otra funcion, se crea una closure. La funcion interna captura las variables de su entorno (scope) externo y mantiene una referencia a ellas (no una copia)


Ejemplo crearContador:

    - crearContador retorna una funcion interna anonima
    - esta funcion RECUERDA la variable contador aunque crearContador ya termino su ejecucion
    - cada vez que llamamos a contar, estamos invocando la misma closure que manitiene su propio estado interno

Una closure ocurre cuando una funcion interna accede a variables de su funcion externa, incluso cuando la externa termino de ejecutarse. Las closures nos permiten

    - Recordar valores sin usar variables globalbes
    - Crear funciones privadas
    - Hacer el codigo mas limpio y modular
*/

function crearContador() {
    let contador = 0;

    return function() {
        contador++;
        return contador;
    }
}

const contar = crearContador();

console.log(contar()); // 1
console.log(contar()); // 2
console.log(contar()); // 3
console.log(contar()); // 4 
console.log(contar()); // 5



/* ====================
    Callbacks parte 2
=======================

Ejemplo asincronico con setTimeout

setTimeout es una funcion que acepta un callback (una funcion a ejecutar)

No detiene la ejecucion del codigo. En su lugar, el callback se ejecuta despues del tiempo indicado, cuando el event loop lo permite


Ventajas de los callbacks

    - Permiten la modularidad del codigo (pasar funciones como argumentos)
    - Permiten controlar el flujo en entornos asincronicos
    - Son la base de abstracciones mas complejas como promesas y async/await
*/

console.log("Inicio");

setTimeout(() => {
    console.log("Esto se ejecuta despues de 2 segundos")
}, 2000);

console.log("Fin");

/* Ejemplo callbacks sincronicos

    - Estos callbacks se ejecutan inmediatamente dentro del mismo ciclo de ejecucion
    - Usados en funciones como forEach, map, filter, etc
*/
[1, 2, 3].forEach(n => {
    console.log(n);
});


/* Ejemplo callback asincronico

    - Estos callbacks se ejecutan despues de un tiempo o de que termine una operacion externa
    - Son fundamentales en programacion asincronica como AJAX
*/

setTimeout(() => {
    console.log("Tarea asincronica completada");
}, 1000);






/*==================
    Callback Hell
====================

Hadouken de callback hell https://blog.da2k.com.br/uploads/2015/03/hadouken.jpg

El callback hell ocure cuando tenemos muchas funciones anidadads dentro de otras, especialmente cuando hacemos tareas asincronicas, como leer archivos, esperar respuestas del servidor.

El codigo se vuelve dificil de leer, dificil de mantener y facil de romper


Como podemos solucionar esto?

1. Usando Promise

    hacerAlgo()
        .then(res1 => hacerAlgoMas(res1))

        .then(res2 => continuar(res2))

        .then(res3 => terminar(res3))

        .then(() => console.log("Listo!"))

        .catch(error => console.error(error));


2. Usando async/await (mas moderno y legible)

async function ejecutarTareas() {

    try {
        const res1 = await hacerAlgo();

        const res2 = await hacerAlgoMas(res1);

        const res3 = await continuar(res2);

        await terminar(res3);

        console.log("Listo!");
    
    } catch(error) {

        console.error(error);
    }
}
*/

// Ejemplo de callback hell con setTimeout
// Cada setTimoeut depende del anterior, y termina siendo un codigo feo y poco manejable
setTimeout(() => {
    console.log("Paso 1");

    setTimeout(() => {
        console.log("Paso 2");

        setTimeout(() => {
            console.log("Paso 3")

            setTimeout(() => {
                console.log("Paso 4"); 
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000);
// Nuestro codigo termina siendo una escalera confusa y dificil de depurar




// Ejemplo con Promesas (sintaxis clasica)

fetch("https://jsonplaceholder.typicode.com/users") // Traemos el choclo JSON de una URL

    .then(response => response.json()) // Transformamos el JSON en objetos JavaScript

    .then(data => console.table(data)) // Mostrarmos nuestros objetos JavaScript por consola

    .catch(error => console.error(error)); // Si hubiera un error, lo mostraria en consola con un formato error



// Ejemplo con async/await (sintaxis moderna)
async function obtenerDatos() {
    try {

        // Traemos el choclo JSON de una URL
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        // Transformamos el JSON en objetos JS
        const data = await res.json();

        // Mostramos nuestros objetos JS por consola
        console.table(data);


    } catch(err) {
        // Si hubiera un error, lo mostraria en consola con un formato error
        console.error(err);
    }
}

obtenerDatos();


/* EXTRA: En Linux podemos hacer otro tipo de solicitudes para, por ejemplo, descargarnos paginas web enteras, wget y curl

Qué es wget -> Comando de descarga de archivos en internet

Wget es una herramienta de línea de comandos gratuita y de software libre desarrollada por el Proyecto GNU, diseñada para recuperar archivos desde Internet utilizando los protocolos HTTP, HTTPS, FTP y FTPS (desde la versión 1.18)  Es una herramienta no interactiva, lo que significa que puede ejecutarse sin intervención del usuario, lo que la hace ideal para su uso en scripts, tareas programadas (cron) o en entornos sin interfaz gráfica  Su nombre es una combinación de "World Wide Web" y "get", refiriéndose a la acción de obtener archivos  Wget está disponible en múltiples sistemas operativos, incluyendo Linux, macOS y Windows, y es especialmente útil para administradores de sistemas y desarrolladores debido a su capacidad para automatizar descargas, replicar sitios web y manejar descargas complejas  En la mayoría de las distribuciones de Linux, como Debian y Ubuntu, wget viene preinstalado, aunque puede instalarse fácilmente con gestores de paquetes como `apt-get` si no está presente 


Ver tabla comparativa en el README! */


/* Aplicacion CRUD

C: Create / Crear
R: Read / Leer
U: Update / Actualizar
D: Delete / Eliminar
*/





/*================================
    Web APIS
==================================

API (Application Programming Interface) o Interfaz de Programacion de Aplicaciones

Una API es un conjunto de funciones y herramientas que usamos para interactuar con algo, sea el navegador, el servidor o una libreria.


Una web API, en el contexto del navegador (Firefox, Chrome, ble), una Web API es una funcion o conjunto de funciones que el navegador nos proporaciona para usarlas con JavaScript.

El lenguaje JavaScript tal cual es más plano y limitado, pero el entorno de ejecución nos va a permitir funciones y utilidades extra, para acceder a funcionalidades especiales, como:

    - document Accede al DOM (HTML) y nos lo proporciona el navegador

    - setTimeout() Ejecuta una funcion despues de un tiempo y el navegador proporciona esa API

    - fetch() Hace peticiones HTTP y nos la proporciona el navegador

    - console.log() Muestra informacion por consola, y nos la proporciona el navegador

    - localStorage: Guarda datos en el navegador, y nos la proporciona el navegador

    - Trabajar con audio, video, GPS, etc


- JavaScript es el lenguaje
- Las Web APIs son funciones extra que el navegador le presta a JavaScript para hacer cosas utiles
- JavaScript usa estas herramientas, pero son externas al lenguaje puro en si


Por que fetch es una API?
    - Ojo, fetch es una API, porque no es parte del lenguaje JavaScript "puro"
    
    - Es una funcion que el navegador le da a JavaScript para que pueda hacer peticiones a servidores web
    
    - Por eso decimos que es una web api que el navegador expone


setTimeout tambien es una API!
    - setTimeout() no es parte del nucleo de JavaScript, pero el navegador lo agrega como una herramienta para que los desarrolladores lo usen

    - Por eso, cuando usamos setTimeout, realmente estamos usando una API del entorno de ejecucion del navegador (no de JavaScript puro)


En resumen:

    - API: Un conjunto de funciones para interactuar con algo

    - Web API: Funciones que el navegador le ofrece a JavaScript

    - fetch(): Web API para hacer peticiones HTTP

    - setTimeout(): Web API para ejecutar codigo con demora

    - JavaScript usa Web APIs, pero no estan dentro del lenguaje sino que las define el navegador


// Para chusmear compatibilidad entre navegadores: https://caniuse.com/?search=json



===============================================
    Los tipos de Web APIs mas comunes
===============================================

1. APIs del DOM (Document Object Model)
Permiten acceder y modificar el HTML y CSS de la pagina
Manipulacion de elemntos, eventos, clases, estilos, etc

    - document.querySelector()
    - element.addEventListener()
    - classList.add()




2. APIs de red
Permiten comunicarnos con servidores o cargar recursos
Peticiones HTTP, chats, notificaciones en timpo real

    - fetch() la mas moderna
    - XMLHttpRequest antigua
    - WebSocket para comunicion en tiempo real
    - EventSource (Eventos enviados por el servidor)




3. APIs de almacenamiento
Guardar informacion en el navegador
Guardar preferencias, datos de sesion, apps sin conexion

    - localStorage
    - sessionStorage
    - indexedDB
    - Cookies (mediante document.cookie)



4. Timers
Ejecutar funciones luego de un cierto tiempo
Retrasos, animaciones, etc

    - setTimeout()
    - setInterval()
    - clearTimeout() y clearInterval()



5. APIs de Dispositivos y Multimedia
Interaccion con hardware o medios
Apps moviles, camara, permisos, grabaciones, notificaciones

    - navigator.geolocation: para el GPS
    - MediaDevices.getUserMedia(): microfono y camara
    - Notificacion: Notificaciones del sistema
    - Battery API, Clipboard API



6. APIs de interfaz grafico
Controlan animaciones, graficos y visualizacion
Juegos, visualizaciones, graficos dinamicos
    - Canvas API
    - WebGL
    - Fullscreen API
    - Screen Orientation API



7. APIs de Workers y ejecucion
Permiten ejecutar codigo en segundo plano
Procesos paralelos, apps progresivas sin bloquear la interfaz
    - Web Workers
    - Service Workers
    - Shared Workers
*/
```

![Callback hell Hadouken](https://blog.da2k.com.br/uploads/2015/03/hadouken.jpg)


## Diferencia entre `curl` y `wget` en Linux

`curl` y `wget` son dos herramientas esenciales en Linux para transferir datos desde/hacia servidores, pero están diseñadas con enfoques distintos. **`wget` es ideal para descargas simples, recursivas y automatizadas**, especialmente de sitios web completos, gracias a su facilidad de uso y manejo automático de redirecciones y reintentos. Por otro lado, **`curl` es más versátil y potente**, actuando como un cliente multiprotocolo que permite interactuar con APIs, enviar datos mediante POST, personalizar cabeceras y trabajar con más de 25 protocolos, lo que lo convierte en la opción preferida para tareas avanzadas de red y desarrollo.

Aunque ambas pueden descargar archivos vía HTTP/HTTPS/FTP, sus diferencias clave radican en su propósito: **`wget` se centra en la descarga robusta y automatizada**, mientras que **`curl` destaca en la interacción flexible con servicios en red**.

## Comparación detallada: curl vs wget

La siguiente tabla resume las principales diferencias funcionales entre ambas herramientas:

| Característica | `curl` | `wget` |
|----------------|--------|--------|
| **Propósito principal** | Transferencia de datos bidireccional, interacción con APIs | Descarga de archivos, especialmente masiva y recursiva |
| **Soporte de protocolos** | Más de 25: HTTP(S), FTP(S), SCP, SFTP, SMTP, IMAP, POP3, LDAP, MQTT, TELNET, etc. | Principalmente HTTP, HTTPS, FTP |
| **Descarga recursiva** | No soportada | Sí, permite descargar sitios completos (`--mirror`) |
| **Salida por defecto** | Muestra el contenido en `stdout` (terminal) | Guarda automáticamente el archivo en disco |
| **Resumen de descargas** | Requiere `-C -` | Automático con `-c` |
| **Personalización de cabeceras HTTP** | Sí, con `-H` | Limitado |
| **Envío de datos (POST, PUT, etc.)** | Sí, ideal para APIs (`-X POST`, `-d`) | Soporta POST, pero menos flexible |
| **Autenticación** | Soporta múltiples métodos: Basic, Digest, NTLM, OAuth, AWS, etc. | Básica (Basic, Digest) |
| **Uso de proxies** | Sí, incluyendo SOCKS4/5 y HTTPS a través de proxy | Solo HTTP/HTTPS, sin SOCKS |
| **Descargas en paralelo** | Sí, con `--parallel` (versiones recientes) | No |
| **Descompresión automática** | Sí (gzip, brotli, zstd, deflate) | No |
| **Licencia** | MIT (más permisiva) | GPL v3 |
| **Preinstalado en sistemas modernos** | Sí (macOS, Windows 10/11) | Generalmente solo en Linux |
| **Biblioteca subyacente** | `libcurl` (usada en muchos programas) | No tiene biblioteca, solo CLI |



## ¿Cuándo usar cada herramienta?

### Usa `wget` cuando:
- Necesitas **descargar un sitio web completo** (mirroring).
- Quieres **automatizar descargas con `cron`**.
- Trabajas con **conexiones inestables** (reintentos automáticos).
- Prefieres comandos simples y directos.
- Solo necesitas **HTTP, HTTPS o FTP**.

**Ejemplo**:  
```bash
wget --mirror --convert-links https://ejemplo.com
```

### Usa `curl` cuando:
- Debes **interactuar con una API REST**.
- Necesitas **enviar datos con POST, PUT, etc.**.
- Requieres **personalizar cabeceras o autenticación avanzada**.
- Trabajas con **múltiples protocolos** (SMTP, IMAP, SFTP, etc.).
- Quieres **procesar la salida con otras herramientas** (porque por defecto imprime en `stdout`).

**Ejemplo**:  
```bash
curl -X POST -H "Content-Type: application/json" -d '{"user":"test"}' https://api.ejemplo.com/login
```



## Conclusión
En resumen, **`wget` es la herramienta perfecta para descargas simples, recursivas y confiables**, especialmente en entornos de automatización. En cambio, **`curl` es el Swiss Army Knife de las transferencias de datos**, indispensable para desarrollo, pruebas de APIs y tareas que requieren flexibilidad y control detallado. La elección depende del caso de uso: si necesitas bajar un sitio entero, ve por `wget`; si estás interactuando con servicios web o APIs, `curl` es tu mejor aliado.


---

## JavaScript VI / Manipulacion del DOM en JavaScript y Eventos

```js
/* =================================
    Manipulacion del DOM en JS
====================================

Que es el DOM?__________________

- DOM o Modelo de Objetos del Documento, es una representacion en memoria de la estructura de una pagina web. Transforma el HTML en una estructura de nodos y objetos que puede ser manipulada mediante JavaScript

- Cada etiqueta HTML es un nodo en el DOM

- El DOM permite que JavaScript modifique el contenido, la estructura y el estilo de una pagina

- https://www.w3schools.com/js/js_htmldom.asp


Ejemplo de estructura DOM_________

<!DOCTYPE html>
<html>
    <head>
        <title>Mi página</title>
    </head>
    <body>
        <h1>Bienvenidos</h1>
        <p>Este es un párrafo</p>
    </body>
</html>


Este HTML seria representado en el DOM como una estructura en forma de arbol
document es el objeto que representa toda la pagina web

Diagrama de arbol del DOM_________

- document
    -html
        - head
            - title
    -body
        - h1
        - p


Como funciona la manipulacion del DOM?

- JavaScript puede acceder y modificar cualquier elemento del DOM, utilizando el objeto global document.

- JavaScript puede:
    - Modificar el contenido (textos, atributos, clases, etc)
    - Añadir o eliminar elementos del DOM
    - Escuchar eventos del usuario (clics, teclas, etc)




=====================================
    Seleccion de elementos del DOM
=====================================

getElementById()
    - Este metodo selecciona un unico elemento por su id. Si no lo encuentra, devuelve null
    - Solo selecciona el primer elemento que coincida con el id


querySelector() y querySelectorAll()
    - querySelector() selecciona el PRIMER elemento que coincida con un selector CSS (por clase, id, nombre etiqueta)

    - querySelectorAll() selecciona TODOS los elementos que coinciden con el selector CSS y devuelve una NodeList (similar a un array)


EXTRA
    - getElementsByClassName(): Seleccioan TODOS los elementos que tengan una clase espcifica
    - getElementsByTagName(): Seleccionamos todos los elementos de un tipo de etiqueta dado



========================================
    Modificar contenido y atributos
========================================

Una vez que seleccionamos un elemento, podemos modificar su contenido, atributos o estilo

- textContent: Modificar el texto dentro de un elemento

- innerHTML: Modificar el contenido HTML dentro de un elemento

- setAttribute: Modificar los atributos de un elemento

- style: Permite cambiar el estilo CSS en linea de un elemento
*/
 
// getElementById
let titulo = document.getElementById("titulo");

console.log(titulo); // <h1 id="titulo">Leccion JavaScript</h1>
console.log(titulo.textContent); // Leccion JavaScript


// querySelector
let primerParrafo = document.querySelector(".mensaje");
console.log(primerParrafo.textContent); // Primer parrafo

// querySelectorAll
let parrafos = document.querySelectorAll(".mensaje");
console.log(parrafos);
console.log(parrafos[0]);

parrafos.forEach(parrafo => console.log(parrafo.textContent));
console.log(document);



let parrafoInfo = document.getElementById("parrafo-info"); 

// Modificamos el contenido del texto con document.textContent
parrafoInfo.textContent = "Nuevo texto modificado por Javascript";

// Modificamos el contenido del parrafo que seleccionamos por su clase
primerParrafo.textContent = "Soy un flamante parrafo seleccionado por clase"


// Modificamos el HTML
primerParrafo.innerHTML = `
    <strong>Soy un parrafo en negrita modificado</strong>
    <i>Con multiples etiquetas internas</i>
    `;


// Paso 1. Guardamos en una variable el elemento
let miParrafo = document.getElementById("miParrafo");

// Paso 2. Podemos modificar este elemento a partir de su variable

miParrafo.textContent = "Nuevo parrafo desde JavaScript";

miParrafo.innerHTML = `Nuevo parrafo modificado desde <span class="destacado">JavaScript</span>`;


// RECONTRA EXTRA: (recien lo vemos en JavaScript VIII en detalle) Consumimos informacion de internet, gracias a la Web API fetch
// Ejemplo de usuarios de una API Rest publica https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
let infoUsuarios = document.getElementById("infoUsuarios");

// Traemos el choclo de informacion en texto plano JSON
fetch("https://jsonplaceholder.typicode.com/users") 
    .then(response => response.json())
    .then(data => {
        console.table(data);

        let htmlDinamico = "<ul>";

        data.forEach(usuario => {
            htmlDinamico += `<li>${usuario.username}</li>`
        });

        htmlDinamico += "</ul>";

        console.log(htmlDinamico);

        infoUsuarios.innerHTML = htmlDinamico;
    });


// Modificacion de atributos
let miBoton = document.getElementById("miBoton");

miBoton.setAttribute("id", "nuevoId");

miBoton.style.backgroundColor = "dodgerblue";
miBoton.style.color = "white";


// TO DO EXTRA: Si da tiempo y vamos bien, al termino de la cursada createElement(), appendChild(), removeChild() y comparacion entre textContent y innerHTML



/*==========================
    Eventos en JavaScript
============================

Un evento es la señal que se envia cuando ocurre una interaccion o cambio en el documento
Estos eventos pueden ser un click, una pulsacion de tecla, etc
JavaScript permite escuchar estos eventos y ejecutar funciones especificas cuando ocurren

- click:        Ocurre cuando el usuario hace click sobre un elemento
- mouseover:    Ocurre cuando el usuario pasa el mouse sobre un elemento
- input:        Cuando el usuario introduce texto en un campo
- submit:       Ocurre cuando se envia un formulario

Para escuchar un evento y responder a el, podemos usar el metodo de addEventListener()
Este metodo permite adjuntar una funcipon a un evento especifico en un elemento

addEventListener -> Añadir escuchador de eventos



================================
    Tipos comunes de eventos
================================

- Eventos de mouse:         click, dbclick, mouseover, mouseout, mousemove
- Eventos de teclado:       keydown, keyup
- Eventos de formulario:    submit, input, focus
- Eventos de ventana:       resize, scroll, load
*/

// Seleccionamos el elemento boton y vamos a hacer que reaccione a los clicks
miBoton.addEventListener("click", function() {
    console.log("Holis soy un boton");
});


let inputPrueba = document.getElementById("inputPrueba");

// Cuando quiero tener informacion o metodos del evento
inputPrueba.addEventListener("keydown", function(event) { 

    // event es el objeto que contiene TODOS los datos del evento
    console.log(`Tecla presionada: ${event.key}`);
});



/* ===========================
    Propagacion de eventos
==============================

Cuando ocurre un evento, este se propaga a traves del DOM en dos fases:

    - fase de captura (de arriba para abajo)
    - fase de burbuja (de abajo hacia arriba)

Podemos detener la propagacion de eventos con el metodo event.stopPropagation()

Podemos evitar el comportamiento determinado de un elemento con event.preventDefault()
*/

let divPadre = document.getElementById("padre");
let botonHijo = document.getElementById("hijo");

// Escuchar el click en el div padre
divPadre.addEventListener("click", function() {
    console.log("Se hizo click en el div padre");
});

// Escuchamos el click en el boton hijo
botonHijo.addEventListener("click", function(event) {
    event.stopPropagation(); // Detenemos la propagacion con el metodo stopPropagation
    console.log("Se hizo click en el boton hijo");
});


let miForm = document.getElementById("miForm");

miForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evito que el formulario se envie
    console.log("Formulario no enviado");
})



/* ============================================
    Almacenamiento persistente en JavaScript
===============================================

JavaScript nos permite ciertas funcionalidades extra para poder recordar información y que esta persista del lado del cliente.
Los tres metodos principales para el almacenamiento en el cliente (quiere decir que la información no se guarda en el servidor), son localStorage, sessionStorage y las cookies


========================
    localStorage
========================
localStorage es una API (funcionalidad extra que complementa JavaScript) que permite almacenar datos de manera persistente en el navegador.
Casos de uso: Almacenar configuraciones de usuario, temas, carrito de compras,etc

localStorage.setItem("tema", "oscuro");
localStorage.setItem("idioma", "es");

- Capacidad de almacenamiento: 5-10 MB
- Persistencia: No tiene expiracion, esta disponible incluso cerrando el navegador o apagando la compu
- Accesible solo desde JavaScript (no se envia al servidor)
- Los datos se almacenan por dominio, y solo son accesibles dentro del mismo dominio
- Los datos se almacenan como strings: Todos los datos almacenados en local son de tipo string, por lo que para almacenar otros tispo de datos, deben ser convertidos a strings 


    localStorage.setItem("clave", "informacion texto plano");

    localStorage.getItem("clave");

    localStorage.removeItem("clave");

    localStorage.clear();


=========================
    sessionStorage
=========================
sessionStorage es otra API muy similar a localStorage con una diferencia clave: los datos almacenados solo se mantienen disponibles durante la sesion del navegador. Si cerramos la pestaña o ventana del navegador, los datos se eliminar automaticamente.
Uso tipico: Informacion de formularios o usuarios temporales

sessionStorage.setItem("usuarioTemporal", "Rocio");


- Capacidad de almacenamiento: 5-10 MB
- Persistencia: Solo durante la sesion activa. Si se cierra la pestaña, los datos se pierten
- Accesible solo desde JavaScript (no se envia al servidor)
- Los datos se almacenan por dominio, y solo son accesibles dentro del mismo dominio
- Los datos se almacenan como strings: Todos los datos almacenados en local son de tipo string, por lo que para almacenar otros tispo de datos, deben ser convertidos a strings 


    sessionStorage.setItem("clave", "informacion texto plano");

    sessionStorage.getItem("clave");

    sessionStorage.removeItem("clave");

    sessionStorage.clear();



Cuando no usar nunca localStorage o sessionStorage?
- Nunca guardemos informacion sensible como contraseñas o tokens de autenticacion. No seria seguras ya que el contenido es accesible desde cualquier script en la pagina

- En ese caso, usariamos cookies seguras con HttpOnly y Secure


=========================
    Cookies
=========================
Las cookies son pequeños fragmentos de informacion que se almacenan en el navegador del usuario y se envian con cada peticion HTTP al servidor. Son mas antiguas que localStorage y sessionStorage y fueron ampliamente utilizadas para mantener la sesion del usuario, guardar preferencias, entre otros usos

Caracteristicas:
- Se envian automaticamente al  servidor con cada solicitud HTTP
- Tamaño maximo: 4KB
- Expiran seguin una fecha determinada (expires) o duracion (max-age)
- Se pueden marcar con HttpOnly (accesibles solo desde el servidor) y Secure (Solo sobre HTTPS)

Uso principal:
- Autenticacion (tokens, sesion)
- Preferencias del uusario que deben ser enviadas al servidor
- Seguimiento (tracking) de actividad en la web


No existe una API estandar para gestionar cookies, pero las manejamos con el objeto document.cookie
Usaremos Cookies, en lugar de localStorage o sessionStorage si estamos trabajando con limites mas estrictos en tamaño o seguridad


    
==========================
    Metodos de JSON
==========================
- Para poder transformar texto plano JSON a objetos JavaScript, usaremos JSON.parse()

- Para poder transformar objetos JavaScript a texto plano JSON, usaremos JSON.stringify()
*/


///////////////////////////////////
// Guardamos datos en localStorage
localStorage.setItem("nombre", "Kevin"); // De la misma manera que hacemos con objetos, guardamos la info con la clave nombre


///////////////////////////////////
// Obtenemos datos del localStorage -> devTools / Application o Almacenamiento / Local Storage
let nombre = localStorage.getItem("nombre");
console.log(nombre);


//////////////////////////////////////////////////////
// Conversion de datos para almacenar en localStorage

// Como carrito es un array de objetos, guardado como string (texto plano) -> JSON
// Necesitamos convertir a objetos JavaScript nuestro string JSON (formato de texto plano)
let carrito = JSON.parse(localStorage.getItem("carrito")); 
console.table(carrito);

// Creamos un objeto estudiante
let estudiante = {
    nombre: "Rocio",
    cuadro: "Club Atletico Imparcial de Tucuman"
};

// Convertimos nuestro objeto estudiante en texto plano JSON para poder almacenarlo en localStorage
localStorage.setItem("estudiante", JSON.stringify(estudiante));

console.log(localStorage.getItem("estudiante")); // String: {"nombre":"Rocio","cuadro":"Club Atletico Imparcial de Tucuman"}

// Quiero traer mi clave estudiante desde localStorage, almacenado en formato JSON
let estudianteAlmacenado = JSON.parse(localStorage.getItem("estudiante"));

console.log(estudianteAlmacenado); // Objeto: { nombre: 'Rocio', cuadro: 'Club Atletico Imparcial de Tucuman' }


/////////////////////////////////////////////////
// Eliminar un dato especifico del localStorage
localStorage.removeItem("nombre");



/////////////////////////////////
// Limpiar todo el localStorage
// localStorage.clear();


// TODO: Practiquen a almacenar el carrito de compra



/* =================
    Cookies
==================*/
// Creamos una cookie
document.cookie = "usuario=Kevin; expires=Fri, 31 Dec 2025 23:59:59 UTC; path=/";

// Creamos una cookie sin expiracion (se eliminara al cerrar el navegador)
document.cookie= "pais=Argentina; path=/";

// Leemos las cookies
console.log(document.cookie);

// Eliminamos las cookies (ponemos una fecha de expiracion en el pasado)
// document.cookie = "usuario= ; 01 Jan 1970 00:00:00 UTC; path=/"


// Ejemplo completo de uso de cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Obtener el valor de una cookie
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

// Establecemos una cookie
setCookie("idioma", "es", 7);

// Leemos una cookie
console.log(getCookie("idioma"));
```
---

## JavaScript V / Objetos, clases y objetos globales. Almacenamiento persistente, iteracion en arrays, iteracion en objetos e iteracion en arrays de objetos
```js
/* =============================
    Objetos en JavaScript
================================

- Los objetos en JavaScript son colecciones de pares clave-valor. Se usan para representar datos complejos en una en una estructura facil de gestionar

- Un objeto se define usando llaves {} y contiene propiedades (valores asignados a las claves) -> Pares clave - valor
*/

// Objeto literal o object literal: La manera mas comun de crear objetos en javaScript
let auto = {
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2021,
    getInfo: function() {
        return `Este auto es un ${this.marca} del año ${this.anio}`;
    }
};

// Accedemos a las propiedades usando notacion de puntos (objeto.propiedad) o la notacion de corches (objeto["propiedad"])
console.log(auto.marca);
console.log(auto["anio"]);

// Los objetos pueden contener funciones, conocidas como metodos
// this: hace referencia al objeto desde el cual se esta invocando el metodo
console.log(auto.getInfo());



/* ===========================================================
    Objetos globales en JavaScript: Navegador y Node.js
==============================================================

- Los objetos globales son aquellos que están disponibles en todo el entorno de ejecución sin necesidad de importarlos o declararlos explícitamente.

- Su propósito es facilitar el acceso a ciertas funciones y valores predeterminados


==============================================================
Objetos globales en el navegador

- En el entorno del navegador, los objetos globales incluyen todos los objetos estandar de JavaScript (Array, String, Object), asi como un conjunto de objetos especificos para la interaccion con la pagina web y su entorno

1. window
- El objeto global principal en el entorno del navegador es window.

- Este objeto representa la ventana del navegador y actua como el contenedor global para todas las variables, funciones y objetos globales en una pagina web

- Todos los objetos, variables y funciones definidos en el ambito global estan automaticamente disponibles como propiedades del objeto window

    document
    alert(), prompt(), confirm()
    setTimeout() y setInterval()
    location
    navigator
    console
*/

// document: representa el DOM de la pagina web actual, permitiendo al acceso y la manipulacion de elementos HTML
let parrafoInfo = document.getElementById("parrafo-info");
console.log(parrafoInfo);


// alert(), prompt(), confirm(): Mostrar dialogos o pedir input al usuario

// setTimeout() y setInterval()
//setInterval(() => console.log("Hola despues de 1 segundo"), 1000);

// location: Proporciona info sobre la URL actual de la pagina y nos permitira redireccionar a otras URL
console.log(window.location.href); // Url actual

// navigator: Contiene informacion sobre el navegador, como la version, el agente de usuario y la geolocalizacion
console.log(navigator.userAgent);

// console: Proporciona acceso a la consola del navegador para msotrar mensajes de depuracion
console.log("Mensaje en la consola");



/*==============================================================
Objetos globales en Node.js

- En Node.js, el entorno de ejecucion no tiene un objeto window como en los navegadores. En su lugar, existen otros objetos globales diseñados para trabajr con servidores, archivos y otros aspectos del SO

- global: El objeto principal en Node.js es global, equivalente a window en el navegador

    process: Proporcionar informacion y control sobre el proceso de ejecucion de Node.js
    
    __dirname y __filename: Variabels globales que contienen la ruta al directorio actual y al archivo actual

    setTimeout() y SetInterval()

    require(): Para improtar modulos en Node.js, lo que nos permite cargar bibliotecas externas o modulos internos en el archivo

    console
*/


/* ============================================
    Almacenamiento de datos en JavaScript
===============================================

- En JavaScript, almacenar datos implica elegir la estructura adecuada de acuerdo con el tipo de info que se quiere guardar y como se desea manipular

- JavaScript proporciona varios tipos de estructuras para almacenar datos

    - Variables simples:    Valores unicos como numeros y cadenas
    - Objetos:              Para representar datos complejos con propiedades
    - Arrays:               Para almacenar una lista de elementos, idealmente del mismo tipo
    - Arrays de objetos:    Para manejar listas de elementos complejos que contienen multiples propiedades
*/

// Objeto persona
let persona = {
    nombre: "Juan",
    edad: 30,
    ocupacion: "Ingeniero"
}

/* ===============================================
Objeto simple: Para una unica entidad
- persona es un objeto que almacena varias propiedades de una persona.
- usamos este tipo de almacenamiento cuando queremos acceder a atributos especificos de una unica entidad. 
- Es muy util para representar conceptos unicos en la aplicacion

Cuando usar objetos
- Cuando deseamos representar una entidad unica con multiples atributos
- Cuando sabemos que no habra multiples instancias o copias de estos datos en la aplicacion
- Cuando necesitamos acceder a propiedades especificas mediante sus nombres


===============================================
Array simple: Idealmente para listas sencillas de datos primitivos 
- Para una lista ORDENADA de elemntos individuales (lista de nombres o identificadores), donde cada elemento no requiere atributos adicionales


===============================================
Arrays de objetos
- Si necesitamos almacenar varias instancias del mismo tipo de entidad (lista de personas, productos, pedidos), es muy comun utilizar un array de objetos

-Un array de objetos es una estructura que permite almacenar multiples objetos, donde cada objeto tiene la misma estructura o contiene atributos similares

Cuando usar arrays de objetos
- Cuando necesitamos almacenar multiples instancias de una misma entidad o estructura de datos
- Cuando planeamos realizar operaciones sobre una lista de elementos
- Si necesitamos aplicar metodos de los arrays como map, filter, reduce, find, etc
*/

let personas = [
    { nombre: "Juan", edad: 30, ocupacion: "Ingeniero"},
    { nombre: "Maria", edad: 25, ocupacion: "Ingeniera"},
    { nombre: "Carlos", edad: 35, ocupacion: "Diseñador"}
];


/* =====================================================
    Iteracion en arrays, objetos y arrays de objetos
========================================================

Iteracion en arrays: Arrays como una lista ordenada de elementos accesibles por indice

Bucle for tradicional
    - Maximo control, podemos usar break y continue
    - Mas verboso


forEach()
    - Sintaxis mas limpia, no necesita contador
    - No se puede romper el bucle (no break)


map()
    - Transformamos cada elemento
    - Retorna un nuevo array con los resultados


filter()
    - Seleccionar elementos que cumplan una condicion
    - Retorna nueva array con elementos filtrado


reduce()
    - Reduce el array a un unico valor
    - Retorna el valor acumulado
    - https://www.w3schools.com/jsref/jsref_reduce.asp


find() y findIndex()
    - Busca el primer elemento que cumpla una condicion
    - Retorna ese elemento o indice (con undefined o -1 si no lo encuentra)


for...of
    - Proporciona una sintaxis limpia, permite break y continue
    - No provee indice automatico


some() y every()
    - Verifican si alguno/todos cumplen una condicion
    - Retornan un booleano
*/

//////////////////////
// for tradicional //

// Sumar elementos en array simple
const numeros = [1, 2, 3, 4, 5];
let suma = 0;

for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}

console.log(suma);

// Buscar elemento en array simple
const frutas = ["manzana", "banana", "naranja"];
let frutaEncontrada = null;
// frutas[0] -> manzana

for (let i = 0; i < frutas.length; i++) {
    if(frutas[i].startsWith("ban")) {
        frutaEncontrada = frutas[i];
        break;
    }
}

console.log(frutaEncontrada);


// Filtrar objetos en array de objetos
const productos = [
    { id: 1, nombre: "Laptop", precio: 1000 },
    { id: 2, nombre: "Mouse", precio: 20 },
    { id: 3, nombre: "Teclado", precio: 50 },
    { id: 4, nombre: "Impresora", precio: 500 },
    { id: 5, nombre: "Placa video", precio: 600 },
    { id: 6, nombre: "Monitor", precio: 200 }
];

// productos[2].nombre; // Mouse
// productos[0].precio; // 1000

const productosCaros = [];

for (let i = 0; i < productos.length; i++) {
    if(productos[i].precio > 200) {
        productosCaros.push(productos[i]);
    }
}

console.log(productosCaros);



//////////////
// forEach //

// Imprimir elementos
const colores = ["rojo", "azul", "verde"];

colores.forEach(color => console.log(color));


// Modificar array externo
const listaNumeros = [1, 2, 3];
const dobles = [];
listaNumeros.forEach(numero => dobles.push(numero * 2));
console.log(dobles);


// Filtrar estudiantes aprobados
const estudiantes = [
    { nombre: "Kevin", nota: 10 },
    { nombre: "Carlos", nota: 4 },
    { nombre: "Lucia", nota: 8 },
    { nombre: "Johnny", nota: 9 },
    { nombre: "Maria", nota: 3 },
    { nombre: "Marcos", nota: 2 }
];

estudiantes.forEach(estudiante => {
    estudiante.aprobado = estudiante.nota >= 4;
});

console.log(estudiantes);



//////////
// map //

// Creamos un array de cuadrados
const nums = [1, 2, 3, 4];
const cuadrados = nums.map(num => num * num);
console.log(cuadrados);

const doblesMap = listaNumeros.map(num => num * 2);
console.log(doblesMap);

// Convertir a string
const edades = [25, 30, 18];
const edadesStr = edades.map(edad => `Tengo ${edad} años`);
console.log(edadesStr);

// Extraer propiedades en un array de objetos
const empleados = [
    {id: 1, nombre: "Kevin", departamento: "IT"},
    {id: 2, nombre: "Rodrigo", departamento: "RRHH"}
];

const nombresEmpleados = empleados.map(empleado => empleado.nombre);
console.log(nombresEmpleados);

const nombresEmp = [];
empleados.forEach(empleado => nombresEmp.push(empleado.nombre));
console.log(nombresEmp);

// EJERCICIO SUGERIDO: Repitan este ejercicio con for clasico



/////////////
// filter //

// Filtrar numeros pares
const seisNumeros = [1, 2, 3, 4, 5, 6];
const numerosPares = seisNumeros.filter(numero => numero % 2 === 0);
console.log(numerosPares);


// Filtrar strings largos
const palabras = ["hola", "vecinito", "bienvenidiita", "chau"];
const palabrasLargas = palabras.filter(palabra => palabra.length > 4);
console.log(palabrasLargas);


/*
let personas = [
    { nombre: "Juan", edad: 30, ocupacion: "Ingeniero"},
    { nombre: "Maria", edad: 25, ocupacion: "Ingeniera"},
    { nombre: "Carlos", edad: 35, ocupacion: "Diseñador"},
];
*/

const masTreinta = personas.filter(persona => persona.edad >= 30);
console.log(masTreinta);
console.log(personas);


// Filtrar multiples condiciones
const ordenes = [
    { id: 1, nombre: "Laptop", precio: 1000, cantidad: 1, completada: true },
    { id: 2, nombre: "Mouse", precio: 20, cantidad: 3, completada: false  },
    { id: 3, nombre: "Teclado", precio: 50, cantidad: 2, completada: true  },
    { id: 4, nombre: "Impresora", precio: 500, cantidad: 1, completada: true  },
    { id: 5, nombre: "Placa video", precio: 600, cantidad: 2, completada: true  },
    { id: 6, nombre: "Monitor", precio: 200, cantidad: 3, completada: false  }
];

// Queremos filtrar ordenes completadas y que tengan mas de 1 cantidad en stock

const completadasVarias = ordenes.filter(orden => orden.completada && orden.cantidad > 1);

console.log(completadasVarias);



/////////////
// reduce //

const decimales = [10, 20, 30, 40, 50];

// Sumar elementos
const sumaDecimales = decimales.reduce((acum, decimal) => acum + decimal, 0);
console.log(sumaDecimales);

// EJERCICIO SUGERIDO: Hagan esta misma operacion con un bucle for clasico

// Sumar propiedades
const ventas = [
    { producto: "Camisa", cantidad: 3, precio: 25 },
    { producto: "Pantalon", cantidad: 2, precio: 40 },
    { producto: "Zapatos", cantidad: 1, precio: 80 }
];

const totalVentas = ventas.reduce((total, item) => total + (item.cantidad * item.precio), 0);
console.log(totalVentas);
// Si no especificamos el valor inicial de total, hara una concatenacion de valores, tomando el valor inicial como un objeto, devolviendo un confuso [object Object]8080



/* EJERCICIO SUGERIDO: Hagan una sucesion de Fibonacci, pidan la cantidad de numeros de esa sucesion por prompt
https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci
*/



///////////////////////
// find y findIndex //
const numerosRandom = [5, 12, 8, 130, 44];

const encontrado = numerosRandom.find(num => num > 10);
console.log(encontrado);


const indice = numerosRandom.findIndex(num => num > 100);
console.log(indice);


const estudianteAprobado = estudiantes.find(estudiante => !estudiante.aprobado);
console.log(estudianteAprobado);


const tareas = [
    {id: 1, descripcion: "Comprar fruta", completada: false},
    {id: 2, descripcion: "Estudiar Progra III", completada: true},
    {id: 3, descripcion: "Hacer ejercicio", completada: false}
];

// Indice de la primera tarea compeltada
const tareaCompletada = tareas.findIndex(tarea => tarea.completada); // Devuelve una referencia del objeto!
console.log(tareaCompletada);

console.table(estudiantes);


///////////////
// for...of //
const simbolos = ['€', '$', '¥', '£'];

for (let simbolo of simbolos) {
    if(simbolo === '¥') {
        break;
    }
    console.log(simbolo);
}

const seleccionEmpleados = [
    {id: 1, nombre: "Kevin", departamento: "IT", salario: 3000 },
    {id: 2, nombre: "Rodrigo", departamento: "RRHH", salario: 3500 },
    {id: 3, nombre: "Rocio", departamento: "RRHH", salario: 4000 }
];

// Con for...of romperemos el bucle al encontrar el primer empleado que gane 3500 o mas

for (let empleado of seleccionEmpleados) {
    if (empleado.salario >= 3500) {
        console.log(`${empleado.nombre} su salario es ${empleado.salario}`);
        break;
    }
}



///////////////////
// some y every //
const nuevosNumeros = [1, 3, 5, 7, 8];
const hayPares = nuevosNumeros.some(num => num % 2 === 0);
console.log(`Existe algun numero par? ${hayPares}`);

const todosPositivos = nuevosNumeros.every(num => num > 0);
console.log(todosPositivos);




/* ========================
    Iteracion en Objetos
===========================
Objetos como coleccion de pares clave-valor
Accedemos a propiedades y modificamos valores

- for...in: Para iterar claves

- Object.keys() para obtener claves

- Object.values() para obtener valores

- Object.entries() para obtener pares clave-valor
*/


const estudiante = { nombre: "Alejo", edad: 20, curso: "Progra III" };

console.log(estudiante["nombre"]);

// Iteramos las claves con for...in
for (let propiedad in estudiante) {
    console.log(`${propiedad}: ${estudiante[propiedad]}`); //estudiante["clave"]
}

// Object.keys()
const claves = Object.keys(estudiante);
console.log(claves);
claves.forEach(clave => console.log(clave));


// Object.values()
const valores = Object.values(estudiante);
console.log(valores);


// Object.entries()
for (const [clave, valor] of Object.entries(estudiante)) {
    console.log(`${clave}: ${valor}`);
}



/* ================================
    Comparacion de rendimiento
===================================
1. Bucles clasicos (for, while, do..while) son los mas rapidos para iteraciones simples

2. Metodos funcionales (map, filter) son mas lentos pero mas expresivos

3. for...of ofrece un excelente equilibrio entre rendimiento y legibilidad


Recomendaciones de uso:

- Transformar array:        map()
- Filtrar elementos:        filter()
- Reducir a un valor:       reduce()
- Buscar elemento:          find() y findIndex()
- Necesidad romper bucle:   for y for...of (con break y continue)




==============================
    EXTRA let vs const
==============================

https://stackoverflow.com/questions/41086633/in-javascript-why-should-i-usually-prefer-const-to-let

Argumentos a favor del uso de const por defecto

- Evita los efectos secundarios causados por reasignaciones involuntarias.
- Durante una revisión del código, elimina la incertidumbre, ya que el desarrollador que ve una variable const puede contar con la certeza de que no será reasignada.
- Quizás podríamos decir que es más coherente con la programación funcional y los estados inmutables.
- Con TypeScript, hay algunos casos con mejores inferencias.


Argumentos a favor del uso de let por defecto

- La reasignación no es algo peligroso, es simplemente... habitual.
- Si una variable puede reasignarse, entonces debe declararse con let, porque es más expresivo reservar const para las constantes reales;
- const es engañoso porque no impide que se modifiquen las referencias;
- Son dos caracteres más que escribir y agrupar;
- El uso de const por defecto es inconsistente con los parámetros de las funciones;
- No hay ninguna ganancia de rendimiento al usar const.
*/
```

---

## JavaScript IV / Introduccion a arrays. Metodos de strings y arrays
```js
/* =============================
     Introduccion a arrays
================================

- Un array es una lista ORDENADA de elementos, donde cada uno tiene una posicion o indice (index)

- Los arrays en JavaScript pueden contener cualquier tipo de dato (numeros, strings, booleanos, otros arrays, objetos, funciones, etc)

- Usaremos arrays cuando necesitemos almacenar una lista ordenada de elmentos (como una lista de nombre)



=================================
    Introduccion a objetos
=================================

- Un objeto en JavaScript es una coleccion de pares clave-valor. as claves son strings que identifican cada valor, lo que nos permite un acceso rapido y estructurado a los datos

- Los objetos son utiles cuando queremos representar una entidad con multiples propiedades

- Accedemos a las propiedades de un objeto a traves de notacion de punto y notacion de corchetes

- Los objetos tambien pueden tener metodos, que son funciones almacenadas en una propiedad

- Usaremos objetos cuando tenemos datos estructurados que puedne agruparse en propiedades clave-valor


/////////////////////////////////////////
// Comparacion entre Arrays y Objetos //

Uso principal: 
    Array: Lista ordenada de elementos     
    Objeto: Colecciond e pares clave-valor

Acceso a datos:
    Array: Por indice (array[0])
    Objeto: Notacion de punto o de corchete (objeto.clave / objeto["clave"])

Metodos:
    Array: .push(), .pop(), .map(), .forEach()
    Objeto: Metodos personalizados y funciones

Iteracion:
    Array: .forEach(), .map(), bucles, etc
    Objeto: for...in, Object.keys(), Object.values()
*/

// Arrays
let frutas = ["manzana", "banana", "naranja"];

console.log(frutas[0]); 
console.log(frutas[2]);


// Objetos
let persona = { // Similar a los diccionarios en Python
    nombre: "Kevin",
    edad: 23,
    ciudad: "Buenos Aires",

    presentarse: function() { // Metodo de objeto persona
        console.log("Soy profesor de programacion!")
    }
}

// Notacion de punto
console.log(persona.nombre); 

// TO-DO, sin desplegar es copia y desplegando es referencia del objeto?

// Notacion de corchetes
console.log(persona); // La consola del navegador imprime una referencia, no una copia! (al desplegar el objeto en la consola del navegador?)

console.log({...persona}); // Aca imprimimos una copia del objeto hasta ese momento
console.log(persona["ciudad"]);

persona.presentarse(); // Usamos el metodo del objeto

// Agregamos una propiedad
persona.lenguaje = "JavaScript";
// console.log(persona);

// Modificamos una propiedad
persona.lenguaje = "Python";

// Eliminamos una propiedad
delete persona.edad;

persona.ciudad = "Mendoza";
console.log(persona);



/* ========================
    Metodos de strings
===========================

En JavaScript son todo objetos, salvo los tipos primitivos
Pero incluso los tipos primitivos (cadenas de caracteres, numeros, etc), JavaScript los trata como si fueran objetos.

Esto sucede por los object wrappers o envolvedores de objetos. Donde JavaScript envuelve estos tipos de datos y les proporciona metodos para poder manipularlos
*/

// 1. length: nos devuelve la longitud del string
console.log("Hola".length); 

// Ejemplo object wrapper, iterando un string
let saludos = "Saludos"; // Cadena de caracteres para iterar

for (let i = 0; i < saludos.length; i++) { // Recorro cada caracter del string como un array
    console.log(saludos[i]);
} // Devuelve cada caracter

console.log("///////////////////");


//  2. charAt: Devuelve el caracter en la posicion especificada
console.log(
    "Hola".charAt(2)
);


// 3. concat: Concatena strings
console.log("Hola".concat(" ", "mundo"));


// 4. includes: Devuelve true si el substring esta en el string
console.log("JavaScript".includes("Script"));


// 5. startsWith: Comprueba si el string comienza con el substring
console.log("Hola mundo".startsWith("Hola"));


// 6. endsWith: Comprueba si el string termina con el substring
console.log("Hola mundo".endsWith("ndo"));


// 7. indexOf: Devuelve el indice de la primera aparicion del substring
console.log("banana".indexOf("a"));


// 8. lastIndexOf: Devuelve la ultima aparicion del substring
console.log("banana".lastIndexOf("a"));


// 9. replace: Reemplaza una parte del string
console.log("Hola mundo".replace("mundo", "division 132"));


// 10. replaceAll: Reemplaza todas las apariciones
console.log("1,2,3".replaceAll(",", ";"));


// 11. toLowerCase: Convierte a minusculas
console.log("AGUANTE JAVASCRIPT".toLowerCase());


// 12. toUpperCase: Convierte a mayusculas
console.log("holis".toUpperCase());


// 13. trim: Elimina espacios en blanco al principio y al final
console.log("      hola          ".trim());


// 14. trimStart: Elimina espacios al inicio
console.log("         hola".trimStart());


// 15. trimEnd: Elimina espacios al final
console.log("hola                 ".trimEnd());


// 16. slice: Extraemos parte del string
console.log("JavaScript".slice(0, 4));
console.log("Holis".slice(-3));


// 17. substring: Similar a slice, pero no acepta negativos
console.log("JavaScript".substring(4, 10));


// substr: Obsoleto, similar a substring


// 18. split: Divide el string en un array
console.log("rojo,verde,azul".split(","));
console.log("Hola mundo".split(" "));
console.log("JavaScript".split(""));


// 19. repeat: Repite el string
console.log("ji".repeat(3));


// 20. match: Devuelve coincidencias con una expresion regular (REGEX)
console.log("abce123".match(/[aeiou]/gi)); // Extraemos las vocales



/* ========================
    Metodos de arrays
==========================*/

// 1. length: devuelve la longitud del array
console.log([1, 2, 3].length);

let desayuno = ["avena", "pera", "pomelo", "banana", "semillas"];

for (let i = 0; i < desayuno.length; i++) {
    console.log(desayuno[i]);
}


// 2. push: Agrega un elemento al final del array
let arr = [1, 2];

console.log(arr);
arr.push(3);
console.log(arr);


// 3. pop: Elimina el ultimo elemento y lo devuelve
arr.pop();
console.log(arr);


// 4. unshift: Agrega un elemento al inicio del array
arr.unshift(0);
console.log(arr);


// 5. shift: elimina el primer elemento y lo devuelve
console.log(arr.shift()); // lo podemos ver en consola
console.log(arr);


// 6. concat: concatena arrays
let err = [3, 4]
let orr = arr.concat(err);
console.log(arr.concat(err));
console.log(arr);
console.log(orr);


// 7. join: une los elementos en un string
console.log(orr.join("-"));
console.log(orr.join(""));
console.log(orr.join(" "));


// 8. slice: extrae una copia parcial del array
console.log(orr.slice(1, 3));


// 9. splice: modifica el array in situ y permite borrar y agregar
console.log(orr);
console.log(orr.splice(1, 0, "dos", "2"));
console.log(orr);


// 10. indexOf, lastIndexOf: primera y ultima posicion del elemento
orr.push(2);
console.log(orr.indexOf(2));
console.log(orr.lastIndexOf(2));


// 11. includes: devuelve true si el elemento existe
console.log(orr.includes(3));
console.log(orr.includes(5));



/* =====================
    EXTRA
========================

Comparativa de notación con punto frente a notación con corchetes en JavaScript

En JavaScript, la notación con punto (`objeto.propiedad`) y la notación con corchetes (`objeto[“propiedad”]`) son funcionalmente equivalentes para acceder a las propiedades de los objetos, pero difieren en cuanto a rendimiento y casos de uso. La notación con punto suele ser más rápida porque se beneficia de las optimizaciones en tiempo de compilación, lo que permite a los motores JavaScript resolver rápidamente el nombre de la propiedad directamente. Esto se debe a que el motor conoce el nombre exacto de la propiedad en tiempo de compilación, lo que se traduce en tiempos de acceso más rápidos.  

La notación entre corchetes, aunque más versátil, requiere que el motor evalúe la expresión dentro de los corchetes en tiempo de ejecución, lo que introduce una ligera sobrecarga. Esta flexibilidad permite el acceso dinámico a las propiedades, como el uso de variables para los nombres de las propiedades o el acceso a propiedades con caracteres especiales o espacios, que la notación con punto no puede manejar. Por ejemplo, `person[propertyName]`, donde `propertyName` es una variable, o `person[“job-title”]`, con un nombre con guion, requieren la notación entre corchetes.  


Históricamente, la diferencia de rendimiento era notable, y las pruebas comparativas mostraban que la notación de puntos era más rápida, por ejemplo, 25 ms frente a 35 ms para 10 millones de iteraciones.  Sin embargo, los motores JavaScript modernos como V8 (utilizado en Chrome y Node.js) han optimizado significativamente ambas notaciones, lo que hace que la diferencia de rendimiento sea insignificante en la mayoría de las aplicaciones.  De hecho, algunas pruebas en las versiones actuales de Chrome muestran que la notación entre corchetes con nombres de propiedades más largos puede ser entre un 4 % y un 6 % más rápida para la lectura de propiedades, aunque las operaciones de escritura tienen un rendimiento similar.

A pesar de estas pequeñas diferencias de rendimiento, la elección entre una notación u otra debe basarse principalmente en la legibilidad, la facilidad de mantenimiento y el caso de uso específico. La notación de puntos es preferible para nombres de propiedades estáticos y conocidos debido a su sintaxis limpia y concisa.  La notación entre corchetes es esencial para el acceso dinámico, como la iteración sobre las propiedades de los objetos con bucles «for...in» o el acceso a propiedades basadas en valores calculados.  Además, la flexibilidad de la notación entre corchetes puede ayudar a los motores JavaScript a optimizar el código para escenarios que implican bucles o acceso basado en variables, lo que potencialmente le da una ligera ventaja en esos contextos. 

En resumen, aunque la notación de puntos ofrece una pequeña ventaja de rendimiento en algunos escenarios debido a la optimización en tiempo de compilación, la diferencia suele ser insignificante en los motores modernos. La decisión debe dar prioridad a la claridad del código y a la necesidad de acceso dinámico a las propiedades por encima de las microoptimizaciones. 
*/
```

---

## JavaScript III / Scope y ambito, funciones, tipos de funciones, parametros y argumentos, funciones flecha

#### [Ultimo onlinegdb](https://www.onlinegdb.com/0ajvjTpR-)
#### [Maqueta portfolio dev fullstack](https://drive.google.com/file/d/1eEUI11JSTHKB5SOXSwAkkRUiEhJt36rr/view)

```js
/* ==========================
     Scope o Ambito
=============================

El scope o ambito en JavaScript se refiere al contexto en el cual las variables y las funciones son accesibles y pueden ser referenciadas.
*/

///////////////////////////////////
// Global Scope o Ambito Global //

// Las variables declaradas fuera de cualquier funcion o bloque tienen alcance global y son accesibles desde cualquier parte del codigo

var globalVar = "Soy global";

function mostrarGlobal() {
    console.log(globalVar);
}

mostrarGlobal();
console.log(globalVar);



/////////////////////////////////////////
// Local Scope o Ambito local-funcion //

// Las variables declaradas DENTRO de una funcion solo son accesibles dentro de esa funcion y tienen un ambito local
function mostrarLocal() {
    var localVar = "Soy local";
    console.log(localVar);
}

mostrarLocal();
// console.log(localVar); // Uncaught ReferenceError: localVar is not defined



/////////////////////////////////////
// Block Scope o Ambito de bloque //

// A partir de ES6, las variables declaradas con let y const tienen alcance de bloque, lo que significa que SOLO SON ACCESIBLES dentro del bloque que se declararon: { }, if {}, for, etc

if(true) {
    let bloqueLet = "Soy de bloque";
    console.log(bloqueLet);
}

// console.log(bloqueLet);



/////////////////////////////////////
// Scope Chain o Cadena de Ambito //

// Cuando se intentna acceder a una variable, JavaScript busca en la "cadena de ambito", comenzando por el ambito mas interno y moviendose hacia los ambitos mas externos hasta encontrar la variable o llegar al ambito global

var globalVar2 = "Soy global 2";

function externa() {
    var externaVar2 = "Soy de externa 2";

    function interna() {
        var internaVar2 = "Soy de interna 2";
        console.log(globalVar2);
        console.log(externaVar2);
        console.log(internaVar2);
    }

    interna();
    console.log(internaVar2);
}

// externa();



/* ==================================================================
Function Scope (Ambito de funcion) vs Block Scope (Ambito de bloque)
=====================================================================

- Function Scope: Las variables declaradas con var tienen ambito de funcion. Por lo que si se declaran dentro de una funcion, no son accesibles fuera de esa funcion, PERO NO ESTAN LIMITADAS POR BLOQUES

- Block Scope: Las variables declaradas con let y const ESTAN LIMITADAS POR EL BLOQUE en el que se declaran -> {}
*/

// Funcion Scope
function scopeFuncion() {
    if(true) {
        var funcionVar = "Soy de funcion";
    }
    console.log(funcionVar);
}

scopeFuncion();


// Block Scope
function scopeBloque() {
    if(true) {
        let bloqueLet = "Soy de bloque";
        const bloqueConst = "Soy de bloque tambien";
    }

    console.log(bloqueLet); // Uncaught ReferenceError: bloqueLet is not defined
    console.log(bloqueConst); // // Uncaught ReferenceError: bloqueConst is not defined
}

// scopeBloque();




/* =======================
    Hoisting (Elevacion)
==========================

Las declaraciones de variables y funciones en JavaScript se "mueven hacia arriba" de su contexto de ejecucion (scope). Solo las declaraciones son eelvadas, no las inicializaciones.

- Variables con var: Se elevan y se inicializan con undefined

- Variables con let y const: Se elevan pero no se inicializan, lo que lleva a un error si se accede antes de la declaracion
*/

console.log(elevadaVar); // undefined
var elevadaVar = "Soy una var elevada";
console.log(elevadaVar);


// console.log(elevadaLet); // Uncaught ReferenceError: Cannot access 'elevadaLet' before initialization
let elevadaLet = "Soy una let elevada";
console.log(elevadaLet);




/* =========================================
    Diferencias entre var, let y const
============================================

- var: Tiene ambito de funcion, lo que significa que se declara dentro de la funcion actual y esta disponible en todo momento. Tambien permite la redeclaracion y la reasignacion
    
    - De ambito global o de ambito de funcion
    - Puede ser declarado y reasignado
    - Tiene elevacion a nivel de funcion, por lo que puede utilizarse antes de la declaracion.


- let: Tiene ambito de bloque, por lo que si se declara dentro de un bloque (if, bucle, function) solo esta disponible dentro de ese bloque. Tambien permite la redeclaracion pero no la reasignacion

    - De ambito de bloque (dentro de un bucle, sentencia condicional o funcion)
    - Se pueden volver a declarar pero no reasignar
    - Tiene elevacion a nivel de bloque, por lo que no es accesible antes de la declaracion


- const: Tambien tiene ambito de bloque, pero a diferencia de let, prohibe la reasignacion y la redeclaracion

    - De ambito de bloque (dentro de un bucle, sentencia condicional o funcion)
    - No se puede volver a declarar ni reasignar
    - Tiene elevacion a nivel de bloque, por lo que no es accesible antes de la declaracion



============================================
    Diferencias clave let y const
============================================

let y const se introdujeron en ES6 para mejorar el ambito de las variables y reducir la probabilidad de anulaciones accidentales de variables. Tanto let como const NO permite la elevacion, ademas const asegura que el valor de la variable permanece inmutable mientras que let permite la reasignacion.



============================================
    Buenas practicas
============================================
Usar const para variables de solo lectura, como constantes u objetos inmutables.
Utilizar let para variables que puedan cambiar con el tiempo
Evitar usar var debidoa  su ambito global o de funcion, que puede dar lugar a conflictos y bugs
*/

// Usamos const para variables de solo lectura
const PI = 3.14;

// Usamos let para variables que podrian cambiar
let contador = 0;
contador++;
console.log(contador);




/* =======================
    Funciones
==========================

- Una funcion es un bloque de codigo reutilizable que se puede ejecutar cuando se llama por su nombre
- Son funddamentales para la modularidad y la reutilizacion del codigo

function nombreFuncion() {
    // Bloque de codigo que se ejecutara cuando se llame a la funcion
}


Funciones con parametros: Podemos definir variables en las funciones que acepten valores cuando se les llama

- Los parametros son los nombres de las variables que definimos en la declaracion de la funcion
- Los argumentos son los valores que le pasamos a la funcion cuando la llamamos
*/

// Funcion sin parametros
function sumarCincoYTres() {
    let resultado = 5 + 3;
    console.log(`El resultado es: ${resultado}`);
}

sumarCincoYTres();


// Funcion con parametros
function sumar(a, b) {
    let resultado = a + b;
    console.log(`El resultado es: ${resultado}`);
}

sumar(5, 6);


// Funciones que devuelven un valor con la palabra clave return
function multiplicar(a, b) {
    return a * b;
}

console.log(multiplicar(4, 5));


function saludar(nombre) { // "nombre" es el parametro
    console.log(`Hola ${nombre}`);
}

saludar("Kevin");


// Valores predeterminados para los parametros, en caso de que no se pase un argumento
function despedir(nombre = "maestro") {
    console.log(`Chau ${nombre}`);
}

despedir("Thiago");
despedir();


// Multiples argumentos: Las funciones pueden aceptar multiples parametros y los argumentos se pasan EN EL MISMO ORDEN
function sumarTresNumeros(a, b, c) {
    return a + b + c;
}

let suma = sumarTresNumeros(1, 2, 3);
console.log(suma);


/* ==========================
    Tipos de funciones
=============================

1. Funcion declarada / Named function o Basic function
    Es la declaracion basica de JavaScript, usa la keyword function

    Se recomienda para funciones con nombre o cuando se necesite hoisting.
    Las funciones declaradas con la keyword function se puede elevar a la parte superior de su ambito, esto permite llamar a la funcion antes de ser declarada


saludar1();

function saludar1() {
console.log("Hola mundo desde una funcion declarada");
}


=============================

2. Funcion expresada / Function expression
    Es la funcion que esta dentro de una variable

    Son utiles para funciones anonimas, para cuando se quiere controlar donde va a estar disponible la funcion o para cuando va a ser usada como argumento para otra funcion


const saludar2 = function() {
    console.log("Hola mundo desde una funcion expresada");
}

saludar2();


=============================

3. Funcion anonima / Anonymous function
    No tiene nombre y se usan como callbacks generalmente

setTimeout(function() {
    console.log("Hola mundo desde una funcion anonima");
}, 1000);


=============================

4. Funcion flecha / Arrow function
    Especialmente util para escribir funciones de una sola linea

const sumar2 = (a, b) => a + b;

console.log(sumar2(1, 2));


=============================

5. Funcion de metodos / Method function
    Son las funciones definidas dentro de un objeto o clase

const persona = {
    nombre: "Valeria",
    saludar() {
        console.log(`Hola me llamo ${this.nombre}`);
    }
}

persona.saludar();


=============================

6. IIFE - Immediately Invoked Function Expression

    Las IIFE son funciones que se ejecutan inmediatamente despues de haberse definido

(function() {
    console.log("Hola mundo desde una IIFE");
    
})();

*/

// 1. Funcion declarada
saludar1();

function saludar1() {
    console.log("Hola mundo desde una funcion declarada");
}



// 2. Funcion expresada
const saludar2 = function() {
    console.log("Hola mundo desde una funcion expresada");
}

saludar2();


// 3. Funcion anonima
setTimeout(function() {
    console.log("Hola mundo desde una funcion anonima");
}, 1000);


// 4. Funcion flecha
const sumar2 = (a, b) => a + b;

console.log(sumar2(1, 2));


// 5. Funcion de metodos
const persona = {
    nombre: "Valeria",
    saludar() {
        console.log(`Hola me llamo ${this.nombre}`);
    }
}

persona.saludar();


// 6. IIFE
(function() {
    console.log("Hola mundo desde una IIFE");
    
})();


console.log("//////////////////////////////////////");



/* ========================
    Funciones flecha
===========================

- Son una forma mas compacta de escribir funciones, se introdujeron en ES6 y tienen una sintaxis mas concisa

const nombreFuncion = (parametros) => {
    // Bloque de codigo
}

- Si la funcion tiene un solo parametro, las parentesis son opcionales

- Si la funcion solo devuelve un valor, no es necesario usar la palabra return ni las llaves

- Tienen una sintaxis mas corta y eliminan la necesidad de escribir function y return en muchos casos
*/


// Sin parametros
const saludarFlecha = () => {
    console.log(`Hola mundo`);
}

saludarFlecha();


// Con un solo parametro
// Con parametros: Si la funcion tiene un solo parametro, las parentesis son opcionales
const saludarFlecha2 = nombre => {
    console.log(`Hola ${nombre}`);
}

saludar("Rocio");

// Con mas de un parametro
const restar = (a, b) => a - b;
console.log(restar(5, 3));


// Mas de una instruccion en la funcion: Si el cuerpo de la funcion tiene mas de una instruccion, necesitamos {} y usar la keyword return para devolver un valor
const saludarPersona = nombre => {
    const saludo = `Hola ${nombre}!`;
    return saludo;
}

console.log(saludarPersona("Nahuel"));
```

---

## JavaScript II / Control de flujo, estructuras de control, condicionales y bucles I

#### [CV a maquetar](https://imgur.com/a/O5ykCAc)

```js
/*  Introduccion al control de flujo

El control de flujo en JavaScript determina como se ejecutan las instrucciones de un programa. Establecemos que partes del codigo se ejecutan y bajo que condiciones

CONDICIONALES
- Condicionales: if, else if, else
- Operadores logicos: &&, ||, !
- Operadores ternarios: 

BUCLES I
- for, while, do...while

CONTROL DE FLUJO AVANZADO
- break
- continue
- switch
*/

//////////////////////////////////////
// Condicionales if, else, else if //

let numero = 0;

if (numero > 0) {
    console.log("El numero es positivo");
} else if (numero < 0) {
    console.log("El numero es negativo");
} else {
    console.log("El numero es cero");   
}


let edad = 15;

if(edad >= 18) {
    console.log("Sos mayor de edad");
} else if (edad < 18 || edad > 0) {
    console.log("Sos menor de edad");
} else {
    console.log("Edad invalida");
}


let hora = 14;
if(hora < 12) {
    console.log("Es de mañana");
} else {
    if (hora >= 12 && hora < 18) {
        console.log("Es de tarde");
    } else {
        console.log("Es de noche");
    }
}


/*
/////////////////////////
// Operadores logicos //

AND &&: Ambas condiciones deben ser verdaderas
OR ||:  Al menos una condicion debe ser verdadera
NOT !:  Niega el valor de una condicion, es el operador de negacon logica
*/

let edad2 = 25;
let tieneLicencia = true;

if(edad >= 18 && tieneLicencia) {
    console.log("Podes manejar");
}

if (edad < 18 || !tieneLicencia) {
    console.log("No podes manejar");
}

// Ejemplo de negacion logica basica
// El operador ! invierte el valor booleano de una expresion

let esVerdadero = true;
console.log(!esVerdadero);

let esFalso = false;
console.log(!esFalso);


/* Usaremos ! para verificar si una variable es falsy
En JS los valores "falsy" son los que en un contexto booleano resulta false (false, 0, "", null, undefined y NaN)
*/

let valor1 = 0;
let valor2 = "Hola";

console.log(!valor1); // true, porque 0 es 'falsy', de manera que se convierte en true
console.log(!valor2); // Una cadena no vacia es 'truthy', de manera que se convierte en false


let esActivo = true;

if(!esActivo) {
    console.log("La cuenta esta inactiva");
} else {
    console.log("La cuenta esta activa");
}


// Funcionalidad toggle para alternar entre true y false
let estado = true;

function alternarEstado() {
    estado = !estado;
    console.log("Nuevo estado: ", estado);
}

alternarEstado(); // Nuevo estado:  false
alternarEstado(); // Nuevo estado:  true
alternarEstado(); // Nuevo estado:  false


// Operador ternario: Una forma mas compacta de escribir una condicion if...else
let edad3 = 20;

let mensaje = (edad3 >= 18) ? "Sos mayor de edad" : "Sos menor de edad";
console.log(mensaje);

let temperatura = 30;
let mensaje2;

mensaje2 = (temperatura > 25) ? "Hace calor" : "Hace frio";
console.log(mensaje2);


/*
/////////////////////////////////////
// Bucles: for, while, do...while //

Sintaxis for:

for (inicializacion; condicion; incremento) {
    // Codigo a ejecutarse en cada iteracion (cada vuelta de bucle)
}


Sintaxis while:
while(condicion) {
    // Codigo a ejecutarse mientras la condicion sea verdadera
}

Sintaxis do...while
do {
    // Codigo a ejecutar
} while (condicion)
*/


// Bucle for
for(let i = 0; i < 5; i++) {
    console.log(`Iteracion: ${i}`); // Sintaxis template literals `texto ${variables}`
}

// Bucle for anidado
for(let i = 0; i < 3; i++) {

    for(let j = 0; j < 3; j++) {
        console.log(`${i} - ${j}`);
    }
   
}

// Bucle while
let i = 0;
while(i < 5) {
    console.log(`Iteracion: ${i}`);
    i++;
}


// Bucle do while
let y = 0;
do {
    console.log(`Iteracion: ${y}`);
    y++;
} while(y < 5);


/* Control de flujo avanzado: break y continue

- break:      Se usa para salir inmediatamente de un bucle o una estructura de control
- continue:   La instruccion continue salta a la siguiente iteracion, omitiendo el codigo restante del bucle para esa iteracion
*/

// Ejemplo co continue
for(let i = 0; i < 10; i++) {
    if(i === 5) {
        break; // Salimos del bucle cuando i es 5
    }
    console.log(`Iteracion for2: ${i}`);
    
}


// Ejemplo con continue
for(let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    console.log(`Numero impar: ${i}`);
    
}


/*  Estructura de control Switch

Permite evaluar una expresion y ejecutar el bloque de codigo correspondiente al caso que coincide

switch (expresion) {
    case valor1:
        // Codigo que se ejecuta si la expresion es igual a valor1
        break;

    case valor2:
        // Codigo que se ejecuta si la expresion es igual a valor2
        break;

    case valor3:
        // Codigo que se ejecuta si la expresion es igual a valor3
        break;

    default:
        // Codigo que se ejecuta si ninguno de los casos coincide
}
*/

// Ejemplo switch

/* Ejemplos para recibir input del usuario a traves de una ventana flotante

alert("Holis");

// Aca recibimos una respuesta booleana del usuario

let teGustaJS = confirm("Che, que onda JavaScript, te gusta?");
console.log(teGustaJS); // true

let inputUsuarioStr = prompt("Introduci dia de la semana");
console.log(typeof inputUsuarioStr);

let inputUsuarioNum = parseInt(prompt("Dia de la semana"));
console.log(typeof inputUsuarioNum);
*/


let diaSemana = parseInt(prompt("Introduci dia de la semana"));

// Verificar que dia de la semana es
switch (diaSemana) {

    case 1:
        console.log("Lunes");
        break;

    case 2:
        console.log("Martes");
        break;


    case 3:
        console.log("Miercoles");
        break;

    case 4:
        console.log("Jueves");
        break;


    case 5:
        console.log("Viernes");
        break;

    default:
        console.log("Fin de semana");
}
```

---

## JavaScript I / Conceptos elementales, sintaxis básica, variables, tipos de datos y operadores
JavaScript es un lenguaje de programación que utilizamos para crear páginas web interactivas. JavaScript puede hacer que las páginas respondan a las acciones del usuario y a cambios que ocurren en el documento, realizar cálculos, alterar elementos de forma dinámica, realizar operaciones personalizadas, etc.

```js
// Mensaje por consola
console.log("Hola mundo");

/*  Tipos de variables
- var:      Histórica declaración de variables, con limitaciones
- let:      Permite declarar variables que pueden cambiar y tiene alcance de bloque
- const:    Permite declarar variables que no se deben reasignar

    Tipos de datos primitivos
- Numeros:      Valores numéricos
- Cadenas:      Texto encerrado entre comillas simples '' o dobles ""
- Booleanos:    true o false
- null:         Representa un valor intencionalmente vacio
- undefined:    Una variable declarada pero que no tiene valor;
*/

let numero = 42;
let texto = "Hola";
let verdadero = true;
let vacio = null;
let indefinido;

console.log(numero);
console.log(texto);
console.log(verdadero);
console.log(vacio);
console.log(indefinido);

/*  Operadores en JavaScript
Simbolos especiales que nos permiten realizar operaciones sobre valores o variables.
Pueden ser de distintos tipos:

- Aritmeticos:      Para realizar operaciones matemáticas sobre valores numéricos
- De asignacion:    Asignan valores a las variables
- De comparacion:   Se usan para comparar valores y devuelven un resultado booleano (true o false)
- Logicos:          Se usan para combinar expresiones booleanas
- De tipo:          Permiten verificar el tipo de valor o su relacion con clases/constructores (typeof, instanceof)
- Incre/Decre:      Permiten aumentar o disminuir el valor de una variable numerica

https://www.w3schools.com/js/js_operators.asp
*/

/////////////////////////////
// Operadores Aritmeticos //
let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);


///////////////////////////////
// Operadores de asignacion //
let x = 10;
console.log(x);
x += 5; // x = x + 5
console.log(x);
x -= 2; // x = x - 2
console.log(x);


////////////////////////////////
// Operadores de comparacion //
let y = 5;
let z = "5";

console.log(y == z);
console.log(y === z);


/////////////////////////
// Operadores logicos //
let verdadero2 = true;
let falso2 = false;

console.log(verdadero2 && falso2);  // false
console.log(verdadero2 || falso2);  // true
console.log(!verdadero2);           // false


/////////////////////////
// Operadores de tipo //
console.log(typeof 42);
console.log(typeof "Hola");
console.log([] instanceof Array);


//////////////////////////////////////////
// Operadores de incremento decremento //
let numero2 = 10;
console.log(numero2);

numero2++;
console.log(numero2);

numero2--;
console.log(numero2);
```
---