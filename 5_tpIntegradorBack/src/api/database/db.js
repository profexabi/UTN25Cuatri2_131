// Importamos el modulo que instalamos previamente para conectarnos a la BBDD mysql
import mysql from "mysql2/promise";

// Importamos el archivo de environments
import environments from "../config/environments.js";
const { database } = environments;


const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;