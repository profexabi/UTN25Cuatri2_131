import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";
const router = Router();

// Gracias al middleware Router, todas las peticiones (get, post, put, delete) directamente van al modulo productRoutes que se encargan de manejarlas

router.get("/", productsView);

router.get("/consultar", (req, res) => {
    
    /* TO DO
    if(!req.session.user) {
        return res.redirect("/login");
    }
    */
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});


router.get("/crear", (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    })
});

router.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    })
});

// Exportamos las rutas de las vistas
export default router;