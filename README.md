# UTN 2025 Cuatri 2 Div 131

# JavaScript

## JavaScript II / Control de flujo, estructuras de control, condicionales y bucles I
```js

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