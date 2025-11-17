// Logica para trabajar con archivos y rutas de proyecto -> Creando a mano con ESM dirname y filename

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


/* Que estamos haciendo aca?

    1. dirname(__filename): Obtiene el directorio del archivo actual:
        /home/user/proyecto/src/api/utils
        pero nosotros queremos llegar a la raiz del proyecto, por eso retrocedemos 3 niveles con "../../../"

    2. join(..., "../../../") Estamos retrocediendo 3 niveles en la estructura de directorios -> Apuntando a la raiz del proyecto. Salimos de utils/api/src
*/



/*===========================
     Esquema conceptual
=============================

- fileURLToPath: Convierte una URL de archivo (file://) a una ruta del sistema de archivos
- dirname: Devuelve el directorio padre de una ruta
- join: Une segmentos de ruta de forma segura

- import.meta.url:  file:///ruta/al/archivo.js
- fileURLToPath:    /ruta/al/archivo.js


================================
    Entendiendo el codigo
================================
Esta configuracion es necesaria porque en el sistema de modulos ESM no existe dirname ni filename como en CommonJS, por lo que tenemos que reconstruirlos manualmente (aca esta lo abstracto), esto nos permitirá:

    1. Trabajar con rutas absolutas
    2. Resolver correctamente rutas de archivos estaticos
    3. Construir paths (rutas) para  enviar HTML, CSS, imagenes, etc
    4. Evitar errores "Cannot fin module" o rutas rotas en produccion


EXTRA: Si no usaramos ESM -> "type": "module" en el package.json
simplemente en el index.js escribiriamos

app.use(express.static(__dirname + "/src/public")) -> Desde la raiz, apuntamos a la carpeta donde tenemos los archivos estaticos


Una vez creados a mano __filename y __dirname, pasamos a exportar

    __dirname y join para usarlos donde necesitemos rutas


Con esta configuracion podremos

    - Servir archivos estaticos -> /public

    - Enviar archivos HTML/CSS/JS -> /views el EJS y /public el CSS y JS

    - Cargar rutas de forma segura en cualquier zona del proyecto


Sin esta configuracion, Express:

    - No encuentra archivos estaticos
    - No puede servir imagenes
    - No carga vistas HTML
    - Rompe rutas al mover archivos
    - Falla cuando desplegamos en produccion

Este codigo hace que todo el sistema de rutas funcione correctamente usando ESM




================================
    Como se vincula con EJS?
================================

Este codigo es una solucion para manejar rutas de archivos y directorios en un proyecto Node.js con Express y EJS. Cuando trabajamos con Express.js y plantillas EJS, necesitamos:

    - Referenciar archivos de plantillas .ejs
    - Servir archivos estaticos (.css, .js, img)
    - Construir rutas confiables independientes del sistema operativo 

Node.js ejecuta codigo en diferentes entornos, y las rutas absolutas son fundamentales para evitar errores cla aplicacion se mueve entre directorios o servidores
*/