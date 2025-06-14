import { Router } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";

export const authRouter = Router();

const user_service = UserService.getInstance();
const auth_service = AuthService.getInstance();

authRouter.post("/register", async (req, res) => {
	try {
		const { body } = req;
		const { nombre, correo, telefono, domicilio_envio, contrasena } = body;
		const cliente = await user_service.createClient(
			nombre,
			correo,
			telefono,
			domicilio_envio,
			contrasena,
		);
		if (!cliente) {
			throw new Error("Hubo un error al crear cliente");
		}
		res.status(201).json({ data: cliente.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const { body } = req;
		const { correo, contrasena } = body;
		const usuario = await auth_service.verifyClient(correo, contrasena);
		if (!usuario) {
			throw new Error(
				"No se encontro el usuario con las credenciales ingresadas",
			);
		}
		const rol_usuario = await user_service.getRole(usuario.id);
		const token = await auth_service.generateUserSession(usuario.id);
		res.status(200).json({ data: token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

authRouter.post("/admin_login", async (req, res) => {
	try {
		const { body } = req;
		const { correo, contrasena } = body;
		const usuario = await auth_service.verifyAdmin(correo, contrasena);
		if (!usuario) {
			throw new Error(
				"No se encontro el usuario con las credenciales ingresadas",
			);
		}
		const rol_usuario = await user_service.getRole(usuario.id);
		const token = await auth_service.generateAdminSession(usuario.id);
		res.status(200).json({ data: token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});