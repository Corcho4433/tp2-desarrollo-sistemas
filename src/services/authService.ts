import * as bcrypt from "bcrypt";
const { compare } = bcrypt;
import { UserService } from "./userService.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

export class AuthService {

	private userService = UserService.getInstance(); 

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
	} // apagalololololololololololololololololololo

	public async verifyClient(email: string, password: string) {
		try {
			const user = await this.userService.getClientByEmail(email);

			if (!user) {
				throw new Error("Usuario no encontrado");
			}

			const password_match = await compare(password, user.contrasena);

			if (!password_match) {
				throw new Error("Contraseña incorrecta");
			}

			return user;

		} catch (error) {
			console.error(error);
		}
	}

	public async verifyAdmin(email: string, password: string) {
		try {
			const user = await this.userService.getAdmin(email);

			if (!user) {
				throw new Error("Usuario no encontrado");
			}

			const password_match = await compare(password, user.contrasena);

			if (!password_match) {
				throw new Error("Contraseña incorrecta");
			}

			return user;

		} catch (error) {
			console.error(error);
		}
	}

	public async generateUserSession(id_user: string, role: "admin" | "cliente") {
		try {
			const token = sign({ id_user, role: role }, process.env.SECRET_KEY);
			return token;
		} catch (error) {
			console.error(error);
			throw new Error("Error al generar el token");
		}
	}
}
