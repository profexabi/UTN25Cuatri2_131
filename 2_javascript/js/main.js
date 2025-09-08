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