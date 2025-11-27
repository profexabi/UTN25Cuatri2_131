/*===============================
    Controladores producto
===============================*/

import ProductModels from "../models/product.models.js";

export const productsView = async (req, res) => {

    try {
        const [rows] = await ProductModels.selectAllProducts();

        res.render("index", {
            title: "Inicio",
            about:"Listado principal",
            productos: rows
        });

    } catch (error) {
        console.error(error);
    }
}