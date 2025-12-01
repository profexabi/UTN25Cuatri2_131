

## **1 / Setup e instalacion**
#### Comandos con la terminal de git bash

### 1.1 Creacion del proyecto
```sh
# Creamos una carpeta para nuestro proyecto
mkdir nombreProyectoExpress
cd nombreProyectoExpress

# Inicializamos un proyecto npm (node package manager)
npm init -y

# Instalamos express https://www.npmjs.com/package/express
npm install express
```

- El comando `npm init` genera un archivo `package.json`, que contiene informacion clave sobre nuestro proyecto, incluyendo dependencias, scripts, metadatos, etc

- Creamos un archivo principal (que coincida con el main de nuestro package.json)

```json
"main": "index.js",
```

- Recordemos crear un archivo `.gitignore`!
```sh
touch .gitignore
```
- Metamos adentro los nombres de archivos o carpetas que no querramos que se pusheen a git ej: `node_modules` o `.env`
- Estos modulos quedan almacenados en nuestra compu pero no se pushean a git, para poder instalarlos cuando clonemos el repo, usaremos el comando
```sh
npm install
```


### 1.2 Instalamos las dependencias necesarias
Vamos a instalar:

- **express**: Framework web
- **nodemon**: Herramienta que reinicia automaticamente la aplicacion Node.js cuando detecta cambios en los archivos
- **dotenv**: Modulo que carga variables de enotrno desde un archivo `.env` al entorno de ejecucion de Node.js
- **mysql2**: Herramienta para conectarnos a nuestra BBDD MySQL
```sh
npm install express nodemon dotenv mysql2
```

### 1.3 Script personalizado y sintaxis ESM
- Agregamos type module en el `package.json` para usar la sintaxis moderna ES6 de ESM (EcmaScript Modules)
- Agregar script `dev`
```json
  "scripts": {
    "dev": "nodemon index.js"
  },
  "type": "module",
```

### 1.4 Creamos el archivo de variables de entorno `.env`
- Creamos el archivo `.env` y lo agregamos a `.gitignore` 
- En `.env` agregamos las variables locales sensibles como el puerto o la conexion a la BBDD
```txt
PORT=3000
DB_HOST="localhost"
DB_NAME="tp25_autoservicio"
DB_USER="root"
DB_PASSWORD="abc123."
```
---

## 2 / Estructura de directorios y conexion a la BBDD
- Creamos las carpetas y los archivos `src/api/config/environments.js` y `src/api/database/db.js`

- en `src/api/config/environments.js`
```js
import dotenv from "dotenv"; // Importamos el modulo dotenv

dotenv.config(); // Cargamos las variables de entorno desde el archivo.env

// Vamos a exportar esta informacion del .env
export default {
    port: process.env.PORT || 3500,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }   
}
```

- [Documentacion mysql2](https://sidorares.github.io/node-mysql2/docs/documentation)
- en `src/api/database/db.js`
```js
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
```

- Un pool de conexiones es un conjunto de conexiones activas y reutilizables a la BBDD
- En lugar de abrir y cerrar una nueva conexion cada vez que hacemos una consulta cada vez que hacemos una consulta, el pool:
    - Mantiene abiertas varias conexiones
    - Las reutiliza para distintas consultas
    - Mejora el rendimiento y eficacia del servidor
    - Controla cuantas conexiones pueden usarse al mismo tiempo
    - Evita crear y destruir conexiones constantemente
    - Reduce la carga en la BBDD
    - Mejora la velocidad y capacidad de respuesta de la app


---



## 3 / Consumiendo nuestra API Rest desde el cliente

### 3.1 Instalar CORS en nuestro servidor para permitir a nuestra API ser consumida desde el cliente

#### Que es CORS?
CORS (Cross-Origin Resource Sharing, o intercambio de recursos entre orígenes) es un mecanismo de seguridad implementado por los navegadores web que permite a una página cargada en un origen (dominio, protocolo y puerto) solicitar recursos a un servidor ubicado en un origen diferente, siempre que el servidor destino autorice explícitamente dicha solicitud.
 Este mecanismo es una extensión de la política del mismo origen (Same-Origin Policy), que originalmente prohibía completamente el acceso a recursos de otros dominios para prevenir ataques como el Cross-Site Scripting (XSS) y la falsificación de solicitudes entre sitios (CSRF).

- Instalar [CORS](https://www.npmjs.com/package/cors)

```sh
npm i cors
```

---