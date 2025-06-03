import express from "express";
import { MenuService } from "../services/menuService";

export const menuRouter = express.Router();

menuRouter.get("", async (req, res) => {
	try {
		const menu_service = MenuService.getInstance();
		const menu = await menu_service.getMenu();
		res.status(200).json({ menu: menu });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});
