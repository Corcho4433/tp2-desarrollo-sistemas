import { db } from "../db/db";
import { hash } from "bcrypt";

export class UserService {
	static instance: UserService;

	constructor() {
		if (UserService.instance) {
			throw new Error("Usá DB.getInstance()!");
		}
		UserService.instance = this;
	}

	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

	public async getClient(id_user: string) {
		try {
			const cliente = await db.cliente.findFirst({
				where: {
					id: id_user,
				},
			});
			return cliente;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al obtener el cliente");
		}
	}

	public async getAdmin(id_user: string) {
		try {
			const admin = await db.administrador.findFirst({
				where: {
					id: id_user,
				},
			});
			return admin;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al obtener el admin");
		}
	}

	public async createClient(
		nombre: string,
		correo: string,
		telefono: string,	
		domicilio_envio: string,
		contrasena: string,
	) {
		try {
			const user = await db.cliente.create({
				data: {
					correo,
					nombre,
					contrasena: await hash(contrasena, 10),
					telefono,
					domicilio_envio,
				},
			});
			return user;
		} catch (error) {
			console.error("Error al crear cliente:", error);
			throw new Error("Hubo un error al crear cliente");
		}
	}

	public async parseRol(id_user: string) {
		try {
			const is_cliente = await db.cliente.findFirst({
				where: {
					id: id_user,
				},
			});

			if (!is_cliente) {
				const is_admin = await db.administrador.findFirst({
					where: {
						id: id_user,
					},
				});
				if (!is_admin) {
					throw new Error("Usuario no encontrado");
				}
				return "admin";
			}

			return "cliente";
			
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al obtener el rol del usuario");
		}
	}

	public async getDiscount(id_cliente: string) {
		try {
			const user = await db.cliente.findFirst({
				where: {
					id: id_cliente,
				},
			});
			if (!user) {
				throw new Error("Cliente no encontrado");
			}
			let descuento : number;
			const cantidad_pedidos = user.cantidad_pedidos;
			if (cantidad_pedidos > 3 && cantidad_pedidos <= 5) {
				descuento = 10;
			} else if (cantidad_pedidos > 5 && cantidad_pedidos <= 7) {
				descuento = 20;
			} else if (cantidad_pedidos > 7) {
				descuento = 50;
			} else {
				descuento = 0;
			}
			return descuento;
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al calcular el descuento");
		}
	}

	public async addPedido(id_cliente: string) {
		try {
			const user = await this.getClient(id_cliente);
			if (!user) {
				throw new Error("Cliente no encontrado");
			}
			await db.cliente.update({
				where: {
					id: id_cliente,
				},
				data: {
					cantidad_pedidos: user.cantidad_pedidos + 1,
				},
			});
		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al agregar el pedido");
		}
	}
}
