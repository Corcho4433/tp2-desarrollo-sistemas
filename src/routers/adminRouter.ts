import express from "express";
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
		res.status(201).json({ mesas: mesas });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});
