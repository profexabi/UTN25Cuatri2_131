// Redireccion a inicio////////////////////
let nombreUsuario = sessionStorage.getItem("nombreUsuario");

// Redirige si no existe un nombre de usuario
if(!nombreUsuario){
	window.location.href = "index.html";
}




// Variables////////////////////////////////
let productos = []; // Agregamos la variable global productos
let cuadriculaProductos = document.querySelector(".product-grid");
let barraBusqueda = document.querySelector(".search-bar");

let botonesCarrito = document.querySelectorAll(".add-to-cart");
let objetosCarrito = document.getElementById("cart-items");
let precioCarrito = document.getElementById("total-price");
let contadorCarrito = document.getElementById("cart-count");

let carrito = [];




// Obtener productos////////////////////////////////////////////
const url = "http://localhost:3000/api/products"; // Guardamos en una variable la url de nuestro endpoint

async function obtenerProductos() {
    try {
        let respuesta = await fetch(url); // Hacemos una peticion a nuestro nuevo endpoint en http://localhost:3000/api/products

        let data = await respuesta.json();

        console.log(data); // Nuestros productos estan disponibles dentro de payload { payload: Array(19) }

        productos = data.payload; // Aca guardamos en la variable productos el array de productos que contiene "payload"

        mostrarProductos(productos);
        
        

    } catch(error) {
        console.error(error);
    }
}




// Mostrar productos////////////////////////////////
function mostrarProductos(array) {
    let cartaProducto = "";
    
    for(let i = 0; i < array.length; i++) {    
        cartaProducto += `
            <div class="product-card">
                <img src="${array[i].image}" alt="${array[i].name}">
                <h3>${array[i].name}</h3>
                <p>$${array[i].price}</p>
                <button class="add-to-cart" onclick="agregarCarrito(${array[i].id})">Agregar a carrito</button>
            </div>
        `;
    }
    cuadriculaProductos.innerHTML = cartaProducto;
    //console.log(cartaProducto)
}




// Saludar usuario/////////////////////////////////
function saludarUsuario() {
    let saludoUsuario = document.getElementById("saludo-usuario");
    saludoUsuario.innerHTML = `Bienvenidx ${nombreUsuario}!`;
}




function mostrarCarrito() {
    let carritoCompra = "";
    precioTotal = 0;

    carrito.forEach((producto, indice) => {
        carritoCompra += `
            <li class="item-block">
                <p class="item-name">${producto.name} - $${producto.price}</p>
                <button class="delete-button" onclick="eliminarProducto(${indice})">Eliminar</button>
            </li>
            `;

        precioTotal += parseInt(producto.price, 10);
    });

    // Imprimir html de producto
    objetosCarrito.innerHTML = carritoCompra;

    // Mostrar precio total y contador carrito
    precioCarrito.innerHTML = `$${precioTotal}`;

    // Mostrar el numero de objetos en el array carrito
    contadorCarrito.innerHTML = carrito.length;
    

    // Ocultar carrito si no hay productos
    if(carrito.length > 0) {
        document.getElementById("empty-cart").classList.remove("hidden");
        document.getElementById("empty-cart").classList.add("visible");
        
        document.getElementById("btn-imprimir").classList.remove("hidden");
        document.getElementById("btn-imprimir").classList.add("visible");
    } else {
        document.getElementById("empty-cart").classList.remove("visible");
        document.getElementById("empty-cart").classList.add("hidden");
        document.getElementById("btn-imprimir").classList.remove("visible");
        document.getElementById("btn-imprimir").classList.add("hidden");
        

        objetosCarrito.innerHTML = `<p class="info-carrito">No hay productos en el carrito.</p>`;
    }
}




// Filtrar productos////////////////////////////////
barraBusqueda.addEventListener("keyup", filtrarProductos);

function filtrarProductos() {
	let valorBusqueda = barraBusqueda.value;
	// console.log(valorBusqueda)

	let productosFiltrados = productos.filter((producto) => { 
		return producto.name.includes(valorBusqueda);
	});
	mostrarProductos(productosFiltrados);
}




// Agregar a carrito////////////////////////////////
function agregarCarrito(id) {

	//console.log(`id del producto: ${id}`);
	let frutaSeleccionada = productos.find(fruta => fruta.id === id);
	carrito.push(frutaSeleccionada);

	mostrarCarrito();
}




function eliminarProducto(index) {
    // Eliminar un elemento del array carrito a partir de su indice con splice()
    carrito.splice(index, 1);
    mostrarCarrito();
}




function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}




// Funcion inicializadora
function init() {
    obtenerProductos();
    saludarUsuario();
}

init();
