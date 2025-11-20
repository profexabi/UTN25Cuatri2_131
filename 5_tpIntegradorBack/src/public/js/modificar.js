// Seleccion de elementos del DOM
let listaProductos = document.getElementById("lista-productos");
let getProductForm = document.getElementById("getProduct-form");
let url = "http://localhost:3000";
let updateFormContainer = document.getElementById("updateFormContainer");


getProductForm.addEventListener("submit", async (event) => {
    
    event.preventDefault(); // Prevenimos el envio por defecto del formulario

    // Tenemos que obtener los datos del formulario, por tanto, vamos a crear un objeto FormData a partir de los datos del formulario
    let formData = new FormData(event.target); //Creamos un nuevo objeto FormData a partir de los datos del formulario

    console.log(formData); // FormData { idProd → "2" }

    // Transformamos a objetos JS los valores de FormData
    let data = Object.fromEntries(formData.entries());
    console.log(data); // Object { idProd: '2' }

    let idProd = data.idProd; // Ahora ya tenemos guardado en una variable el valor del campo del formulario
    console.log(idProd);

    console.log(`Realizando una peticion GET a la url ${url}/api/products/${idProd}`);
    
    // Enviamos en una peticion GET el id pegado a la url
    let response = await fetch(`${url}/api/products/${idProd}`);

    let datos = await response.json();
    console.log(datos);

     // Extraemos de la respuesta payload, el primer resultado que contiene el objeto que consultamos
    let producto = datos.payload[0]; // Accedo al objeto que se encuentra en la posicion 0 de payload
    console.log(producto);

    let htmlProducto = `
        <li class="li-producto">
                <img class="producto-img" src="${producto.image}" alt="${producto.name}">
                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: ${producto.price}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto">
        </li>
    `;

    listaProductos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        
        event.stopPropagation(); // Evitamos la propagacion de eventos

        crearFormulario(producto);
    })
});


async function crearFormulario(producto) {
    console.table(producto);

    let updateFormHTML = `
        <form id="updateProducts_form">

            <input type="hidden" name="id" id="idProd" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.price}" required>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="food">comida</option>
                <option value="drink">bebida</option>
            </select>

            <input type="hidden" name="active" id="activeProd" value="${producto.active}">

            <input type="submit" value="Actualizar producto">
        </form>
    `;

    updateFormContainer.innerHTML = updateFormHTML;

    let updateProducts_form = document.getElementById("updateProducts_form");

    updateProducts_form.addEventListener("submit", event => {
        actualizarProducto(event);
    });
}


async function actualizarProducto(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("Preparando datos del formulario para el PUT");

    let formData = new FormData(event.target); // Le pasamos el formulario dinamico de antes al objeto FormData para obtener los datos del nuevo formulario de actualizacion

    let data = Object.fromEntries(formData.entries());
    console.log(data); // Ya tenemos como objetos JS los datos de nuestro formulario anterior con las nuevas modificaciones

    try {
        let response = await fetch(`${url}/api/products`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            // TO DO
            console.log(result.message);
            alert(result.message);
        }

    } catch (error) {

    }
    
}