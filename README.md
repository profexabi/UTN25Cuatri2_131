# UTN 2025 Cuatri 2 Div 131 :penguin:

# JavaScript :books:

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


# Guia JavaScript

## JavaScript VIII / JSON, asincronia, promesas, fetch, async/await y try/catch

---

## JavaScript VII / High order functions, destructuring, spread operator, closures, funciones anidadas, callbacks, web apis

---

## JavaScript VI / Manipulacion del DOM en JavaScript y Eventos

---

## JavaScript V / Objetos, clases y objetos globales. Almacenamiento persistente, iteracion en arrays, iteracion en objetos e iteracion en arrays de objetos

---

## JavaScript IV / Introduccion a arrays. Metodos de strings y arrays