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

let boton_imprimir = document.getElementById("btn-imprimir");

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




// Imprimir ticket PDF /////////////////////////////
boton_imprimir.addEventListener("click", imprimirTicket);

function imprimirTicket() {
    console.table(carrito);

    // Necesitaremos para registrar las ventas a posteriori, guardar los ids de los productos del carrito
    const idProductos = []; // Array vacio de ids de producto!

    /*<!-- CDN para usar jsPDF -->
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>*/

    // Gracias al CDN, extraemos la clase jspdf del objeto global window
    const { jsPDF } = window.jspdf;

    // Creamos una nueva instancia deldocumento PDF usando la clase jsPDF
    const doc = new jsPDF();

    // Variable para caontrolar el eje vertical con un margen superior de 10px
    let y = 10;

    // Establecemos el tamaño de 16px para el primer texto
    doc.setFontSize(16);

    // Escribimos el texto "ticket compra" en la posicion (x=10 y=10) del pdf
    doc.text("Llama-ticket de compra:", 10, y);

    // Aumentamos 10px para dejar espacio despues del titulo
    y += 10;

    // Cambiamos el tamaño de fuente a 12 para los productos del ticket
    doc.setFontSize(12);

    // Iteramos el carrito e imprimimos nombre y precio
    carrito.forEach(producto => {

        idProductos.push(producto.id); // Llenamos el array de ids de productos (necesario para la venta despues)

        doc.text(`${producto.name} - ${producto.price}`, 10, y); // Creamos el texto por cada producto, nombre - precio

        // Incrementamos 7px la posicion vertical para evitar solapamiento
        y += 7;
    });


    // Calculamos el total del ticket usando reduce
    const total = carrito.reduce((total, producto) => total + parseInt(producto.price), 0);

    // Añadimos 5px en el eje vertical para separar los productos del total
    y += 5;

    // Escribimos el total del ticket en el PDF, despues de listado de productos
    doc.text(`Total: $${total}`, 10, y);


    // Imprimimos el ticket de venta
    doc.save("ticket.pdf");

    // TO DO, llamada para registrar venta -> fetch metodo POST a /api/sales y luego crear este endpoint app.post("/api/sales")
    registrarVenta(total, idProductos);
}




// Registrar nueva venta /////////////////////////////
/* Que datos debemos enviar a la API?

Nuestro endpoint espera algo equivalente a los campos de la tabla sales:
    - date
    - total_price
    - user_name

Ademas, como nuestra tabla product_sales vincula los productos de la venta, necesitaremos enviar los ids de los productos vendidos

ejemplo del JSON
    {
        "date": "2025-12-01T12:30",
        "total_price": 8500,
        "user_name": "Arturo",
        "products": [1, 5]
    }

Que tendra que hacer nuestra API?

    1. Insertar la venta en sales
    2. Obtener el id de la venta 
    3. insertar los productos en product_sales
*/

async function registrarVenta(total, idProductos) {
    const fecha = new Date();

    // MySQL NO acepta fechas en formato ISO con milisegundos (.962) ni con la "Z"
    const fechaFormato = fecha.toISOString().slice(0, 19).replace("T", " "); // Limpiamos los datos de fecha standard para que los acepte mysql

    const data = {
        date: fechaFormato, // fecha formateada para mysql
        total_price: total, // total del precio que nos manda el ticket
        user_name: nombreUsuario, // usuario del sessionStorage
        products: idProductos // array de ids de producto que nos manda el ticket
    }

    /* TO DO, crear endpoint /api/sales
    
    const response = await fetch("http://localhost:3000/api/sales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
 
    if(response.ok) {
        console.log(response);
        alert(result.message);
 
        // Limpieza y redireccion -> La aplicacion debe "reiniciarse"
        sessionStorage.removeItem("nombreUsuario");
        // localStorage.removeItem("carrito")
        window.location.href = "index.html"
    }
    */

    
    // Limpieza y redireccion -> La aplicacion debe "reiniciarse"
    sessionStorage.removeItem("nombreUsuario");
    // localStorage.removeItem("carrito")
    window.location.href = "index.html"

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
