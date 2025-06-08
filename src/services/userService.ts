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

	public async getUser(correo: string) {
		const user = await db.cliente.findFirst({
			where: {
				correo: correo,
			},
		});
		return user;
	}

	public async createUser(
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
}
