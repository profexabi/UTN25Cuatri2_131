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