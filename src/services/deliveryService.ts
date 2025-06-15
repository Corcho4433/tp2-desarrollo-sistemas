import { db } from "../db/db.js";
import { UserService } from "./userService.js";
import { MenuService } from "./menuService.js";

export class DeliveryService {
	static instance: DeliveryService;

    private userService = UserService.getInstance();
    private menuService = MenuService.getInstance();

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

    public async createDelivery(id_cliente: string, platos: {id_plato: string, cantidad: number}[]) {
        try {

            const cliente = await this.userService.getClientById(id_cliente);
            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }

            let subtotal = 0;

            for (const {id_plato, cantidad  } of platos) {
                const precio_unitario = await this.menuService.getPrice(id_plato);
                if (!precio_unitario) {
                    throw new Error("Hubo un error al calcular el precio unitario");
                }
                subtotal += precio_unitario * cantidad;
            }

            if (!subtotal) {
                throw new Error("Hubo un error al calcular el subtotal");
            }
            const domicilio_envio = cliente.domicilio_envio;
            await this.userService.addPedido(id_cliente);
            const descuento = await this.userService.getDiscount(id_cliente); 
            const pedido = await db.pedidos.create({
                data: {
                    id_cliente: id_cliente,
                    domicilio_entrega: domicilio_envio,
                    subtotal: subtotal,
                    id_estado: "cmbppzpkd0000mku12mzshuv6",
                    porcentaje_descuento: descuento,
                    monto_total: subtotal - (descuento*subtotal)/100, 
                },
            });

            await db.platos_Pedido.createMany({
                data: platos.map((plato) => ({ id_pedido: pedido.id, id_plato: plato.id_plato, cantidad: plato.cantidad })),
            });

            return pedido;
        } catch (error) {
            console.error(error);
            throw new Error("Hubo un error al crear el pedido. Revisar datos");
        }
    }

    public async getDeliveryStatus(id_cliente: string) {
        try {
            const estado = await db.pedidos.findMany({
                where: {
                    id_cliente: id_cliente,
                },
                select: {
                    id: true,
                    estado: {
                        select: {
                            estado: true,
                        },
                    },
                    monto_total: true,
                    domicilio_entrega: true,
                },
            });
            if (!estado) {
                throw new Error("Este usuario no tiene pedidos.");
            }
            return estado;
        } catch (error) {
            console.error(error);
            throw new Error("Hubo un error al consultar el estado del pedido");
        }
    }

    public async updateDeliveryStatus(id_pedido: string, estado: string) {
        try {
            const pedido = await db.pedidos.findUnique({
                where: {
                    id: id_pedido,
                }
            });
            if (!pedido) {
                throw new Error("No se encontro el pedido.");
            }
            const estado_check = await db.estado_Pedido.findFirst({
                where: {
                    estado: estado,
                },
            });
            if (!estado_check) {
                throw new Error("Estado no encontrado. Revisar datos.");
            }
            await db.pedidos.update({
                where: {
                    id: id_pedido,
                },
                data: {
                    id_estado: estado_check.id,
                },
            });
            const pedido_estado = await db.pedidos.findUnique({
                where: {
                    id: id_pedido, 
                },
                select: {
                    id: true,
                    estado: {
                        select: {
                            estado: true,
                        },
                    },
                    monto_total: true,
                    domicilio_entrega: true,
                },
            });
            return pedido_estado;
        } catch (error) {
            console.error(error);
            throw new Error("Hubo un error al actualizar el estado del pedido. Revisar datos.");
        }
    }  
}