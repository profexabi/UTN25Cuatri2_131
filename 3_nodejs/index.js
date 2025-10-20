/* Introduccion a Node.js

    1. Instalacion de Node.js

    2. Instalacion de Node Package Manager (npm)

---

Abriremos la terminal de VSCodium o VSCode con Ctrl + ñ o Ctrl + j

Navegamos hasta la carpeta donde tenemos nuestro archivo javascript para ejecutarlo

Accedemos a una carpeta con el comando cd (change directory)

    cd carpetaNode -> Navegamos hasta la carpeta donde tenemos nuestro proyecto de node
    node index.html -> Aca ejecutamos el archivo javascript

    cd .. -> Retrocedemos un nivel (una carpeta atras)
    cd ../../ -> Retrocedemos dos niveles (dos carpetas atras)

Con esto instalado, vamos a tener a disposicion ciertos modulos "nativos" de Node.js
Es decir, funcionalidades que vienen preinstaladas con Node.js


==========================================
    Que son los modulos en JavaScript
==========================================

Los modulos en Node.js son como bloques de lego o bloques de construccion que nos permiten organizar y reutilizar codigo de forma eficiente.
En lugar de tener todo el codigo en un solo archivo gigante, podemos dividirlo en diferentes archivos o "modulos" y luego importarlos cuando los necesitemos.

Más en detalle, un módulo en JavaScript es un archivo que contiene código organizado en unidades independientes, como funciones, variables, clases o objetos, que pueden ser exportadas para ser utilizadas en otros archivos 

Esta característica permite dividir el código en partes más pequeñas, manejables y reutilizables, facilitando la organización, mantenimiento y escalabilidad de aplicaciones Los módulos se basan en las palabras clave `export` para hacer accesibles ciertos elementos desde fuera del archivo y `import` para utilizar esos elementos en otro módulo 


Los pasos para trabajar con modulos en Node.js son siempre asi

    1. Los instalamos (si fuera necesario)

    2. Los importamos (los traemos a nuestra aplicacion para usarlos)

    3. Los inicializamos (los guardamos en una variable) para poder acceder a sus metodos


=====================================================
    Modulos nativos (preinstalados) de Node.js
===================================================*/

// os -> Operative System: Este modulo permite obtener informacion del sistema operativo en el que estamos ejecutando Node.js

// Importamos el modulo nativo OS para interactuar con el Sistema Operativo
const os = require("os");

// Una vez que importamos este modulo, podemos acceder a las funcionalidades de este modulo
let memoriaLibre = os.freemem(); // Llamamos al modulo que importamos y accedemos a sus metodos
let tipoSistema = os.type();


console.log(`Memoria libre:`, memoriaLibre);

console.log(`Tipo de sistema operativo:`, tipoSistema);

// console.log(os.cpus())



// fs -> File System: Este modulo nos permite interactuar con el sistema de archivos, para leer, escribir, actualizar y borrar archivos de forma sencilla

// Importamos el modulo file system (fs)
const fs = require("fs");

fs.readFile("saludos.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Ocurrio un error: ", err);
        return;
    }

    console.log("Contenido del archivo: ", data);
});

// En este ejemplo usamos fs.readFile para leer el contenido de un archivo llamado saludos.txt. Si todo sale bien, el contenido se imprime en la consola, si hay un error, se muestra el error


// path: El modulo path te ayuda a manejar y manipular rutas de archivos y directorios de forma mas segura y comoda
// https://desarrolloweb.com/articulos/modulo-path-nodejs

const path = require("path");

const rutaManualArchivo = "/home/xabier/Escritorio/Docencia/2\ Cuatri\ UTN\ 2025/UTN25Cuatri2_131/3_express/saludos.txt";

const rutaHastaArchivo = __dirname; // /home/xabier/Escritorio/Docencia/2 Cuatri UTN 2025/UTN25Cuatri2_131/3_express

