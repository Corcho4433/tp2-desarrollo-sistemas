import { compare } from "bcrypt";
import { UserService } from "./userService";
import type { NextFunction } from "express";
import { sign } from "jsonwebtoken";

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
			const user = await this.userService.getClient(email);

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
			throw new Error("Hubo un error al verificar al cliente");
		}
	}

	public async generateUserSession(id_user: string, role: "admin" | "cliente") {
		try {
			const token = sign({ id_user, role: role }, process.env.SECRET_KEY);
			return token;
		} catch (error) {
			throw new Error("Error al generar el token :c");
		}
	}


}
