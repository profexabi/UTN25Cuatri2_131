# UTN 2025 Cuatri 2 Div 131 :penguin:

# JavaScript :books:

#### [onlinegdb portfolio Kevin](https://onlinegdb.com/abeQfQjGr)

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

Pendiente
*/
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


# Guia JavaScript

## JavaScript VIII / JSON, asincronia, promesas, fetch, async/await y try/catch

---

## JavaScript VII / High order functions, destructuring, spread operator, closures, funciones anidadas, callbacks, web apis


