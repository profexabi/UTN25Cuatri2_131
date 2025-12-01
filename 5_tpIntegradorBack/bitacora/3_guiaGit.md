# Guia Git

### Introduccion
Git es un **Sistema de control de versiones** que permite
- Guardar historial de cambios
- Trabajar en equipo
- Revertir cambios si es necesario
- Ramificar el codigo

---


Vamos a trabajar con la consola de la terminal de VSCodium o VSCode -> `Ctrl + ñ` o `Ctrl + j`
Pueden probar a cambiar en el desplegable de la terminal a `Git Bash`

### 1. Configuracion inicial de git

Definimos nuestro nombre de usuario y nuestro email
Para limpiar la terminal escribimos `clear` o `Ctrl + l`

```sh
git config --global user.name "CosmeFulanito"
git config --global user.email "cosme@fulanito.com"

# Para chequear nuestros datos de git usaremos el comando
git config --list
```

### 2. Clonamos nuestro reposistorio
```sh
# Creamos un repositorio llamado repositorioPruebas131 y lo clonamos con el siguiente comando
git clone https://github.com/profexabi/repositorioPruebas131.git

# Navegamos hasta nuestro nuevo repositorio
cd repositorioPruebas

# Podremos listar nuestro remotos con
git remote -v

# Y cambiar el nombre a algun remoto con 
git remote rename origin github
```

### 3. Comandos fundamentales 

Por defecto, trabajamos en la rama principal `main`

```sh
# Ver el estado de los archivos
git status

# Guardamos los cambios totales
git add .

# O guardar solo un cambio con
git add nombreArchivo


# Una vez guardados estos cambios, los registramos (los commiteamos)
git commit -m "Engadidos archivos index.html e css/"
```

### 4. Trabajando con ramas / branches (espacios de trabajo)

#### Por que usar ramas?
Las ramas son basicamente espacios de trabajo donde vamos haciendo nuestros cambios

- **main**/master: Rama principal que representa la version estable de nuestra app
- **Ramas de desarrollo**: Nuevas features (nuevos agregados), fixes (arreglos)

#### Convenciones de nombres para ramas
- feature/nueva-funcionalidad
- fix/correccion-error
- docs/actualizacion-documentacion
- test/agregar-pruebas


#### Un `Pull Request o PR`
Es una solicitud para fusionar cambios de una rama (espacio de trabajo) a otra, permitiendo:

    - Revision de codigo por otro compas
    - Discusion de implementacion
    - Integracion controlada


```sh
# Ver ramas existentes
git branch

# Crear nueva rama
git branch nombreRama # git branch nombre-descripcion

# Cambiar a una rama
git checkout nombreRama

# Todo junto crear y cambiar a una rama
git checkout -b nombreRama

# Trabajamos en esa rama y al modificar algo podremos obtener info
git status # para ver cambios y en que rama estamos
git diff # para ver que se agrego y que se elimino

# Con estos cambios, guardo, registro y pusheo a mi rama
git add .
git commit -m "nuevos cambios en mi rama"
git push origin nombreRama
```

- **Siempre actualicemos los cambios!!**
```sh
# Volvemos a la rama principal
git checkout main
git pull # Para traer los cambios que recien mergeamos (fusionamos)
```

- **Al terminar de trabajar en una rama, idealmente eliminemosla**
```sh
# Eliminar rama local
git branch -d nombreRama

# Fusionar ramas
git merge nombreRama
```

### 5. Registrando nuevas versiones de la app con `git tag`


### 6. Apartando temporalmente los conflictos con `git stash` y `git pop`

