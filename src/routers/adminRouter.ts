import express from "express";
import { MenuService } from "../services/menuService";
import { TableService } from "../services/tableService";

export const adminRouter = express.Router();

adminRouter.post("/create_table", async (req, res) => {
	try {
		const table_service = TableService.getInstance();
		const mesa = await table_service.createTable();
		res.status(201).json({ data: mesa.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

adminRouter.get("/tables", async (req, res) => {
	try {
		const table_service = TableService.getInstance();
		const mesas = await table_service.getTables();
		res.status(200).json({ mesas: mesas });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

adminRouter.post("/add_dish", async (req, res) => {
	try {
		const { body } = req;
		const { nombre, descripcion, precio, categoria } = body;
		const menu_service = MenuService.getInstance();
		const plato = await menu_service.addDish(
			nombre,
			descripcion,
			precio,
			categoria,
		);
		if (!plato) {
			throw new Error("Hubo un error al agregar el plato");
		}
		res.status(201).json({ data: plato.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});
