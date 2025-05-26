import { db } from "../db/db";

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

	public async getUserByEmail(email: string): Promise<boolean> {
		return true;
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
					contrasena,
					telefono,
					domicilio_envio,
				},
			});
			return user;
		} catch (error) {
			throw new Error("Hubo un error al crear cliente");
		}
	}
}
