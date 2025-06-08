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
		const cliente = await user_service.createUser(
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
		const cliente = await auth_service.verifyUser(correo, contrasena);
		if (!cliente) {
			throw new Error(
				"No se encontro el usuario con las credenciales ingresadas",
			);
		}
		res.status(200).json({ data: cliente.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});
