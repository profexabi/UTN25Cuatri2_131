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
