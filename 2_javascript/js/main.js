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

JavaScript nos permite ciertas funcionalidades extra para poder recordar información y que esta persista del lado del cliente.
Los tres metodos principales para el almacenamiento en el cliente (quiere decir que la información no se guarda en el servidor), son localStorage, sessionStorage y las cookies


========================
    localStorage
========================
localStorage es una API (funcionalidad extra que complementa JavaScript) que permite almacenar datos de manera persistente en el navegador.
Casos de uso: Almacenar configuraciones de usuario, temas, carrito de compras,etc

localStorage.setItem("tema", "oscuro");
localStorage.setItem("idioma", "es");

- Capacidad de almacenamiento: 5-10 MB
- Persistencia: No tiene expiracion, esta disponible incluso cerrando el navegador o apagando la compu
- Accesible solo desde JavaScript (no se envia al servidor)
- Los datos se almacenan por dominio, y solo son accesibles dentro del mismo dominio
- Los datos se almacenan como strings: Todos los datos almacenados en local son de tipo string, por lo que para almacenar otros tispo de datos, deben ser convertidos a strings 


    localStorage.setItem("clave", "informacion texto plano");

    localStorage.getItem("clave");

    localStorage.removeItem("clave");

    localStorage.clear();


=========================
    sessionStorage
=========================
sessionStorage es otra API muy similar a localStorage con una diferencia clave: los datos almacenados solo se mantienen disponibles durante la sesion del navegador. Si cerramos la pestaña o ventana del navegador, los datos se eliminar automaticamente.
Uso tipico: Informacion de formularios o usuarios temporales

sessionStorage.setItem("usuarioTemporal", "Rocio");


- Capacidad de almacenamiento: 5-10 MB
- Persistencia: Solo durante la sesion activa. Si se cierra la pestaña, los datos se pierten
- Accesible solo desde JavaScript (no se envia al servidor)
- Los datos se almacenan por dominio, y solo son accesibles dentro del mismo dominio
- Los datos se almacenan como strings: Todos los datos almacenados en local son de tipo string, por lo que para almacenar otros tispo de datos, deben ser convertidos a strings 


    sessionStorage.setItem("clave", "informacion texto plano");

    sessionStorage.getItem("clave");

    sessionStorage.removeItem("clave");

    sessionStorage.clear();



Cuando no usar nunca localStorage o sessionStorage?
- Nunca guardemos informacion sensible como contraseñas o tokens de autenticacion. No seria seguras ya que el contenido es accesible desde cualquier script en la pagina

- En ese caso, usariamos cookies seguras con HttpOnly y Secure


=========================
    Cookies
=========================
Las cookies son pequeños fragmentos de informacion que se almacenan en el navegador del usuario y se envian con cada peticion HTTP al servidor. Son mas antiguas que localStorage y sessionStorage y fueron ampliamente utilizadas para mantener la sesion del usuario, guardar preferencias, entre otros usos

Caracteristicas:
- Se envian automaticamente al  servidor con cada solicitud HTTP
- Tamaño maximo: 4KB
- Expiran seguin una fecha determinada (expires) o duracion (max-age)
- Se pueden marcar con HttpOnly (accesibles solo desde el servidor) y Secure (Solo sobre HTTPS)

Uso principal:
- Autenticacion (tokens, sesion)
- Preferencias del uusario que deben ser enviadas al servidor
- Seguimiento (tracking) de actividad en la web


No existe una API estandar para gestionar cookies, pero las manejamos con el objeto document.cookie
Usaremos Cookies, en lugar de localStorage o sessionStorage si estamos trabajando con limites mas estrictos en tamaño o seguridad


    
==========================
    Metodos de JSON
==========================
- Para poder transformar texto plano JSON a objetos JavaScript, usaremos JSON.parse()

- Para poder transformar objetos JavaScript a texto plano JSON, usaremos JSON.stringify()
*/


///////////////////////////////////
// Guardamos datos en localStorage
localStorage.setItem("nombre", "Kevin"); // De la misma manera que hacemos con objetos, guardamos la info con la clave nombre


///////////////////////////////////
// Obtenemos datos del localStorage -> devTools / Application o Almacenamiento / Local Storage
let nombre = localStorage.getItem("nombre");
console.log(nombre);


//////////////////////////////////////////////////////
// Conversion de datos para almacenar en localStorage

// Como carrito es un array de objetos, guardado como string (texto plano) -> JSON
// Necesitamos convertir a objetos JavaScript nuestro string JSON (formato de texto plano)
let carrito = JSON.parse(localStorage.getItem("carrito")); 
console.table(carrito);

// Creamos un objeto estudiante
let estudiante = {
    nombre: "Rocio",
    cuadro: "Club Atletico Imparcial de Tucuman"
};

// Convertimos nuestro objeto estudiante en texto plano JSON para poder almacenarlo en localStorage
localStorage.setItem("estudiante", JSON.stringify(estudiante));

console.log(localStorage.getItem("estudiante")); // String: {"nombre":"Rocio","cuadro":"Club Atletico Imparcial de Tucuman"}

// Quiero traer mi clave estudiante desde localStorage, almacenado en formato JSON
let estudianteAlmacenado = JSON.parse(localStorage.getItem("estudiante"));

console.log(estudianteAlmacenado); // Objeto: { nombre: 'Rocio', cuadro: 'Club Atletico Imparcial de Tucuman' }


/////////////////////////////////////////////////
// Eliminar un dato especifico del localStorage
localStorage.removeItem("nombre");



/////////////////////////////////
// Limpiar todo el localStorage
// localStorage.clear();


// TODO: Practiquen a almacenar el carrito de compra



/* =================
    Cookies
==================*/
// Creamos una cookie
document.cookie = "usuario=Kevin; expires=Fri, 31 Dec 2025 23:59:59 UTC; path=/";

// Creamos una cookie sin expiracion (se eliminara al cerrar el navegador)
document.cookie= "pais=Argentina; path=/";

// Leemos las cookies
console.log(document.cookie);

// Eliminamos las cookies (ponemos una fecha de expiracion en el pasado)
// document.cookie = "usuario= ; 01 Jan 1970 00:00:00 UTC; path=/"


// Ejemplo completo de uso de cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Obtener el valor de una cookie
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

// Establecemos una cookie
setCookie("idioma", "es", 7);

// Leemos una cookie
console.log(getCookie("idioma"));