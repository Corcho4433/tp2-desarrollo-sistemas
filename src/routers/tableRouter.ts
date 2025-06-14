import express from "express";
import type { Request } from "express"
import { TableService } from "../services/tableService";
import { isAuthMiddleware, type ClienteFromToken } from "../middleware/isAuthMiddleware";

export const tableRouter = express.Router();

const table_service = TableService.getInstance();

tableRouter.get("/status", isAuthMiddleware, async (req, res) => {
    try {
        const mesas = await table_service.getTables();
        res.status(200).json({ mesas: mesas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

tableRouter.patch("/reserve_table/:id", isAuthMiddleware, async (req: Request<{id: string}>, res) => {
    try {
        const id = Number.parseInt(req.params.id);

        const cliente = req.user as ClienteFromToken;
        const mesa = await table_service.reserveTable(id, cliente.id);
        res.status(200).json({ data: mesa.id, cliente: cliente.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

tableRouter.patch("/free_table/:id", async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const mesa = await table_service.freeTable(id);
        res.status(200).json({ data: mesa.id, "message": "Mesa liberada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

tableRouter.post("/add_table", async (req, res) => {
    try {
        const mesa = await table_service.createTable();
        res.status(201).json({ data: mesa.id, "message": "Mesa creada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

tableRouter.post("/remove_table/:id", async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const mesa = await table_service.deleteTable(id);
        res.status(201).json({ data: mesa.id, "message": "Mesa eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});