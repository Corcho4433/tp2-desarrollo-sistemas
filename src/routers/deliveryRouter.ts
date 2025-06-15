import { Router } from "express";
import { DeliveryService } from "../services/deliveryService";
import { isAuthMiddleware, type ClienteFromToken } from "../middleware/isAuthMiddleware";

export const deliveryRouter = Router();

const delivery_service = DeliveryService.getInstance();

deliveryRouter.post("/create_delivery", isAuthMiddleware, async (req, res) => {
    try {
        if (!req.user || req.user.role !== "cliente") {
	        res.status(403).json({ error: "No tienes permisos para realizar esta acción." });
            return;
        }
        const { body } = req;

        const cliente = req.user as ClienteFromToken;
        const { platos } = body;

        if (!platos) {
            res.status(500).json({ error: "Falta el parámetro `platos`" });
        }

        if (!Array.isArray(platos)) {
            res.status(500).json({ error: "`platos` debe ser una lista (array)." });
        }

        if (platos.length === 0) {
            res.status(500).json({ error: "La lista de `platos` no puede estar vacía." });
        }
        
        const pedido = await delivery_service.createDelivery(cliente.id, platos);
        res.status(201).json({ data: pedido.id, "message": "Pedido creado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

deliveryRouter.get("/delivery_status", isAuthMiddleware, async (req, res) => {
    try {
        const { body } = req;
        const { id_cliente } = body;
        if (!id_cliente) {
            res.status(500).json({ error: "Falta el parámetro `id_cliente`" });
        }
        const estado = await delivery_service.getDeliveryStatus(id_cliente);
        res.status(200).json({ data: estado, "message": "Estado(s) de pedido(s)" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

deliveryRouter.put("/update_delivery_status", isAuthMiddleware, async (req, res) => {
    try {
        if (!req.user || req.user.role !== "admin") {
	        res.status(403).json({ error: "No tienes permisos para realizar esta acción." });
            return;
        }
        const { body } = req;
        
        if (!req.user || req.user.role !== "admin") {
	        res.status(403).json({ error: "No tienes permisos para realizar esta acción." });
        }       

        const { id_pedido, estado } = body;
        if (!id_pedido) {
            res.status(500).json({ error: "Falta el parámetro `id_pedido`" });
        }
        if (!estado) {
            res.status(500).json({ error: "Falta el parámetro `estado`" });
        }
        const estado_pedido = await delivery_service.updateDeliveryStatus(id_pedido, estado);
        res.status(200).json({ data: estado_pedido, "message": "Estado(s) de pedido(s) actualizado(s)" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});
