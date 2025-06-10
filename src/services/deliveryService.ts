import { db } from "../db/db";
import { UserService } from "./userService";
import { MenuService } from "./menuService";

export class DeliveryService {
	static instance: DeliveryService;

	constructor() {
		if (DeliveryService.instance) {
			throw new Error("Usa DeliveryService.getInstance()!");
		}
		DeliveryService.instance = this;
	}

	static getInstance(): DeliveryService {
		if (!DeliveryService.instance) {
			DeliveryService.instance = new DeliveryService();
		}
		return DeliveryService.instance;
	}

    public async createDelivery(id_cliente: string, platos: string[]) {
        try {
            const userService = UserService.getInstance();
            const menuService = MenuService.getInstance();

            const cliente = await userService.getUser(id_cliente);
            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }
            const precio_total = await menuService.getTotalPrice(platos);
            if (!precio_total) {
                throw new Error("Hubo un error al calcular el precio total");
            }
            const domicilio_envio = cliente.domicilio_envio;
            await userService.addPedido(id_cliente);
            const descuento = await userService.getDiscount(id_cliente); 
            const pedido = await db.pedidos.create({
                data: {
                    id_cliente: id_cliente,
                    domicilio_entrega: domicilio_envio,
                    subtotal: precio_total,
                    id_estado: "cmbppzpkd0000mku12mzshuv6",
                    porcentaje_descuento: descuento,
                    monto_total: precio_total - (descuento*precio_total)/100,
                },
            });
            await db.platos_Pedido.createMany({
                data: platos.map((plato) => ({
                    id_pedido: pedido.id,
                    id_plato: plato,
                })),
            });
            return pedido;
        } catch (error) {
            console.error(error);
            throw new Error("Hubo un error al crear el pedido. Revisar datos");
        }
    }
}