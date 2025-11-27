// Importamos el middleware Router
import { Router } from "express";
import connection from "../database/db.js";
const router = Router();

router.post("/", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if(!name ||!email ||!password) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }

        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const [rows] = await connection.query(sql, [name, email, password]);

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.log("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});

export default router;