/*======================
    Importaciones
======================*/
import express from "express"; // Importamos el framework Express
const app = express(); // Inicializamos express en la variable app, que contendra todos los metodos

import connection from "./src/api/database/db.js"; // Importamos la conexion a la BBDD
import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno
const PORT = environments.port;

import cors from "cors"; // Importamos el modulo CORS


/*===================
    Middlewares
=====================
- Los middlewares son basicamente funciones que se ejecutan entre la peticion req y la respuesta res

- La idea de los middlewares es no repetir instrucciones por cada endpoint

- Estos son middlewares de aplicacion -> se aplican a todas las peticiones
*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body

// Logger -> Vamos a registrar por consola cada peticion que se produjo
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]  ${req.method}  ${req.url}`);
    // Si no llamamos a next, la conexion se queda trabada aca, next permite continuar procesando la operacion
    next(); 
});

// Tendremos tambien middlewares de ruta -> se aplican a ciertas url
// TO DO, crear middleware de ruta


/*======================
    Endpoints
======================*/

app.get("/dashboard", (req, res) => {
    // Devolvemos una respuesta en texto plano desde la url /dashboard
    // Posteriormente desde esta url devolveremos una pagina HTML de la carpeta views
    res.send("Hola desde la raiz del TP Integrador");
});

/* CRUD (Create Read Update Delete)

    - CREATE -> POST
    - READ -> GET
    - UPDATE -> PUT
    - DELETE -> DELETE
*/

////////////////
// READ -> GET
// Get products -> Traer todos los productos
app.get("/products", async (req, res) => {
    try {
        
        /* Ejemplo de consulta trayendo TODA la informacion de la BBDD

        const sql = `SELECT * FROM products`;
        const respuesta = await connection.query(sql);
        
        console.log(respuesta); // Aca trae no solo los resultados de la consulta sino tb mas info como metadatos

        respuesta, ademas de los resultados de la consulta en forma de array de objetos, nos devuelve tambien el tipo de datos que trae
          [
            `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            `name` VARCHAR(100) NOT NULL,
            `image` VARCHAR(255) NOT NULL,
            `category` STRING(20) NOT NULL ENUM,
            `price` DECIMAL(10,2) NOT NULL,
            `active` TINYINT(1) NOT NULL
        ]*/

        const sql = `SELECT * FROM products`;
        const [rows] = await connection.query(sql);
        // console.log(rows);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });


    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});



////////////////
// READ -> GET
// Get product by id -> Consultar producto por su id
app.get("/products/:id", async (req, res) => {
    try {

        // el :id se extrae con el objeto request -> req.params.id
        let { id } = req.params; // Esto nos permite obtener el valor numerico despues de products /products/2

        /* Si enviara este valor con post, lo recogeria asi:
        let { id } = req.body;
        */

        // Los ? representan los placeholders, se usan por temas de seguridad para prevenir inyecciones SQL
        let sql = `SELECT * FROM products where id = ?`;
        const [rows] = await connection.query(sql, [id]); // El id reemplaza nuestro ?

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        })
    }
});


///////////////////
// CREATE -> POST
// Crear producto
app.post("/products", async (req, res) => {
    try {
        const { name, image, category, price } = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body); 

        // Los placeholders ?, evitan inyecciones SQL para evitar ataques de este tipo
        let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

        // Le enviamos estos valores a la BBDD
        let [rows] = await connection.query(sql, [name, image, category, price]);

        // Devolvemos una respuesta 201 "Created"
        res.status(201).json({
            message: "Producto creado con exito"
        });


    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
});


///////////////////
// UPDATE -> PUT
// Actualizar un producto
app.put("/products", async (req, res) => {
    try {
        /*
        "id": 4,
        "name": "hamburguesa pollo a la parrilla",
        "image": "https://burgernj.com/wp-content/uploads/2021/05/Grilled-Chicken-Burger_.jpg",
        "category": "food",
        "price": "1500.00",
        "active": 1
      */
        let { id, name, image, category, price, active } = req.body;

        let sql = `
            UPDATE products
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [name, image, price, category, id]);
        console.log(result);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
        

    } catch (error) {
        console.error("Error al actualizar el producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});



////////////////
// DELETE -> DELETE
// Eliminar producto
app.delete("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        // Opcion 1: Borrado normal
        let sql = "DELETE FROM products WHERE id = ?";

        // Opcion 2: Baja logica
        // let sql2 = "UPDATE products set active = 0 WHERE id = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);
        // affectedRows: 1 -> Nos indica que hubo una fila que fue afectada

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });


    } catch (error) {
        console.log(`Error al eliminar un producto con id ${id}: `, error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}`,
            error: error.message
        })
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});