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

for tradicional
    - Maximo control, podemos usar break y continue
    - Mas verboso

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




/* ============================================
    Almacenamiento persistente en JavaScript
===============================================

*/