const rutaConArchivo = __filename; // /home/xabier/Escritorio/Docencia/2 Cuatri UTN 2025/UTN25Cuatri2_131/3_express/index.js

// Combinamos la ruta de esta carpeta con el nombre del archivo
const rutaTxt = path.join(__dirname, "/saludos.txt"); // /home/xabier/Escritorio/Docencia/2 Cuatri UTN 2025/UTN25Cuatri2_131/3_express/saludos.txt

const nombreTxt = path.basename(rutaTxt); // saludos.txt


console.log(`El nombre del archivo de texto es: ${nombreTxt}`);

/*============================
    __dirname y __filename
==============================

Qué es __dirname in Node.js

__dirname es una variable de entorno en Node.js que proporciona la ruta absoluta del directorio que contiene el archivo JavaScript actualmente en ejecución A diferencia de './', que se refiere al directorio de trabajo actual desde donde se ejecuta el proceso Node.js, __dirname siempre apunta al directorio donde se encuentra el archivo de código, independientemente de desde dónde se inicie el proceso Esto lo hace especialmente útil para resolver rutas relativas a un archivo específico, como al cargar configuraciones o archivos de datos dentro de un módulo En el contexto de módulos ES (ESM), __dirname no está disponible por defecto, pero se puede simular usando `import.meta.url` junto con `fileURLToPath` y `path.dirname` para obtener el mismo comportamiento

Qué es __filename in Node.js

__filename es una variable global integrada en Node.js que proporciona la ruta absoluta del archivo que se está ejecutando actualmente Esta variable devuelve una cadena que representa la ruta completa, desde la raíz del sistema hasta el nombre del archivo actual, lo que permite acceder de forma precisa a la ubicación del módulo en el sistema de archivos Es especialmente útil para tareas como operaciones con archivos relativas a la ubicación del archivo actual, resolución dinámica de rutas para importar módulos, registro de información de depuración o introspección de código Aunque en el pasado no estaba disponible directamente en los módulos ES (ECMAScript Modules), en versiones recientes de Node.js se ha reintroducido el acceso a esta variable mediante `import.meta.filename`, lo que permite una funcionalidad similar a la de CommonJS
*/



/*=============================================
    Como funcionan los modulos en Node.js?
===============================================

Cada vez que usamos require() lo que hacemos e importar un modulo para que podamos usar sus funciones en nuestro archivo actual.

Podemos tambien crear nuestro propios modulos. SUpongamos que tenemos un archivo llamado saludar.js con este codigo: 

    function saludar(nombre) {
            return `Hola, ${nombre}`;
    }

    // Exportamos esta funcion
    module.exports = saludar;
*/

// Importamos esta funcion desde este archivo index.js
const saludar = require("./saludar");

console.log(saludar("Arturo"));

// Este enfoque nos ayuda a organizar mejor nuestro codigo, evitando que todo este en un solo archivo y permitiendo que podamos reutilizar funciones o clases en diferentes partes de nuestro proyecto. Podremos crear modulos propios o usar modulos e instalarlos con npm


/*=================================
    Servidor basico con Node.js
===================================

Vamos a crear un servidor basico usando Node.js y su modulo nativo HTTP

http es un modulo nativo (preinstalado) que nos permite crear un servidor web sin necesidad de instalar nada adicional, como un servidor web tipo Apache.

Vamos a crear un servidor basico que responde con un "Hola mundo" cada vez que alguien visita nuestra pagina: */

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

/* Explicacion del codigo:

    1. Importamos el modulo http: Esto nos da acceso a todas las funcionalidades necesarias para crear un servidor.

    2. Crear un servidor: Utilizamos el metodo http.createServer para definir un servidor que escuche las solicitudes de los clientes y les responda

    3. Definimos la respuesta del servidor: El servidor siempre respondera con el mensaje "Hola mundo desde Node.js"

    4. Escuchar en un puerto: El servidor se ejecuta en el puerto 3000 (puede ser cualquier puerto libre) y muestra un mensaje en la consola cuando esta listo
*/