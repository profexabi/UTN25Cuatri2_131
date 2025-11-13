/*===============================
    Controladores producto
===============================*/

import ProductModels from "../models/product.models.js"

//////////////////
// Get products -> Traer todos los productos
// Similiar al addEventListener, porque se ejecuta constantemente esperando una accion para ejecutar una fucion -> elemento.addEventListener("click", () => {})
export const getAllProducts = async (req, res) => { 
    try {

        const [rows] = await ProductModels.selectAllProducts();
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });


    } catch (error) {
        // Este console.log muestra en la consola del servidor
        console.error("Error al obtener productos", error);

        // Esta es la respuesta que le devolvemos al cliente, para verla como JSON
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}



////////////////////////
// Get product by id -> Consultar producto por su id
export const getProductById = async (req, res) => {
    try {

        // el :id se extrae con el objeto request -> req.params.id
        let { id } = req.params; // Esto nos permite obtener el valor numerico despues de products //2

        /* Pasamos a definir el middleware validateId
        // Optimizacion 1: Validacion de parametros antes de acceder a la BBDD para evitar hacer una query si el id no es valido
        // Esta logica luego la hara un middleware validateId -> para EVITAR tener que repetir este codigo 
        if(!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: "El id del producto debe ser un numero valido"
            });
        }
        */
        /* Si enviara este valor con post, lo recogeria asi:
        let { id } = req.body;
        */

        const [rows] = await ProductModels.selectProductWhereId(id);


        // Hacemos la consulta, y tenemos el resultado en la variable rows
        // Optimizacion 2: Comprobamos que existe el producto con ese id
        if(rows.length === 0) {
            console.log("Error, no existe producto con ese id");

            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.error("Error obteniendo producto con id", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        })
    }
}



//////////////////
// Crear producto
export const createProduct = async (req, res) => {
    try {
        const { name, image, category, price } = req.body;
        // Aca imprimimos lo que enviamos desde el form que previamente se parseo gracias al middleware -> express.json()
        console.log(req.body); 

        // Optimizacion 1: Validacion datos de entrada
        if(!name || !image || !category || !price) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
            // return hace que el endpoint termine aca y el usuario solo reciba esta respuesta
        }

        let [rows] = await ProductModels.insertProduct(name, image, category, price);
        // console.log(rows);

        // Devolvemos una respuesta 201 "Created"
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });


    } catch (error) {
        console.error("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}



// Modificar un producto
export const modifyProduct = async (req, res) => {
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

        // Optimizacion 1: Validacion basica de datos
        if(!id || !name || !category || !price || !active) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }


        let [result] = await ProductModels.updateProduct(name, image, price, category, id);
        console.log(result);

        // Optimizacion 2: Testeamos que se actualizara este producto
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

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
}



// Eliminar producto
export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;


        let [result] = await ProductModels.deleteProduct(id);
        console.log(result);
        // affectedRows: 1 -> Nos indica que hubo una fila que fue afectada

        // Optimizacion 1 -> Ya hacemos la validacion del Id a traves del middleware

        // Optimizacion 2 -> Comprobar si realmente eliminamos un producto
        if(result.affectedRows === 0) { // Quiere decir que no afectamos ninguna fila
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }


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
}