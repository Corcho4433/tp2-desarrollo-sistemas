import express from "express";
import { TableService } from "../services/tableService";

export const tableRouter = express.Router();

const table_service = TableService.getInstance();

tableRouter.get("/status", async (req, res) => {
    try {
        const mesas = await table_service.getTables();
        res.status(200).json({ mesas: mesas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

tableRouter.patch("/reserve_table/:id", async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const { body } = req;
        const { id_cliente } = body;
        const mesa = await table_service.reserveTable(id, id_cliente);
        res.status(200).json({ data: mesa.id, cliente: id_cliente });
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