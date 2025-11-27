let altaProducts_container = document.getElementById("altaProducts-container");
let altaUsers_container = document.getElementById("altaUsers-container");
let url = "http://localhost:3000";


// Alta Usuarios
altaUsers_container.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target); // Transformamos en objeto FormData los campos del formulario

    let data = Object.fromEntries(formData.entries()); // Transformaos a objeto JS el objeto FormData

    console.log(data);

    // Vamos a enviar los datos de nuestro usuario al endpoint /api/users
    try {
        let response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result);
            alert(result.message)
        }

    } catch(error) { // El catch solo captura errores de red
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});


// Alta Productos
altaProducts_container.addEventListener("submit", async (event) => {

    event.preventDefault(); // Evitamos el envio por defecto del formulario

    console.log(event.target);
    //event.target devuelve el formulario HTML que activo el evento

    // Guardamos toda la informacion de nuestro formulario en el objeto nativo FormData
    let formData = new FormData(event.target);

    // Esto no deberia consologuearse en producccion 
    console.log(formData); // Esto no se ve en navegadores basados en Chromium

    // Transformamos la informacion del objeto FormData en un objeto JavaScript normal
    let data = Object.fromEntries(formData.entries()); // Nuestro objeto ya esta listo para enviarse previo parseo a JSON

    /* Ahora ya le podemos meter en el cuerpo de la peticion HTTP Post, este objeto con los datos del formulario en JSON
    {
        "name":"faina",
        "image":"https://www.lanacion.com.ar/resizer/v2/fain-G5ZYOIATCNALHJPHQVNTPXRDOM.jpg",
        "price":"150",
        "category":"food"
    }
    */
    try {
        // En peticiones distintas a GET, tenemos que especificar mas informacion en un parametro de opciones
        let response = await fetch(`${url}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        // Recordemos que el catch en este try solo captura errores de red
        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result);
            alert(result.message)
        }



    } catch(error) { // El catch solo captura errores de red
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
    
});

