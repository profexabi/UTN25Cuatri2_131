/*===========================
    Modelos producto
===========================*/
import connection from "../database/db.js"; // Importamos la conexion a la BBDD


// Seleccionar todos los productos
const selectAllProducts = () => {
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

        // Optimizacion 1: Seleccionar solamente los campos necesarios -> name, image, category, price porque es la unica informacion que necesita ver el cliente
        const sql = `SELECT * FROM products`;
        return connection.query(sql); // Retorna una promesa que se resuelve en el controlador
}


// Seleccionar producto por id
const selectProductWhereId = (id) => {
      // Los ? representan los placeholders, se usan por temas de seguridad para prevenir inyecciones SQL
      let sql = `SELECT * FROM products where id = ?`;
      return connection.query(sql, [id]); // El id reemplaza nuestro ?
}


// Crear producto
const insertProduct = (name, image, category, price) => {
     // Los placeholders ?, evitan inyecciones SQL para evitar ataques de este tipo
     let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

     // Le enviamos estos valores a la BBDD
     return connection.query(sql, [name, image, category, price]);
}



// Actualizar producto
const updateProduct = (name, image, price, category, id) => {

    let sql = `
        UPDATE products
        SET name = ?, image = ?, price = ?, category = ?
        WHERE id = ?
    `;

    return connection.query(sql, [name, image, price, category, id]);
}


// Eliminar producto
const deleteProduct = (id) => {
      // Opcion 1: Borrado normal
      let sql = "DELETE FROM products WHERE id = ?";

      // Opcion 2: Baja logica
      // let sql2 = "UPDATE products set active = 0 WHERE id = ?";

      return connection.query(sql, [id]);
}




export default {
    selectAllProducts,
    selectProductWhereId,
    insertProduct,
    updateProduct,
    deleteProduct
}