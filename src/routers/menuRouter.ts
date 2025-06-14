import express from "express";
import { MenuService } from "../services/menuService";
import { isAuthMiddleware } from "../middleware/isAuthMiddleware";

export const menuRouter = express.Router();

const menu_service = MenuService.getInstance();


menuRouter.get("/", isAuthMiddleware, async (req, res) => {
	try {
		const menu = await menu_service.getMenu();
		res.status(200).json({ menu: menu });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

menuRouter.post("/add_dish", isAuthMiddleware, async (req, res) => {
	try {
		const { body } = req;

        if (!req.user || req.user.role !== "admin") {
	        res.status(403).json({ error: "No tienes permisos para realizar esta acción." });
        }      
		const { nombre, descripcion, precio, categoria } = body;
		const plato = await menu_service.addDish(
			nombre,
			descripcion,
			precio,
			categoria,
		);
		if (!plato) {
			throw new Error("Hubo un error al agregar el plato");
		}
		res.status(201).json({ data: plato.id, Plato_agregado: nombre });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});