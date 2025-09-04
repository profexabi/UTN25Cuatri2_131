# UTN 2025 Cuatri 2 Div 131 :penguin:

# JavaScript :books:

## JavaScript II / Control de flujo, estructuras de control, condicionales y bucles I
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

---

## JavaScript III / Scope y ambito, funciones, tipos de funciones, parametros y argumentos, funciones flecha

