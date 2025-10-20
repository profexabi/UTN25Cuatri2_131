# [Express.js](https://www.npmjs.com/package/express)

## ¿Qué es Express.js?

Express.js, comúnmente conocido como Express, es un framework web minimalista, rápido y flexible para Node.js, de código abierto y con licencia MIT. Es el framework de backend más popular para Node.js y se ha convertido en el estándar para desarrollar aplicaciones web y APIs.

Express proporciona un conjunto robusto de características para aplicaciones web y móviles, incluyendo un sistema de enrutamiento potente para manejar diferentes verbos HTTP (GET, POST, PUT, DELETE, etc.) en distintas rutas URL  Utiliza middleware para gestionar solicitudes y respuestas HTTP, permitiendo añadir funcionalidades como autenticación, compresión de respuestas, manejo de sesiones y gestión de errores  Este enfoque modular y minimalista permite a los desarrolladores estructurar sus proyectos de manera eficiente, agregando solo las herramientas necesarias mediante paquetes y módulos adicionales 

#### En resumen

Express.js es un framework para crear servidores web, super rápido, minimalista y de forma mucho mas sencilla. SImplifica el manejo de rutas, peticiones HTTP, respuestas y otras tareas comunes en el desarrollo backend.

**Básicamente, un framework web simplificado que nos permite crear servidores web de forma mas rapida y con menos lineas de codigo que utilizando el modulo http nativo de Node.js**


## Como crear un servidor con `Express.js`

Navegamos hasta nuestra carpeta donde vayamos a crear esta aplicacion y ejecutamos

```sh
npm init -y
```
Esto nos va a generar un archivo `package.json`, que es nuestro librito de instrucciones con la configuracion inicial

---

Ahora vamos a instalar `Express.js`

```sh
npm i express
```
---

### Que es el `package.json?`
El archivo `package.json` es nuestro librito de instrucciones con informacion clave del proyecto, incluyendo dependencias, scripts, metadatos, etc.

---

#### Que es `package-lock.json`
El archivo `package-lock.json` es un archivo generado automáticamente por el Administrador de Paquetes de Node (npm) cada vez que se modifica el árbol `node_modules` o el archivo `package.json`  Su función principal es garantizar que todas las instalaciones de dependencias sean idénticas, independientemente del entorno o de las actualizaciones intermedias de las dependencias  Este archivo contiene una representación detallada y exacta del árbol de dependencias, incluyendo las versiones exactas de cada paquete y sus subdependencias, lo que permite una instalación reproducible 

A diferencia de `package.json`, que solo especifica las dependencias y sus rangos de versiones (por ejemplo, `^1.4.0`), `package-lock.json` bloquea las versiones específicas que se instalaron en un momento dado  Esto evita problemas como el famoso "funciona en mi máquina" al asegurar que todos los desarrolladores del equipo, así como los sistemas de integración continua, instalen exactamente las mismas versiones de las dependencias  El archivo se genera automáticamente durante operaciones como `npm install` y debe incluirse en el control de versiones para mantener la consistencia del proyecto 

Además, `package-lock.json` optimiza el proceso de instalación al permitir a npm saltarse la resolución repetida de metadatos para paquetes ya instalados, mejorando así el rendimiento  A partir de npm v7, este archivo incluye suficiente información para obtener una imagen completa del árbol de paquetes, reduciendo la necesidad de leer `package.json` o el registro de npm durante la instalación  También permite a los usuarios "viajar en el tiempo" a estados anteriores del directorio `node_modules` sin tener que commitar el directorio en sí 

---

#### TO DO, pendiente, terminar de explicar `package.json`