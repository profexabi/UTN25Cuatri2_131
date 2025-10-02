/*====================
    Callback
======================
Un callback es una funcion que se pasa como argumento a otra funcion y que se ejecuta despues de que algo haya ocurrido

Es como decirle a la funcion, cuando termines todo el codigo, llamas a esta otra funcion.

Se usan principalmente para:

    - Ejecutar codigo despues de una tarea
    - Manejar tareas asincronas (leer archivos o pedir datos a un servidor)
    - Hacer el codigo mas flexible y utilizable



==========================================================
    Diferencia entre callbacks y High Order Functions
==========================================================

Callback es la funcion pasada como argumento

High Order Function es la funcion que recibe o devuelve funciones

Estan relacionadas pero no son equivalentes. Un callback es usando dentro de una HOF, pero no todas las HOF usan callbacks explicatamente (porque pueden devolver funciones en lugar de recibirlas)
*/

// Saludar es una funcion que saluda a alguien
function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}

// Procesar usuario recibe un nombre y una funcion callback
function procesarUsuario(nombre, callback) {
    // Hacemos algo con el nombre
    callback(nombre);
}

// Cuando termina de procesar el nombre, llama a la funcion saludar
procesarUsuario("Thiago", saludar); // pasamos saludar como argumento



// Callbacks: Funciones que se pasan como argumentos a otras funciones para ser ejecutadas despues

function procesarDatos(datos, callback) {
    console.log("Procesando datos");
    const resultado = datos.toUpperCase();
    callback(resultado); // Ejecuta la funcion callback
}

procesarDatos("hola mundo", (res) => {
    console.log("Resultado:", res);
});



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

const numeros = [1, 2, 3, 4, 5];
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
function saludar({nombre, edad}) {
    console.log(`Holis ${nombre}, tenés ${edad} años, sos un pibe!`);
}

saludar(alumno);


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