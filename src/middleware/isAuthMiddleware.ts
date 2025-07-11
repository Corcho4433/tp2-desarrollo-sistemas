import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
const { verify } = jwt;

import type { Cliente } from "@prisma/client";
import type { Administrador } from "@prisma/client";

export interface ClienteFromToken extends Pick<Cliente 	, "id"> {}
export interface AdministradorFromToken extends Pick<Administrador 	, "id"> {}

export const isAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const auth_header = req.headers.authorization;
	const access_token = auth_header?.split(" ")[1];

	if (!access_token) {
		res.status(401).json({ message: "No estas autenticado :c" });
		return;
	}

	let payload: JwtPayload;
	try {
		if (!process.env.SECRET_KEY) {
			throw new Error("Debes crear un SECRET_KEY en el .env");
}
		payload = verify(access_token, process.env.SECRET_KEY) as JwtPayload;

		if (!payload.id_user) {
			res.status(401).json({ message: "NO hay user_id en el token :c" });
			return;
		}


		if (!payload.role) {
			res.status(401).json({ message: "NO hay role en el token :c" });
			return;
		}
	} catch (error) {

		res.status(401).json({ message: "Token invalido :c" });
		return;
	}

	try {
		req.user = { id: payload.id_user, role: payload.role };
	} catch (error) {
		res.status(401).json({ message: "Token invalido :c" });
		return;
	}

	next();
};
