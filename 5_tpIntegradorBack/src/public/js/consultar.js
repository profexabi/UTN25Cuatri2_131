// Seleccion de elementos del DOM
// let contenedorProductos = document.getElementById("contenedor-productos");
let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";


getProductForm.addEventListener("submit", async (event) => {
    
    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    // Tenemos que obtener los datos del formulario, por tanto, vamos a crear un objeto FormData a partir de los datos del formulario
    let formData = new FormData(event.target); //Creamos un nuevo objeto FormData a partir de los datos del formulario

    console.log(formData); // FormData { idProd → "2" }
    // Ojo, esto no se muestra en navegadores basados en Chromium

    // Transformamos a objetos JS los valores de FormData
    let data = Object.fromEntries(formData.entries());
    console.log(data); // { idProd: '2' }

    let idProd = data.idProd; // Ahora ya tenemos guardado en una variable el valor del campo del formulario
    console.log(idProd);

    console.log(`Realizando una peticion GET a la url ${url}/api/products/${idProd}`);
    
    // Enviamos en una peticion GET el id pegado a la url
    let response = await fetch(`${url}/api/products/${idProd}`);

    let datos = await response.json();

    if(response.ok) {
        // Extraemos de la respuesta payload, el primer resultado que contiene el objeto que consultamos
        let producto = datos.payload[0];
        console.log(producto);

        mostrarProducto(producto);


    } else {
        console.log(datos);
        console.log(datos.message);

        mostrarError(datos.message);
    }


});

function mostrarProducto(producto) {
    let htmlProducto = `
            <li class="li-producto">
                    <img class="producto-img" src="${producto.image}" alt="${producto.name}">
                    <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: ${producto.price}</strong></p>
            </li>
        `;

    listaProductos.innerHTML = htmlProducto;
}


function mostrarError(message) {
    listaProductos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}


/*==========================
        Que es FormData?
============================

FormData es una interfaz nativa de JavaScript que permite crear un conjunto de pares clave-valor 
que representan los campos de un formulario HTML y sus respectivos valores.

Esta clase se utiliza principalmente para capturar y enviar datos de formularios, 
ya sea mediante métodos como fetch o XMLHttpRequest, 
y se encarga de formatear los datos correctamente como multipart/form-data, 
estableciendo automáticamente los encabezados necesarios para el envío
*/