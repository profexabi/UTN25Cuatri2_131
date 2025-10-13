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


/*
=============================
    EXTRA: JSON vs XML
=============================

JSON y XML son dos formatos ampliamente utilizados para el intercambio y almacenamiento de datos, pero difieren significativamente en estructura, uso y eficiencia. **JSON (JavaScript Object Notation)** es más ligero, fácil de leer y rápido de analizar, lo que lo hace ideal para aplicaciones web modernas y servicios API. Por otro lado, **XML (Extensible Markup Language)** es más versátil y robusto, con soporte para espacios de nombres, comentarios y esquemas, lo que lo hace adecuado para configuraciones complejas y documentos estructurados. Aunque ambos son autodescriptivos y jerárquicos, JSON domina en entornos web dinámicos, mientras que XML sigue siendo relevante en sistemas empresariales y estándares técnicos.

## Origen y Estructura

### 1. JSON
JSON se basa en la sintaxis de objetos de JavaScript y utiliza una estructura de pares clave-valor. Es ideal para representar datos estructurados de forma ligera y eficiente. No requiere etiquetas de apertura y cierre, lo que reduce el tamaño del archivo.

```json
{
  "usuarios": [
    { "nombre": "Ana", "edad": 30 },
    { "nombre": "Luis", "edad": 25 }
  ]
}
```

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

*/
