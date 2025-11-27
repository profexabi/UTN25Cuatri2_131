// Importamos el middleware Router
import { Router } from "express";
import { insertUser } from "../controllers/user.controllers.js";
const router = Router();

router.post("/", insertUser);

export default router;