// Middleware de aplicacion -> Se aplica a todas las peticiones y respuestas
// Middleware (de aplicacion) logger -> Vamos a registrar por consola cada peticion que se produjo
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]  ${req.method}  ${req.url}`);
    // Si no llamamos a next, la conexion se queda trabada aca, next permite continuar procesando la operacion
    next(); 
}


// Middlewares de ruta -> se aplican a ciertas url
// Middleware (de ruta) validador de Id
const validateId = (req, res, next) => {
    const { id } = req.params;

    // Validamos que el id no sea un numero (la consulta podria fallar o generar un error en la BBDD)
    if(!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "El id del producto debe ser un numero valido"
        })
    };

    // Convertimos el parametro id a un numero entero (porque la url viene como string)
    req.id = parseInt(id, 10);

    console.log("Id validado: ", req.id);

    next();
}


export {
    loggerUrl,
    validateId
}