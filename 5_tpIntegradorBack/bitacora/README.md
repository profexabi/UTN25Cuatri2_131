# Apuntes

## Como servir archivos estaticos en Express.js usando la sintaxis ESM?

### En ESM no tenemos `__dirname` ni `__filename` de manera que tenemos que crearlos a mano
```js
// src/api/utils/index.js

// Importacion de modulos para trabajar con rutas
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

### Ahora en el archivo raiz de nuestra aplicacion `index.js`
```js
// Incorporamos la configuracion en el index.js
import { __dirname, join } from "./src/api/utils/index.js";

app.use(express.static(join(__dirname, "src/public"))) // Middleware para servir archivos estaticos
```

### Gracias a esta configuracion, ahora podemos acceder a los archivos desde el navegador
Una vez configurado, podemos acceder a los archivos estaticos directamente desde su **ruta relativa**

- http://localhost:3000/css/styles.css
- http://localhost:3000/js/main.js
- http://localhost:3000/img/logo.png


---

## ¿Qué es Express.static?

`express.static` es un middleware integrado Express.js diseñada para servir archivos estáticos de manera eficiente.  Permite al servidor entregar archivos como imágenes, hojas de estilo CSS, scripts JavaScript y documentos HTML directamente a los clientes sin necesidad de procesamiento dinámico para cada solicitud.  Esta funcionalidad es crucial para mejorar el rendimiento de las aplicaciones web, ya que reduce la carga del servidor y mejora la velocidad de entrega de contenido. 

El middleware se configura normalmente especificando una ruta de directorio donde se almacenan los activos estáticos, como `app.use(express.static(“public”))`. Una vez configurado, Express sirve automáticamente cualquier archivo ubicado dentro del directorio especificado cuando se solicita a través de HTTP, utilizando la ruta del archivo relativa al directorio raíz. Por ejemplo, un archivo `public/styles.css` se puede acceder en `http://localhost:3000/styles.css`. 

`express.static` también se puede utilizar con rutas virtuales para crear rutas URL personalizadas para archivos estáticos, lo que ofrece una mayor flexibilidad en la organización de las URL. Admite opciones de configuración avanzadas como el almacenamiento en caché, la compresión y los encabezados personalizados, que se pueden configurar a través de un objeto de opciones. Además, se puede aplicar a varios directorios en secuencia, y Express los busca uno por uno hasta encontrar el archivo solicitado. 

