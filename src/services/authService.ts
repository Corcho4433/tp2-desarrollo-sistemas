import { compare } from "bcrypt";
import { UserService } from "./userService";

export class AuthService {
	static instance: AuthService;

	constructor() {
		if (AuthService.instance) {
			throw new Error("Usa AuthService.getInstance()!");
		}
		AuthService.instance = this;
	}

	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	public async verifyUser(email: string, password: string) {
		try {
			const userService = UserService.getInstance();

			const user = await userService.getUser(email);

			if (!user) {
				throw new Error("Cliente no encontrado");
			}

			const password_match = await compare(password, user.contrasena);

			if (!password_match) {
				throw new Error("Contraseña incorrecta");
			}

			return user;

		} catch (error) {
			console.error(error);
			throw new Error("Hubo un error al verificar al cliente");
		}
	}

	public async registerAdmin(email: string): Promise<boolean> {
		return true;
	}
}
