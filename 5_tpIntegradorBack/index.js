/*======================
    Importaciones
======================*/
import express from "express"; // Importamos el framework Express
const app = express();
import environments from "./src/api/config/environments.js"; // Importamos las variables de entorno
import connection from "./src/api/database/db.js"; // Importamos la conexion a la BBDD
const PORT = environments.port;
import cors from "cors"; // Importamos el modulo CORS


/*===================
    Middlewares
===================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes

// TO DO, probar a comentar esto cuando hagamos el endpoint POST
app.use(express.json()); // Middleware para parsear JSON en el body




/*======================
    Endpoints
======================*/

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
        console.log(rows);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });



    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        })
    }
});

// TO DO, Optimizacion sacando SELECT * y eligiendo solo los campos que queremos mostrar


// Get product by id -> Consultar producto por su id
app.get("/products/:id", async (req, res) => {
    try {

        let { id } = req.params; // Esto nos permite obtener el valor numerico despues de products /products/2

        let sql = `SELECT * FROM products where id = ?`;
        const [rows] = await connection.query(sql, [id]); // El id reemplaza nuestro ?

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producot con id"
        })
    }
});

// TO DO, repasar endpoint y la conexion con la vista consultar.html


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});