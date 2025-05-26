import express from "express";
import { UserService } from "../services/userService";

export const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
	try {
		const { body } = req;
		const { nombre, correo, telefono, domicilio_envio, contrasena } = body;
		//falta hashear la contraseña. Fijarse como es en nodejs
		const user_service = UserService.getInstance();
		const cliente = await user_service.createUser(
			nombre,
			contrasena,
			telefono,
			correo,
			domicilio_envio,
		);
		if (!cliente) {
			throw new Error("No se pudo crear el cliente");
		}
		res.status(201).json({ data: cliente.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});

authRouter.post("/login", async (req, res) => {});
