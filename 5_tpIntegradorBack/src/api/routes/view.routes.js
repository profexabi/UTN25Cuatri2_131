import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();

// Gracias al middleware Router, todas las peticiones (get, post, put, delete) directamente van al modulo productRoutes que se encargan de manejarlas

router.get("/", requireLogin, productsView);

router.get("/consultar", requireLogin, (req, res) => {

    /* Para no tener que repetir todo esto, exportamos esta logica al middleware requireLogin
    if(!req.session.user) {
        return res.redirect("/login");
    }
    */
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});


router.get("/crear", requireLogin, (req, res) => {

    res.render("crear", {
        title: "Crear",
        about: "Crear"
    });
});

router.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.get("/eliminar", requireLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    })
});


// Vista Login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

// Exportamos las rutas de las vistas
export default router;