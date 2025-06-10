import { Router } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";
import { DeliveryService } from "../services/deliveryService";

export const deliveryRouter = Router();

const delivery_service = DeliveryService.getInstance();

deliveryRouter.post("/create_delivery", async (req, res) => {
    try {
        const { body } = req;
        const { id_cliente, platos } = body;
        if (!Array.isArray(platos)) {
            res.status(500).json({ error: "`platos` debe ser una lista (array)." });
        }
        if (platos.length === 0) {
            res.status(500).json({ error: "La lista de `platos` no puede estar vacía." });
        }
        const pedido = await delivery_service.createDelivery(id_cliente, platos);
        res.status(201).json({ data: pedido.id, "message": "Pedido creado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});
