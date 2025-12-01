# UTN 2025 Cuatri 2 Div 131 :penguin:

# Guia Express :books:

`Express.js` es un framework web para Node.js que nos permite construir servidores y aplicaciones web de forma sencilla y rapida

- Es minimalista, está diseñado para facilitar la creación de servidores web
- Nos permite crear rutas de forma simplificada
- Manejar peticiones HTTP
- Aplicar middlewares de forma más simple
- Es ligero y flexible
- Cuenta con un gran ecosistema de modulos y herramientas con [npm](https://www.npmjs.com/)


---



## Resumen estructura de directorios del proyecto Express.js

```
nombreProyecto/ -> Es la raiz de nuestro proyecto
|
├── bitacora/ -> OPCIONAL: Carpeta donde tenemos nuestra propia documentacion interna y anotaciones
│
├── src/ -> Source: Contiene la logica principal de la aplicacion
│   ├── api/ -> Logica de nuestra API REST
|   |   ├── config/ -> Archivo para obtener y exportar la info de las variables de entorno .env
|   |   ├── controllers/ -> Logica para gestionar peticiones y respuestas, req y res
|   |   ├── database/ -> Crea el pool de conexiones a la BBDD MySQL
|   |   ├── middlewares/ -> Funciones que se ejecutan entre la req y la res
|   |   ├── models/ -> Comunicaciones con la BBDD
|   |   ├── routes/ -> Desacoplamos las rutas que originalmente iban en el index.js, llaman al controlador
|   |   ├── utils/ -> Logica para trabajar con archivos y rutas de proyecto
|   |   |
│   ├── public/ -> Archivos estaticos (img, css, js)
│   └── views/ -> Vistas EJS que sirve el back
|
├── .env -> Las variables que contienen info sensible, constraseñas, puertos, etc
├── index.js -> Archivo de arranque del servidor, que centraliza toda la logica de la aplicacion
├── package.json -> "Libro" de instrucciones que centraliza la info que necesita nuestra app para funcionar
├── README.md -> Documentacion de nuestro repo
```

---


## Resumen de [Modelo Vista Controlador](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador)

![Resumen MVC](resumenMVC.png)

1. El `index.js` registra una peticion a `"/api/products"` y redirige a `productRoutes`
```js
// index.js
app.use("/api/products", productRoutes); 
```

2. La ruta registra una peticion get con un id `"/:id`, aplica el middleware `validateId` y redirige al controlador `getProductById`
```js
// product.routes.js
router.get("/:id", validateId, getProductById);
```

3. El controlador recibe una peticion y solicita al modelo `productModels` esa informacion
```js
// product.controllers.js
let [result] = await ProductModels.deleteProduct(id);
```

4. Finalmente, el modelo hace la consulta a la BBDD y le devuelve la solicitud al controlador
```js
// product.models.js
let sql = `SELECT * FROM products where id = ?`;
return connection.query(sql, [id]); // El id reemplaza nuestro ?
```

---


## Resumen de [EJS](https://www.npmjs.com/package/ejs)

1. **Configuracion para servir archivos estaticos en nuestra aplicacion** -> `src/public`, funcionalidad en `src/api/utils/index.js`
```js
import { fileURLToPath } from "url"; // Convierte una URL de archivo file:// a una ruta de sistema de archivos
import { dirname, join } from "path"; // dirname devuelve del directorio de una ruta y join unifica rutas

// Obtener el nombre de archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../"); 

// Exportamos el directorio base calculado y la funcion "join" para construir rutas relativas
export {
    __dirname,
    join
}
```

2. **Configuracion para usar EJS como motor de vistas** -> `src/views`

```js
// index.js

// Middleware para servir archivos estaticos (img, css, js)
app.use(express.static(join(__dirname, "src/public"))); // Nuestros archivos estaticos se serviran desde la carpeta public

// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views")); // Nuestras vistas se serviran desde la carpeta public
```

#### Esquema conceptual EJS

![Muestra EJS](ejs.png)

---


### Guia del TP
1. CRUD minimo para que funcione cuanto antes -> 1 endpoint, 2 vista
2. Optimizaciones para ese CRUD
3. Aplicar el modelo MVC
    1. Desacoplar rutas
    2. Desacoplar middlewares
    3. Desacoplar controladores
    4. Desacoplar modelos

4. Servir archivos estaticos y plantillas con EJS
5. EXTRAS del TP
    - login + creacion de usuarios
    - Incorporar bcrypt en el login y en la creacion de usuarios
    - [Impresion tickets pdf](https://github.com/parallax/jsPDF)
    - Creacion de ventas (vista + endpoint)
    - [Descarga excels productos y ventas](https://www.npmjs.com/package/exceljs)
    - [Subida de archivos fisicos con Multer](https://www.npmjs.com/package/multer)
    - Paginacion

---

## Notas

- [Chusmear codigos de estado HTTP](https://http.cat/)
- **Recomendacion**: Ir avanzando con el TP, adaptando el parcial para consumir los datos de aca
    - [API Rest publica de tienda de productos](https://fakestoreapi.com/products/)

- [Lenguaje Markdown](https://es.wikipedia.org/wiki/Markdown)

#### Recomendacion para nombrar los repos del tp
- `grupoXIProgra3ntegrador25Cuatri2_back`
- `grupoXProgra3Integrador25Cuatri2_front`

---


## Notas TP Integrador

## Paso 1
### Proyecto frontend
- *Reutilizamos el 1er parcial pero consumiendo nuestra propia API Rest*

- App front donde usuarios compran 2 tipos de producto

- Al finalizar la compra, creamos un boton que diga "hacer compra" o "imprimir ticket"
    - imprimir 1 ticket con la libreria Js PDF
    - registramos 1 venta (POST para registrar una venta)

#### **Explicacion del cliente**

1. Pantalla de bienvenida donde se pide insertar nombre (y guardarlo en la sesion)

2. Pantalla productos. 
    - Visualizar tarjetas de productos -> datos, img y boton agregar a carrito
    - Esta pantalla productos se ve gracias a que hacemos una peticion fetch a nuestra API Rest, [ejemplo](https://jsonplaceholder.typicode.com/users)

3. Pantalla carrito. Listado de productos añadidos al carrito. Debe permitir agregar o quitar distintas cantidades

4. Pantalla ticket. Confirmado el carrito (boton hacer compra o imprimir ticket)
    - Imprimimos un ticket en pdf con [JS PDF](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html)
    - Se produce un POST a la tabla ventas (hora, cantidad de productos, precio total, etc)

---

## Paso 2

#### BBDD MySQL con las respectivas tablas 

### Proyecto backend
- Una API Rest que va a estar conectada a la BBDD y va a devolver datos

- Nuevas vistas HTML (EJS) -> Es el propio servidor el que va a generar las vistas y el HTML
- Esta vista va a ser el panel de administracion o "backoffice" que nos permitira gestionar productos y usuarios


#### **Explicacion del servidor**
Solamente vamos a crear usuarios admins! los clientes no se loguean, solamente se registra en el ticket y en la venta el nombre que pusieran en la pantalla de bienvenida

1. *Pantalla login que debe permitir ingresar correo y password* -> Conveniente dejar este paso para cuando esten hechas las pantallas

2. Con este login exitoso, pantalla dashboard que posee las siguientes vistas asi como el nav para redirigir a las pantallas de alta, baja y modificacion de productos y usuarios

    2.1 Listado de productos que trae todo el choclo de productos como nuestro parcial -> **GET**

    2.2. Pantalla para obtener productos/usuarios por su id -> **GET by id**

    2.3. Pantalla alta producto para cargar un nuevo producto son con un formulario que permita cargar sus datos y su imagen en url  -> **POST**

    2.4. Recicla el form de get by id -> Pantalla modificar producto para modificar los datos de un producto a partir de su ID -> **PUT**

    2.5 Recicla el form de get by id -> Pantalla para eliminar producto -> **DELETE**

---


## Paso 3
Ya con la API Rest andando 

### 3.1 Login basico con EJS y [bcrypt](https://www.npmjs.com/package/bcrypt)

### 3.2 Subida de archivos con Multer

### 3.3 Descarga de excel con las ventas

### 3.4 Paginacion


---

### Lista de videos


#### 1. [Introductorio / Playlist de Programacion web de todocode](https://www.youtube.com/watch?v=lC6JOQLIgp0&list=PLQxX2eiEaqbxx6Ds5bd1F6LZJo7_OnZhV&index=3)
    - Arquitectura cliente-servidor
    - Protocolo HTTP -> Requests y Responses
    - Que es JSON
    - Que son las APIs

#### 2. [Avanzado / Clase completa sobre protocolo HTTP y arquitectura cliente/servidor](https://www.youtube.com/watch?v=l6oF_RpBf64)


#### 3. [Clase Multer]()